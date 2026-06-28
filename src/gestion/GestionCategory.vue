<template>
  <div class="cats">
    <div class="cats__head">
      <div>
        <h2>Catégories</h2>
        <p>
          Les grandes rubriques sous lesquelles se rangent les sous-catégories
          et documents.
        </p>
      </div>
    </div>

    <!-- Ajout -->
    <div class="add">
      <input
        class="inp"
        type="text"
        v-model="newName"
        placeholder="Nom de la nouvelle catégorie"
        @keyup.enter="add"
      />
      <button class="btn-add" :disabled="!newName.trim() || busy" @click="add">
        + Ajouter
      </button>
    </div>

    <!-- Liste -->
    <p v-if="!categories.length" class="cats__empty">
      Aucune catégorie pour le moment.
    </p>

    <div v-else class="list">
      <div
        class="crow"
        v-for="cat in categories"
        :key="cat._id"
        :class="{ 'is-hidden': cat.enabled === false }"
      >
        <template v-if="editingId === cat._id">
          <input
            class="inp inp--inline"
            type="text"
            v-model="editName"
            @keyup.enter="saveEdit"
          />
          <div class="crow__actions">
            <button class="btn-save" @click="saveEdit">Enregistrer</button>
            <button class="ico" @click="cancelEdit" title="Annuler">✕</button>
          </div>
        </template>

        <template v-else>
          <span class="crow__name">{{ cat.name }}</span>
          <span v-if="cat.enabled === false" class="badge">Masquée</span>
          <div class="crow__actions">
            <button class="ico" @click="startEdit(cat)" title="Renommer">
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
    </div>
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
      editingId: null,
      editName: "",
      busy: false,
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.category || [];
    },
  },
  methods: {
    async add() {
      if (!this.newName.trim()) return;
      this.busy = true;
      try {
        await this.$store.dispatch("createCategory", {
          name: this.newName.trim(),
          enabled: true,
        });
        this.$store.dispatch("successNotif", "Catégorie créée.");
        this.newName = "";
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
      this.editingId = cat._id;
      this.editName = cat.name;
    },
    cancelEdit() {
      this.editingId = null;
      this.editName = "";
    },
    async saveEdit() {
      if (!this.editName.trim()) return;
      try {
        await this.$store.dispatch("updateCategory", {
          id: this.editingId,
          data: { name: this.editName.trim() },
        });
        this.$store.dispatch("successNotif", "Catégorie renommée.");
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
  },
  created() {
    this.$store.dispatch("fetchCategory");
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$green: #4a9e3f;
$red: #e0322b;
$muted: #5b6b78;
$line: #dde6ec;

.cats {
  max-width: 760px;
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
  gap: 10px;
  margin-bottom: 22px;
}
.inp {
  flex: 1;
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
    font-size: 13.5px;
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
.crow {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid $line;
  &:last-child {
    border-bottom: none;
  }
  &.is-hidden {
    background: #f7f9fb;
  }
  &__name {
    flex: 1;
    font-size: 14px;
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
.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(224, 50, 43, 0.1);
  color: $red;
}
.ico {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #fff;
  cursor: pointer;
  color: $muted;
  font-size: 13px;
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
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  background: $green;
  border: none;
  border-radius: 7px;
  padding: 8px 14px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
}
</style>
