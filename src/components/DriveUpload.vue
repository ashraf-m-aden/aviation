<template>
  <div class="drive-upload">
    <h3 class="drive-upload__title">{{ message }}</h3>

    <!-- Champs spécifiques bannière -->
    <div v-if="isBanner" class="du-fields">
      <label>Titre</label>
      <input class="du-input" type="text" v-model="banner.title" />
      <label>Description</label>
      <input class="du-input" type="text" v-model="banner.description" />
    </div>

    <!-- Champs spécifiques actualité -->
    <div v-else-if="isNews" class="du-fields">
      <label>Titre</label>
      <input class="du-input" type="text" v-model="news.title" />
      <label>Contenu</label>
      <QuillEditor
        :content="news.content"
        content-type="html"
        theme="snow"
        @update:content="(v) => (news.content = v)"
      />
    </div>

    <!-- Champ nom pour un document -->
    <div v-else class="du-fields">
      <label>Nom du document</label>
      <input class="du-input" type="text" v-model="document.name" placeholder="Ex. Loi n°123 portant…" />
    </div>

    <!-- Lien Drive commun à tous les cas -->
    <div class="du-fields">
      <label>{{ isBanner || isNews ? "Lien Google Drive de l'image" : "Lien Google Drive du fichier" }}</label>
      <input
        class="du-input"
        type="text"
        v-model="driveLink"
        placeholder="Colle ici le lien de partage Drive"
        @change="normalize"
      />
      <p class="du-hint">
        Le fichier doit être partagé en « Tout utilisateur disposant du lien ».
        On enregistre uniquement l'identifiant : <code>{{ driveId || "—" }}</code>
      </p>
    </div>

    <!-- Aperçu image pour bannière / actualité -->
    <img
      v-if="(isBanner || isNews) && driveId"
      class="du-preview"
      :src="previewSrc"
      alt="aperçu"
      @error="onImgError"
    />

    <div class="du-actions">
      <button class="du-btn" :disabled="!canSubmit || loading" @click="submit">
        {{ loading ? "Enregistrement…" : "Enregistrer" }}
      </button>
    </div>
  </div>
</template>

<script>
import { extractDriveId, driveImageUrl, driveThumbUrl } from "@/utils/drive";

export default {
  name: "DriveUpload",
  // mêmes props que l'ancien FirebaseUpload pour rester compatible
  props: [
    "isBanner",
    "isNews",
    "isPublicDocumentS1",
    "isPublicDocumentS2",
    "isPrivateDocument1",
    "isPrivateDocument2",
    "category",
    "subOne",
    "subTwo",
  ],
  data() {
    return {
      driveLink: "",
      driveId: "",
      loading: false,
      banner: { title: "", description: "" },
      news: { title: "", content: "" },
      document: { name: "" },
    };
  },
  computed: {
    message() {
      if (this.isBanner) return "Enregistrer une bannière";
      if (this.isNews) return "Enregistrer un nouvel article";
      return "Enregistrer un document";
    },
    previewSrc() {
      return driveImageUrl(this.driveId, 600);
    },
    canSubmit() {
      if (!this.driveId) return false;
      if (this.isBanner) return !!this.banner.title;
      if (this.isNews) return !!this.news.title;
      return !!this.document.name;
    },
  },
  methods: {
    normalize() {
      this.driveId = extractDriveId(this.driveLink);
    },
    onImgError(e) {
      const fb = driveThumbUrl(this.driveId, 600);
      if (e.target.src !== fb) e.target.src = fb;
    },
    reset() {
      this.driveLink = "";
      this.driveId = "";
      this.banner = { title: "", description: "" };
      this.news = { title: "", content: "" };
      this.document = { name: "" };
    },
    async submit() {
      this.normalize();
      if (!this.canSubmit) return;
      this.loading = true;
      try {
        if (this.isBanner) {
          await this.$store.dispatch("addBanner", {
            title: this.banner.title,
            description: this.banner.description || "",
            driveId: this.driveId,
            createdAt: new Date(),
          });
        } else if (this.isNews) {
          await this.$store.dispatch("addNews", {
            title: this.news.title,
            content: this.news.content || "",
            driveId: this.driveId,
            createdAt: new Date(),
          });
        } else {
          // document — rattaché à la sous-catégorie via idParent
          const isS2 = this.isPublicDocumentS2 || this.isPrivateDocument2;
          const isIntern = this.isPrivateDocument1 || this.isPrivateDocument2;
          const parent = isS2 ? this.subTwo : this.subOne;
          await this.$store.dispatch("addDocument", {
            name: this.document.name,
            driveId: this.driveId,
            idParent: parent ? parent._id : "",
            isIntern,
            enabled: true,
            createdAt: new Date(),
          });
          this.$emit("uploaded", [parent, isS2 ? 2 : 1]);
        }
        this.reset();
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
$line: #dde6ec;

.drive-upload {
  max-width: 560px;
  padding: 18px;
  border: 1px solid $line;
  border-radius: 12px;
  background: #fff;
  &__title {
    font-size: 17px;
    color: $navy;
    margin-bottom: 16px;
  }
}
.du-fields {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  label {
    font-size: 12.5px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 6px;
  }
}
.du-input {
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
.du-hint {
  font-size: 11.5px;
  color: #5b6b78;
  margin-top: 6px;
  code {
    background: #f4f7f9;
    padding: 1px 6px;
    border-radius: 4px;
  }
}
.du-preview {
  max-width: 240px;
  border-radius: 8px;
  border: 1px solid $line;
  margin-bottom: 14px;
}
.du-actions {
  display: flex;
  justify-content: flex-end;
}
.du-btn {
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 9px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: #103a66;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
