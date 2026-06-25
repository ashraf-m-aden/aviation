<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal__head">
        <h4>{{ isNew ? "Nouvelle entrée" : "Modifier l'entrée" }}</h4>
        <button class="modal__x" @click="$emit('close')">✕</button>
      </div>

      <div class="modal__body">
        <!-- Libellé trilingue -->
        <div class="fld">
          <label>Libellé affiché</label>
          <div class="trio">
            <div class="trio__row">
              <span class="trio__tag">FR</span>
              <input v-model="form.label.fr" class="inp" placeholder="Réglementation" />
            </div>
            <div class="trio__row">
              <span class="trio__tag">EN</span>
              <input v-model="form.label.en" class="inp" placeholder="Regulations" />
            </div>
            <div class="trio__row">
              <span class="trio__tag">AR</span>
              <input v-model="form.label.ar" class="inp" dir="rtl" placeholder="التنظيم" />
            </div>
          </div>
        </div>

        <!-- Type (lien ou déroulant) — masqué pour un sous-élément -->
        <div class="fld" v-if="!isChild">
          <label>Type d'entrée</label>
          <div class="seg">
            <button type="button" :class="{ on: form.type === 'link' }" @click="form.type = 'link'">Lien</button>
            <button type="button" :class="{ on: form.type === 'dropdown' }" @click="form.type = 'dropdown'">Menu déroulant</button>
          </div>
        </div>

        <!-- Cible (uniquement pour un lien) -->
        <template v-if="form.type === 'link'">
          <div class="fld">
            <label>Cible</label>
            <select v-model="form.kind" class="inp">
              <option value="documents">Liste de documents</option>
              <option value="content">Page de contenu</option>
              <option value="component">Page codée (composant)</option>
              <option value="external">Lien externe</option>
            </select>
          </div>

          <div class="fld" v-if="form.kind === 'documents'">
            <label>Catégorie de documents</label>
            <select v-model="form.category" class="inp">
              <option value="" disabled>— choisir —</option>
              <option v-for="c in categories" :key="c._id" :value="c._id">
                {{ c.name || localized(c.label) }}
              </option>
            </select>
          </div>

          <div class="fld" v-else-if="form.kind === 'external'">
            <label>URL externe</label>
            <input v-model="form.url" class="inp" placeholder="https://…" />
          </div>

          <div class="fld" v-else-if="form.kind === 'component'">
            <label>Composant</label>
            <select v-model="form.component" class="inp">
              <option value="" disabled>— choisir —</option>
              <option v-for="key in componentKeys" :key="key" :value="key">{{ key }}</option>
            </select>
            <p v-if="!componentKeys.length" class="note">
              Aucun composant enregistré. Ajoute ta page dans
              <code>router/componentRegistry.js</code>.
            </p>
          </div>

          <div class="fld" v-else-if="form.kind === 'content'">
            <label>Contenu de la page</label>
            <BlockEditor :blocks="form.content.blocks" />
          </div>
        </template>

        <!-- Slug -->
        <div class="fld" v-if="form.type === 'link'">
          <label>URL (slug)</label>
          <input v-model="form.slug" class="inp" @input="slugTouched = true" placeholder="reglementation/lois" />
          <p class="note">Adresse de la page : <code>/{{ form.slug }}</code></p>
        </div>
      </div>

      <div class="modal__foot">
        <button class="mbtn cancel" @click="$emit('close')">Annuler</button>
        <button class="mbtn save" :disabled="!canSave" @click="save">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
import BlockEditor from "./BlockEditor.vue";
import { slugify } from "@/utils/drive";
import { customComponentKeys } from "@/router/componentRegistry";

function emptyForm() {
  return {
    _id: null,
    label: { fr: "", en: "", ar: "" },
    slug: "",
    type: "link",
    kind: "documents",
    category: "",
    url: "",
    component: "",
    content: { blocks: [] },
    enabled: true,
    order: 0,
  };
}

