<template>
  <div class="cats">
    <div class="cats__head">
      <div>
        <h2>Catégories &amp; sous-catégories</h2>
        <p>
          Déplie une catégorie pour voir et traduire ses sous-catégories
          (niveaux 1 et 2).
        </p>
      </div>
    </div>

    <!-- Ajout d'une catégorie -->
    <div class="add">
      <div class="trio">
        <input
          class="inp"
          type="text"
          v-model="newName"
          placeholder="Nom (FR)"
          @keyup.enter="add"
        />
        <input
          class="inp"
          type="text"
          v-model="newNameEn"
          placeholder="Name (EN)"
          @keyup.enter="add"
        />
        <input
          class="inp"
          type="text"
          v-model="newNameAr"
          dir="rtl"
          placeholder="الاسم (AR)"
          @keyup.enter="add"
        />
      </div>
      <button class="btn-add" :disabled="!newName.trim() || busy" @click="add">
        + Ajouter
      </button>
    </div>

    <p v-if="!categories.length" class="cats__empty">
      Aucune catégorie pour le moment.
    </p>

    <div v-else class="list">
      <div class="cblock" v-for="cat in categories" :key="cat._id">
        <!-- Ligne catégorie -->
        <div class="crow" :class="{ 'is-hidden': cat.enabled === false }">
          <button
            class="caret"
            @click="toggleOpen(cat._id)"
            :class="{ open: isOpen(cat._id) }"
          >
            ▸
          </button>

          <template v-if="editingId === cat._id">
            <div class="trio trio--inline">
              <input
                class="inp inp--inline"
                v-model="editName"
                placeholder="Nom (FR)"
                @keyup.enter="saveEdit"
              />
              <input
                class="inp inp--inline"
                v-model="editNameEn"
                placeholder="Name (EN)"
                @keyup.enter="saveEdit"
              />
              <input
                class="inp inp--inline"
                v-model="editNameAr"
                dir="rtl"
                placeholder="الاسم (AR)"
                @keyup.enter="saveEdit"
              />
            </div>
            <div class="crow__actions">
              <button class="btn-save" @click="saveEdit">Enregistrer</button>
              <button class="ico" @click="cancelEdit" title="Annuler">✕</button>
            </div>
          </template>

          <template v-else>
            <span class="crow__name">{{ cat.name }}</span>
            <span class="langs">
              <span class="lang" :class="{ on: cat.nameEn }">EN</span>
              <span class="lang" :class="{ on: cat.nameAr }">AR</span>
            </span>
            <span class="tag">{{ subsOne(cat._id).length }} sous-cat.</span>
            <span v-if="cat.enabled === false" class="badge">Masquée</span>
            <div class="crow__actions">
              <button class="ico" @click="startEdit(cat)" title="Modifier">
                ✎
              </button>
              <button
                class="ico"
                @click="toggle(cat)"
                :title="cat.enabled === false ? 'Afficher' : 'Masquer'"
              >
                {{ cat.enabled === false ? "🙈" : "👁" }}
              </button>
              <button class="ico del" @click="remove(cat)" title="Supprimer">
                🗑
              </button>
            </div>
          </template>
        </div>

        <!-- Sous-catégories niveau 1 -->
        <div v-if="isOpen(cat._id)" class="subs">
          <p v-if="!subsOne(cat._id).length" class="subs__empty">
            Aucune sous-catégorie.
          </p>

          <div v-for="s1 in subsOne(cat._id)" :key="s1._id" class="s1block">
            <div class="s1row" :class="{ 'is-hidden': s1.enabled === false }">
              <button
                class="caret caret--sm"
                :class="{
                  open: isOpen(s1._id),
                  ghost: !subsTwo(s1._id).length,
                }"
                @click="subsTwo(s1._id).length && toggleOpen(s1._id)"
              >
                ▸
              </button>

              <template v-if="editSubId === s1._id">
                <div class="trio trio--inline">
                  <input
                    class="inp inp--inline"
                    v-model="editSubName"
                    placeholder="Nom (FR)"
                    @keyup.enter="saveEditSub"
                  />
                  <input
                    class="inp inp--inline"
                    v-model="editSubNameEn"
                    placeholder="Name (EN)"
                    @keyup.enter="saveEditSub"
                  />
                  <input
                    class="inp inp--inline"
                    v-model="editSubNameAr"
                    dir="rtl"
                    placeholder="الاسم (AR)"
                    @keyup.enter="saveEditSub"
                  />
                </div>
                <div class="s1row__actions">
                  <button class="btn-save" @click="saveEditSub">
                    Enregistrer
                  </button>
                  <button class="ico" @click="cancelEditSub" title="Annuler">
                    ✕
                  </button>
                </div>
              </template>

              <template v-else>
                <span class="s1row__name">{{ s1.name }}</span>
                <span class="langs">
                  <span class="lang" :class="{ on: s1.nameEn }">EN</span>
                  <span class="lang" :class="{ on: s1.nameAr }">AR</span>
                </span>
                <span v-if="subsTwo(s1._id).length" class="tag tag--sky"
                  >{{ subsTwo(s1._id).length }} niv. 2</span
                >
                <span v-if="s1.enabled === false" class="badge">Masquée</span>
                <div class="s1row__actions">
                  <button
                    class="ico"
                    @click="startEditSub(s1, 1)"
                    title="Traduire / renommer"
                  >
                    ✎
                  </button>
                </div>
              </template>
            </div>

            <!-- Sous-catégories niveau 2 -->
            <div v-if="isOpen(s1._id)" class="subs2">
              <div
                v-for="s2 in subsTwo(s1._id)"
                :key="s2._id"
                class="s2row"
                :class="{ 'is-hidden': s2.enabled === false }"
              >
                <span class="dot">•</span>

                <template v-if="editSubId === s2._id">
                  <div class="trio trio--inline">
                    <input
                      class="inp inp--inline"
                      v-model="editSubName"
                      placeholder="Nom (FR)"
                      @keyup.enter="saveEditSub"
                    />
                    <input
                      class="inp inp--inline"
                      v-model="editSubNameEn"
                      placeholder="Name (EN)"
                      @keyup.enter="saveEditSub"
                    />
                    <input
                      class="inp inp--inline"
                      v-model="editSubNameAr"
                      dir="rtl"
                      placeholder="الاسم (AR)"
                      @keyup.enter="saveEditSub"
                    />
                  </div>
                  <div class="s1row__actions">
                    <button class="btn-save" @click="saveEditSub">
                      Enregistrer
                    </button>
                    <button class="ico" @click="cancelEditSub" title="Annuler">
                      ✕
                    </button>
                  </div>
                </template>

                <template v-else>
                  <span class="s2row__name">{{ s2.name }}</span>
                  <span class="langs">
                    <span class="lang" :class="{ on: s2.nameEn }">EN</span>
                    <span class="lang" :class="{ on: s2.nameAr }">AR</span>
                  </span>
                  <span v-if="s2.enabled === false" class="badge">Masquée</span>
                  <div class="s1row__actions">
                    <button
                      class="ico"
                      @click="startEditSub(s2, 2)"
                      title="Traduire / renommer"
                    >
                      ✎
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="note">
      La création / suppression des sous-catégories reste sur l'écran «
      Documents ». Ici, tu ajoutes leurs traductions (EN / AR) et tu peux les
      renommer.
    </p>
  </div>
