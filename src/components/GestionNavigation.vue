<template>
  <div class="gestion-nav">
    <header class="gn-head">
      <div class="gn-head__ic">≡</div>
      <div>
        <h2>Gestion de la navigation</h2>
        <p>Configure les menus du site public — en français, anglais et arabe.</p>
      </div>
    </header>

    <!-- Aperçu du menu -->
    <div class="preview">
      <div class="preview__label">Aperçu du menu</div>
      <div class="preview__bar">
        <span
          v-for="item in items"
          :key="item._id"
          class="pitem"
          :class="{ off: item.enabled === false }"
        >
          {{ localized(item.label) }}<span v-if="item.type === 'dropdown'"> ▾</span>
        </span>
        <span v-if="!items.length" class="preview__empty">Aucune entrée pour le moment.</span>
      </div>
    </div>

    <!-- Barre d'ajout -->
    <div class="addbar">
      <button class="addbtn" @click="openCreate('link')">+ Ajouter un lien</button>
      <button class="addbtn" @click="openCreate('dropdown')">+ Ajouter un menu déroulant</button>
    </div>

    <!-- Liste des entrées -->
    <div v-for="(item, i) in items" :key="item._id" class="navcard" :class="{ drop: item.type === 'dropdown', off: item.enabled === false }">
      <div class="navcard__head">
        <div class="navcard__info">
          <b>{{ localized(item.label) }}</b>
          <span>{{ typeText(item) }} <code v-if="item.type === 'link'">/{{ item.slug }}</code></span>
        </div>
        <div class="navcard__actions">
          <button class="ico" :disabled="i === 0" @click="move(i, -1)" title="Monter">▲</button>
          <button class="ico" :disabled="i === items.length - 1" @click="move(i, 1)" title="Descendre">▼</button>
          <span class="tg" :class="{ on: item.enabled !== false }" @click="toggle(item)" title="Visibilité"></span>
          <button class="ico" @click="openEdit(item)" title="Modifier">✎</button>
          <button class="ico del" @click="remove(item)" title="Supprimer">🗑</button>
        </div>
      </div>

      <!-- Sous-éléments d'un déroulant -->
      <div v-if="item.type === 'dropdown'" class="children">
        <div v-for="(child, j) in item.children || []" :key="child._id" class="child">
          <span class="child__k">{{ kindShort(child.kind) }}</span>
          <b>{{ localized(child.label) }}</b>
          <code>/{{ child.slug }}</code>
          <div class="child__actions">
            <button class="ico sm" :disabled="j === 0" @click="moveChild(item, j, -1)">▲</button>
            <button class="ico sm" :disabled="j === (item.children || []).length - 1" @click="moveChild(item, j, 1)">▼</button>
            <span class="tg sm" :class="{ on: child.enabled !== false }" @click="toggleChild(item, j)"></span>
            <button class="ico sm" @click="openEditChild(item, child)">✎</button>
            <button class="ico sm del" @click="removeChild(item, j)">🗑</button>
          </div>
        </div>
        <button class="addchild" @click="openCreateChild(item)">+ Ajouter un sous-élément</button>
      </div>
    </div>

    <!-- Modale -->
    <NavItemModal
      v-if="modal.open"
      :item="modal.item"
      :is-child="modal.isChild"
      :parent-slug="modal.parentSlug"
      @save="onSave"
      @close="closeModal"
    />
  </div>
</template>

<script>
import NavItemModal from "./NavItemModal.vue";

