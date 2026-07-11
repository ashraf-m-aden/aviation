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
      <input
        class="du-input"
        type="text"
        v-model="document.name"
        placeholder="Ex. Loi n°123 portant….pdf"
      />
    </div>

    <!-- Lien (Drive ou externe) -->
    <div class="du-fields">
      <label>{{
        isBanner || isNews
          ? "Lien de l'image (Drive ou externe)"
          : "Lien du fichier (Drive ou externe)"
      }}</label>
      <input
        class="du-input"
        type="text"
        v-model="link"
        placeholder="Colle ici un lien Drive ou une URL"
        @input="analyze"
      />

      <!-- Statut : type de lien + extension -->
      <div class="du-status" v-if="link">
        <span v-if="linkInfo" class="chip" :class="linkInfo.cls">{{
          linkInfo.label
        }}</span>
        <span v-if="ext" class="chip chip--file">
          <span class="fic" :class="'fic--' + fileCls">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 1.5L18.5 8H14V3.5Z"
              />
            </svg>
          </span>
          {{ ext.toUpperCase() }}
        </span>
      </div>

      <p class="du-hint">
        <template v-if="driveId">
          Lien Drive détecté — identifiant : <code>{{ driveId }}</code
          >. Pour l'affichage public, le fichier doit être partagé en « Tout
          utilisateur disposant du lien ».
        </template>
        <template v-else-if="externalUrl">
          Lien externe : il sera utilisé tel quel.
        </template>
        <template v-else>
          Colle un lien Drive (recommandé) ou une URL directe vers le fichier.
        </template>
      </p>
    </div>

    <!-- Aperçu image pour bannière / actualité -->
    <img
      v-if="showPreview"
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
      link: "",
      driveId: "",
      externalUrl: "",
      publicState: "", // '' | 'checking' | 'public' | 'private'
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
    // extension détectée depuis le nom du document, sinon depuis le lien
    ext() {
      const src = (this.document && this.document.name) || this.link || "";
      const m = src.toLowerCase().match(/\.([a-z0-9]{1,5})(\?|#|$)/);
      return m ? m[1] : "";
    },
    fileCls() {
      const e = this.ext;
      if (e === "pdf") return "pdf";
      if (["doc", "docx"].includes(e)) return "word";
      if (["xls", "xlsx", "csv"].includes(e)) return "excel";
      if (["ppt", "pptx"].includes(e)) return "ppt";
      if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(e))
        return "img";
      if (["zip", "rar", "7z"].includes(e)) return "zip";
      return "generic";
    },
    isImageExt() {
      return ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(this.ext);
    },
    linkInfo() {
      if (this.driveId) {
        if (this.publicState === "checking")
          return { label: "Lien Drive · vérification…", cls: "chip--muted" };
        if (this.publicState === "public")
          return { label: "Lien Drive · public ✓", cls: "chip--ok" };
        if (this.publicState === "private")
          return {
            label: "Lien Drive · accès non public ⚠",
            cls: "chip--warn",
          };
        return { label: "Lien Drive", cls: "chip--info" };
      }
      if (this.externalUrl)
        return { label: "Lien externe (non Drive)", cls: "chip--info" };
      if (this.link) return { label: "Lien non reconnu", cls: "chip--muted" };
      return null;
    },
    previewSrc() {
      if (this.driveId) return driveImageUrl(this.driveId, 600);
      return this.externalUrl || "";
    },
    showPreview() {
      if (!(this.isBanner || this.isNews)) return false;
      if (this.driveId) return true;
      return Boolean(this.externalUrl) && this.isImageExt;
    },
    canSubmit() {
      if (!this.driveId && !this.externalUrl) return false;
      if (this.isBanner) return !!this.banner.title;
      if (this.isNews) return !!this.news.title;
      return !!this.document.name;
    },
  },
  methods: {
    analyze() {
      const id = extractDriveId(this.link);
      if (id) {
        this.driveId = id;
        this.externalUrl = "";
        this.checkPublic(id);
      } else {
        this.driveId = "";
        this.publicState = "";
        this.externalUrl = /^https?:\/\//i.test(this.link.trim())
          ? this.link.trim()
          : "";
      }
    },
    // Test « best-effort » de l'accès public : on tente de charger la vignette
    // Drive. Si elle se charge, le fichier est très probablement public.
    checkPublic(id) {
      this.publicState = "checking";
      const probe = new Image();
      const url = `https://drive.google.com/thumbnail?id=${id}&sz=w200`;
      probe.onload = () => {
        this.publicState = probe.naturalWidth > 2 ? "public" : "private";
      };
      probe.onerror = () => {
        this.publicState = "private";
      };
      probe.src = url;
    },
    onImgError(e) {
      if (this.driveId) {
        const fb = driveThumbUrl(this.driveId, 600);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    reset() {
      this.link = "";
      this.driveId = "";
      this.externalUrl = "";
      this.publicState = "";
      this.banner = { title: "", description: "" };
      this.news = { title: "", content: "" };
      this.document = { name: "" };
    },
    async submit() {
      this.analyze();
      if (!this.canSubmit) return;
      this.loading = true;
      try {
        if (this.isBanner) {
          await this.$store.dispatch("addBanner", {
            title: this.banner.title,
            description: this.banner.description || "",
            driveId: this.driveId,
            url: this.externalUrl,
            createdAt: new Date(),
          });
        } else if (this.isNews) {
          await this.$store.dispatch("addNews", {
            title: this.news.title,
            content: this.news.content || "",
            driveId: this.driveId,
            url: this.externalUrl,
            createdAt: new Date(),
          });
        } else {
          const isS2 = this.isPublicDocumentS2 || this.isPrivateDocument2;
          const isIntern = this.isPrivateDocument1 || this.isPrivateDocument2;
          const parent = isS2 ? this.subTwo : this.subOne;
          await this.$store.dispatch("addDocument", {
            name: this.document.name,
            driveId: this.driveId,
            src: this.externalUrl, // lien externe éventuel (compat champ historique)
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
$green: #4a9e3f;
$red: #e0322b;
$amber: #b7791f;
$muted: #5b6b78;
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

/* Statut lien + extension */
.du-status {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 20px;
  &--ok {
    background: rgba(74, 158, 63, 0.12);
    color: $green;
  }
  &--warn {
    background: rgba(183, 121, 31, 0.14);
    color: $amber;
  }
  &--info {
    background: #e8f5fc;
    color: $sky;
  }
  &--muted {
    background: #f0f3f6;
    color: $muted;
  }
  &--file {
    background: #f4f7f9;
    color: $navy;
  }
}
.fic {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  color: $muted;
  background: #e9edf1;
  svg {
    width: 12px;
    height: 12px;
  }
  &--pdf {
    background: rgba(224, 50, 43, 0.12);
    color: $red;
  }
  &--word {
    background: rgba(27, 90, 161, 0.12);
    color: #1b5aa1;
  }
  &--excel {
    background: rgba(33, 115, 70, 0.14);
    color: #217346;
  }
  &--ppt {
    background: rgba(210, 71, 38, 0.14);
    color: #d24726;
  }
  &--img {
    background: rgba(27, 157, 217, 0.14);
    color: $sky;
  }
  &--zip {
    background: rgba(91, 107, 120, 0.14);
    color: $muted;
  }
}
.du-hint {
  font-size: 11.5px;
  color: $muted;
  margin-top: 8px;
  code {
    background: #f4f7f9;
    padding: 1px 6px;
    border-radius: 4px;
    word-break: break-all;
  }
}
.du-preview {
  max-width: 240px;
  border-radius: 8px;
  border: 1px solid $line;
  margin: 4px 0 14px;
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