</template>

<script>
export default {
  name: "GestionCategories",
  metaInfo() {
    return { meta: [{ name: "robots", content: "noindex" }] };
  },
  data() {
    return {
      newName: "",
      newNameEn: "",
      newNameAr: "",
      editingId: null,
      editName: "",
      editNameEn: "",
      editNameAr: "",
      // édition d'une sous-catégorie
      editSubId: null,
      editSubLevel: 1,
      editSubName: "",
      editSubNameEn: "",
      editSubNameAr: "",
      busy: false,
      open: {},
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.category || [];
    },
    allSubOne() {
      return this.$store.state.category.subCategoryOne || [];
    },
    allSubTwo() {
      return this.$store.state.category.subCategoryTwo || [];
    },
  },
  methods: {
    subsOne(catId) {
      return this.allSubOne
        .filter((s) => s.idParent === catId)
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    },
    subsTwo(s1Id) {
      return this.allSubTwo
        .filter((s) => s.idParent === s1Id)
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    },
    isOpen(id) {
      return !!this.open[id];
    },
    toggleOpen(id) {
      this.open[id] = !this.open[id];
    },

    /* ---- Catégories ---- */
    async add() {
      if (!this.newName.trim()) return;
      this.busy = true;
      try {
        await this.$store.dispatch("createCategory", {
          name: this.newName.trim(),
          nameEn: this.newNameEn.trim(),
          nameAr: this.newNameAr.trim(),
          enabled: true,
        });
        this.$store.dispatch("successNotif", "Catégorie créée.");
        this.newName = this.newNameEn = this.newNameAr = "";
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      } finally {
        this.busy = false;
      }
    },
    startEdit(cat) {
      this.cancelEditSub();
      this.editingId = cat._id;
      this.editName = cat.name || "";
      this.editNameEn = cat.nameEn || "";
      this.editNameAr = cat.nameAr || "";
    },
    cancelEdit() {
      this.editingId = null;
      this.editName = this.editNameEn = this.editNameAr = "";
    },
    async saveEdit() {
      if (!this.editName.trim()) return;
      try {
        await this.$store.dispatch("updateCategory", {
          id: this.editingId,
          data: {
            name: this.editName.trim(),
            nameEn: this.editNameEn.trim(),
            nameAr: this.editNameAr.trim(),
          },
        });
        this.$store.dispatch("successNotif", "Catégorie mise à jour.");
        this.cancelEdit();
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      }
    },
    async toggle(cat) {
      try {
        await this.$store.dispatch("updateCategory", {
          id: cat._id,
          data: { enabled: cat.enabled === false },
        });
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      }
    },
    async remove(cat) {
      if (!confirm(`Supprimer définitivement la catégorie « ${cat.name} » ?`))
        return;
      try {
        await this.$store.dispatch("eraseCategory", cat._id);
        this.$store.dispatch("successNotif", "Catégorie supprimée.");
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      }
    },

    /* ---- Sous-catégories (traduction / renommage) ---- */
    startEditSub(sub, level) {
      this.cancelEdit();
      this.editSubId = sub._id;
      this.editSubLevel = level;
      this.editSubName = sub.name || "";
      this.editSubNameEn = sub.nameEn || "";
      this.editSubNameAr = sub.nameAr || "";
    },
    cancelEditSub() {
      this.editSubId = null;
      this.editSubName = this.editSubNameEn = this.editSubNameAr = "";
    },
    async saveEditSub() {
      if (!this.editSubName.trim()) return;
      const action = this.editSubLevel === 2 ? "updateSubTwo" : "updateSubOne";
      try {
        await this.$store.dispatch(action, {
          id: this.editSubId,
          data: {
            name: this.editSubName.trim(),
            nameEn: this.editSubNameEn.trim(),
            nameAr: this.editSubNameAr.trim(),
          },
        });
        this.$store.dispatch("successNotif", "Sous-catégorie mise à jour.");
        this.cancelEditSub();
      } catch (e) {
        this.$store.dispatch(
          "warningNotif",
          e.message || "Une erreur est survenue.",
        );
      }
    },
  },
  created() {
    this.$store.dispatch("fetchCategory");
    if (!this.allSubOne.length) this.$store.dispatch("fetchSubCategoryOne");
    if (!this.allSubTwo.length) this.$store.dispatch("fetchSubCategoryTwo");
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
$muted: #5b6b78;
$line: #dde6ec;

.cats {
  max-width: 900px;
  &__head {
    margin-bottom: 20px;
    h2 {
      font-size: 22px;
      color: $navy;
      font-family: "Spectral", Georgia, serif;
    }
    p {
      font-size: 13px;
      color: $muted;
    }
  }
  &__empty {
    color: $muted;
    font-size: 14px;
  }
}
.add {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 22px;
}
.trio {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  &--inline {
    flex: 1;
  }
}
.inp {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid $line;
  border-radius: 9px;
  font: inherit;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: $sky;
  }
  &--inline {
    padding: 8px 11px;
    font-size: 13px;
  }
}
.btn-add {
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 9px;
  padding: 11px 18px;
  cursor: pointer;
  white-space: nowrap;
  &:hover:not(:disabled) {
    background: $navy-700;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
.list {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  overflow: hidden;
}
.cblock {
  border-bottom: 1px solid $line;
  &:last-child {
    border-bottom: none;
  }
}

.crow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  &.is-hidden {
    background: #f7f9fb;
  }
  &__name {
    font-size: 14px;
    font-weight: 700;
    color: $navy;
  }
  &__actions {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-inline-start: auto;
  }
}
.caret {
  flex: none;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: $muted;
  font-size: 12px;
  transition: transform 0.15s;
  &.open {
    transform: rotate(90deg);
  }
  &--sm {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  &.ghost {
    opacity: 0;
    cursor: default;
  }
}

.subs {
  background: #fafcfd;
  border-top: 1px solid $line;
  padding: 8px 16px 12px 40px;
  &__empty {
    font-size: 13px;
    color: $muted;
    padding: 6px 0;
  }
}
.s1block {
  border-bottom: 1px dashed #e6ecf1;
  &:last-child {
    border-bottom: none;
  }
}
.s1row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 0;
  &.is-hidden {
    opacity: 0.6;
  }
  &__name {
    font-size: 13.5px;
    font-weight: 600;
    color: $navy;
  }
  &__actions {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-inline-start: auto;
  }
}
.subs2 {
  padding: 0 0 8px 30px;
}
.s2row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  &.is-hidden {
    opacity: 0.6;
  }
  &__name {
    font-size: 13px;
    color: #2a3a47;
  }
  .dot {
    color: $sky;
  }
}

.langs {
  display: flex;
  gap: 4px;
}
.lang {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 5px;
  background: #eef1f4;
  color: #aeb9c2;
  &.on {
    background: $sky-soft;
    color: $sky;
  }
}
.tag {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: #eef1f4;
  color: $muted;
  &--sky {
    background: $sky-soft;
    color: $sky;
  }
}
.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(224, 50, 43, 0.1);
  color: $red;
}
.ico {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: $muted;
  font-size: 12px;
  &:hover {
    color: $navy;
    border-color: #b9cde0;
  }
  &.del:hover {
    color: #fff;
    background: $red;
    border-color: $red;
  }
}
.btn-save {
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: $green;
  border: none;
  border-radius: 7px;
  padding: 7px 13px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
}
.note {
  font-size: 12px;
  color: $muted;
  margin-top: 14px;
}

@media (max-width: 640px) {
  .add {
    flex-direction: column;
    align-items: stretch;
  }
  .trio {
    grid-template-columns: 1fr;
  }
}
</style>