export default {
  name: "NavItemModal",
  components: { BlockEditor },
  props: {
    // entrée à éditer (null = création)
    item: { type: Object, default: null },
    // true si on édite un sous-élément (pas de type "dropdown" possible)
    isChild: { type: Boolean, default: false },
    // slug du parent, pour préfixer celui de l'enfant
    parentSlug: { type: String, default: "" },
  },
  emits: ["save", "close"],
  data() {
    return {
      form: emptyForm(),
      slugTouched: false,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    isNew() {
      return !this.item;
    },
    categories() {
      return this.$store.getters.getCategory || [];
    },
    componentKeys() {
      return customComponentKeys();
    },
    canSave() {
      if (!this.form.label.fr.trim()) return false;
      if (this.form.type === "link" && !this.form.slug.trim()) return false;
      return true;
    },
  },
  watch: {
    "form.label.fr"(val) {
      if (!this.slugTouched && this.form.type === "link") {
        const base = slugify(val);
        this.form.slug = this.parentSlug ? `${this.parentSlug}/${base}` : base;
      }
    },
  },
  methods: {
    localized(map) {
      if (!map) return "";
      if (typeof map === "string") return map;
      return map[this.locale] || map.fr || "";
    },
    save() {
      // nettoie les champs non pertinents selon le type/kind
      const f = JSON.parse(JSON.stringify(this.form));
      if (f.type === "dropdown") {
        delete f.kind;
        delete f.category;
        delete f.url;
        delete f.component;
        delete f.content;
        if (!Array.isArray(f.children)) f.children = [];
      } else {
        delete f.children;
        if (f.kind !== "documents") delete f.category;
        if (f.kind !== "external") delete f.url;
        if (f.kind !== "component") delete f.component;
        if (f.kind !== "content") delete f.content;
      }
      this.$emit("save", f);
    },
  },
  created() {
    if (this.item) {
      // pré-remplit le formulaire à partir de l'entrée existante
      const f = emptyForm();
      Object.assign(f, JSON.parse(JSON.stringify(this.item)));
      if (!f.label) f.label = { fr: "", en: "", ar: "" };
      if (!f.content) f.content = { blocks: [] };
      this.form = f;
      this.slugTouched = true; // ne pas écraser un slug existant
    } else if (this.isChild) {
      this.form.type = "link";
    }
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$line: #dde6ec;

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 20, 35, 0.55);
  display: grid;
  place-items: center;
  z-index: 300;
  padding: 20px;
}
.modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid $line;
    h4 {
      font-size: 18px;
      color: $navy;
    }
  }
  &__x {
    border: none;
    background: none;
    cursor: pointer;
    color: #5b6b78;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    &:hover {
      background: #f4f7f9;
      color: #e0322b;
    }
  }
  &__body {
    padding: 22px;
    overflow-y: auto;
  }
  &__foot {
    display: flex;
    justify-content: flex-end;
    gap: 9px;
    padding: 15px 22px;
    border-top: 1px solid $line;
    background: #fafcfd;
  }
}
.fld {
  margin-bottom: 16px;
  > label {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 7px;
  }
}
.trio__row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.trio__tag {
  font-size: 11px;
  font-weight: 700;
  color: #5b6b78;
  width: 26px;
  flex: none;
}
.inp {
  width: 100%;
  padding: 10px 13px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13.5px;
  outline: none;
  &:focus {
    border-color: $sky;
  }
}
select.inp {
  cursor: pointer;
}
.seg {
  display: inline-flex;
  gap: 3px;
  background: #f4f7f9;
  padding: 3px;
  border-radius: 8px;
  button {
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    color: #5b6b78;
    background: none;
    border: none;
    padding: 7px 14px;
    border-radius: 6px;
    cursor: pointer;
    &.on {
      background: $navy;
      color: #fff;
    }
  }
}
.note {
  font-size: 11.5px;
  color: #5b6b78;
  margin-top: 6px;
  code {
    background: #f4f7f9;
    padding: 1px 6px;
    border-radius: 4px;
  }
}
.mbtn {
  padding: 10px 20px;
  border-radius: 9px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  &.cancel {
    background: #fff;
    border-color: $line;
    color: #16242f;
  }
  &.save {
    background: $navy;
    color: #fff;
    &:hover {
      background: $navy-700;
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>