const localId = () => `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export default {
  name: "GestionNavigation",
  components: { NavItemModal },
  data() {
    return {
      modal: { open: false, item: null, isChild: false, parentSlug: "", parent: null },
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    items() {
      return this.$store.getters.getNavigation || [];
    },
  },
  methods: {
    localized(map) {
      if (!map) return "";
      if (typeof map === "string") return map;
      return map[this.locale] || map.fr || "";
    },
    typeText(item) {
      if (item.type === "dropdown") return `Menu déroulant — ${(item.children || []).length} élément(s)`;
      return { documents: "Lien · documents", content: "Lien · page", external: "Lien externe", component: "Lien · composant" }[item.kind] || "Lien";
    },
    kindShort(kind) {
      return { documents: "docs", content: "page", external: "ext", component: "vue" }[kind] || "link";
    },

    /* ----- ouverture de la modale ----- */
    openCreate(type) {
      this.modal = { open: true, item: type === "dropdown" ? { type: "dropdown", label: { fr: "", en: "", ar: "" } } : null, isChild: false, parentSlug: "", parent: null };
    },
    openEdit(item) {
      this.modal = { open: true, item, isChild: false, parentSlug: "", parent: null };
    },
    openCreateChild(parent) {
      this.modal = { open: true, item: null, isChild: true, parentSlug: parent.slug || "", parent };
    },
    openEditChild(parent, child) {
      this.modal = { open: true, item: child, isChild: true, parentSlug: parent.slug || "", parent };
    },
    closeModal() {
      this.modal = { open: false, item: null, isChild: false, parentSlug: "", parent: null };
    },

    /* ----- enregistrement ----- */
    onSave(form) {
      if (this.modal.isChild) {
        this.saveChild(form);
      } else if (form._id) {
        this.$store.dispatch("updateNavItem", { id: form._id, data: form });
      } else {
        form.order = this.items.length;
        this.$store.dispatch("createNavItem", form);
      }
      this.closeModal();
    },
    saveChild(form) {
      const parent = this.modal.parent;
      const children = parent.children ? [...parent.children] : [];
      if (form._id) {
        const idx = children.findIndex((c) => c._id === form._id);
        if (idx !== -1) children[idx] = form;
      } else {
        form._id = localId();
        form.order = children.length;
        children.push(form);
      }
      this.$store.dispatch("updateNavItem", { id: parent._id, data: { children } });
    },

    /* ----- actions rapides ----- */
    toggle(item) {
      this.$store.dispatch("toggleNavItem", { id: item._id, value: item.enabled === false });
    },
    remove(item) {
      if (confirm(`Supprimer « ${this.localized(item.label)} » ?`)) {
        this.$store.dispatch("removeNavItem", item._id);
      }
    },
    move(i, dir) {
      const j = i + dir;
      if (j < 0 || j >= this.items.length) return;
      const arr = [...this.items];
      [arr[i], arr[j]] = [arr[j], arr[i]];
      this.$store.dispatch("reorderNav", arr);
    },

    /* ----- actions sur les sous-éléments ----- */
    persistChildren(parent, children) {
      this.$store.dispatch("updateNavItem", { id: parent._id, data: { children } });
    },
    toggleChild(parent, j) {
      const children = [...(parent.children || [])];
      children[j] = { ...children[j], enabled: children[j].enabled === false };
      this.persistChildren(parent, children);
    },
    removeChild(parent, j) {
      const children = [...(parent.children || [])];
      if (confirm(`Supprimer « ${this.localized(children[j].label)} » ?`)) {
        children.splice(j, 1);
        this.persistChildren(parent, children);
      }
    },
    moveChild(parent, j, dir) {
      const k = j + dir;
      const children = [...(parent.children || [])];
      if (k < 0 || k >= children.length) return;
      [children[j], children[k]] = [children[k], children[j]];
      this.persistChildren(parent, children);
    },
  },
  created() {
    this.$store.dispatch("fetchNavigation");
    if (!this.$store.getters.getCategory || !this.$store.getters.getCategory.length) {
      this.$store.dispatch("fetchCategory");
    }
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$green: #4a9e3f;
$red: #e0322b;
$line: #dde6ec;

.gestion-nav {
  max-width: 920px;
  margin: 0 auto;
  padding: 30px 24px;
}
.gn-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  &__ic {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: $navy;
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 22px;
  }
  h2 {
    font-size: 22px;
    color: $navy;
  }
  p {
    font-size: 13px;
    color: #5b6b78;
  }
}
.preview {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 18px;
  &__label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #5b6b78;
    margin-bottom: 10px;
  }
  &__bar {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  &__empty {
    font-size: 13px;
    color: #5b6b78;
  }
}
.pitem {
  background: $sky-soft;
  color: $navy;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 13px;
  border-radius: 7px;
  &.off {
    opacity: 0.4;
    text-decoration: line-through;
  }
}
.addbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.addbtn {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 17px;
  border: 1px dashed #b9cde0;
  border-radius: 9px;
  background: #fff;
  color: $navy;
  cursor: pointer;
  &:hover {
    border-color: $sky;
    background: $sky-soft;
  }
}
.navcard {
  background: #fff;
  border: 1px solid $line;
  border-radius: 11px;
  margin-bottom: 9px;
  &.drop {
    border-inline-start: 3px solid $sky;
  }
  &.off {
    opacity: 0.6;
  }
  &__head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 16px;
  }
  &__info {
    b {
      font-size: 14.5px;
      color: $navy;
      display: block;
    }
    span {
      font-size: 12px;
      color: #5b6b78;
    }
    code {
      background: #f4f7f9;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 11.5px;
    }
  }
  &__actions {
    margin-inline-start: auto;
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
.ico {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: #5b6b78;
  font-size: 12px;
  &:hover:not(:disabled) {
    color: $navy;
    border-color: #b9cde0;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  &.del:hover {
    color: #fff;
    background: $red;
    border-color: $red;
  }
  &.sm {
    width: 27px;
    height: 27px;
    font-size: 11px;
  }
}
.tg {
  width: 38px;
  height: 21px;
  border-radius: 11px;
  background: #cfdae3;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  flex: none;
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    top: 2.5px;
    inset-inline-start: 2.5px;
    transition: 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  &.on {
    background: $green;
    &::after {
      inset-inline-start: 19.5px;
    }
  }
  &.sm {
    width: 34px;
    height: 19px;
    &::after {
      width: 14px;
      height: 14px;
    }
    &.on::after {
      inset-inline-start: 17px;
    }
  }
}
.children {
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.child {
  display: flex;
  align-items: center;
  gap: 9px;
  background: #f4f7f9;
  border-radius: 7px;
  padding: 7px 11px;
  font-size: 12.5px;
  &__k {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 4px;
    background: $sky-soft;
    color: $sky;
  }
  b {
    color: $navy;
  }
  code {
    font-size: 11px;
    color: #5b6b78;
    background: #fff;
    padding: 1px 7px;
    border-radius: 4px;
  }
  &__actions {
    margin-inline-start: auto;
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
.addchild {
  align-self: flex-start;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: $sky;
  background: none;
  border: 1px dashed #b9cde0;
  border-radius: 7px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 3px;
  &:hover {
    background: $sky-soft;
  }
}
</style>
