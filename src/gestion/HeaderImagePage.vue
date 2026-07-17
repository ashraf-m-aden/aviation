<template>
  <div class="hset">
    <p class="hset__hint">
      Cette image apparaît en fond de l'en-tête sur les pages de contenu
      (documents, articles, etc.).
    </p>

    <div class="hset__row">
      <div class="ph">
        <img :src="preview" alt="" @error="onImgError" />
      </div>

      <div class="hset__form">
        <label>Remplacer l'image (lien)</label>
        <input
          class="inp"
          type="text"
          placeholder="Coller un lien…"
          @input="setImage($event.target.value)"
        />
        <span class="hset__id" v-if="draftId">id : {{ draftId }}</span>
        <button class="btn-save" :disabled="!draft" @click="save">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { driveImageUrl, driveThumbUrl, extractDriveId } from "@/utils/drive";
import fallbackHero from "@/assets/article.jpeg";

export default {
  name: "HeaderImagePage",
  data() {
    return { draft: null };
  },
  computed: {
    current() {
      return this.$store.getters.getHeaderImage;
    },
    active() {
      return this.draft || this.current;
    },
    draftId() {
      return this.draft?.driveId || "";
    },
    draftUrl() {
      return this.draft?.driveId ? "" : this.draft?.url || "";
    },
    preview() {
      if (this.active?.driveId) return driveImageUrl(this.active.driveId, 600);
      if (this.active?.url) return this.active.url;
      return fallbackHero;
    },
  },
  methods: {
    onImgError(e) {
      if (this.active?.driveId) {
        const fb = driveThumbUrl(this.active.driveId, 600);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    setImage(link) {
      const value = (link || "").trim();
      if (!value) {
        this.draft = null;
        return;
      }
      const id = extractDriveId(value);
      if (id) {
        this.draft = { driveId: id, url: null };
      } else {
        this.draft = { url: value, driveId: null };
      }
    },
    save() {
      if (!this.draft) return;
      this.$store.dispatch("updateHeaderImage", this.draft).then(() => {
        this.draft = null;
        this.$store.dispatch("successNotif", "Image d'en-tête mise à jour.");
      });
    },
  },
  created() {
    if (!this.current) this.$store.dispatch("getHeaderImage");
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$muted: #5b6b78;
$line: #dde6ec;

.hset {
  &__hint {
    font-size: 13px;
    color: $muted;
    margin: 0 0 18px;
    max-width: 560px;
  }
  &__row {
    display: flex;
    gap: 20px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 12px;
    padding: 16px;
    max-width: 640px;
  }
  &__form {
    flex: 1;
    display: flex;
    flex-direction: column;
    label {
      font-size: 11.5px;
      font-weight: 700;
      color: $navy;
      margin-bottom: 6px;
    }
  }
  &__id {
    font-size: 10.5px;
    color: $muted;
    margin-top: 6px;
    word-break: break-all;
  }
}
.ph {
  flex: none;
  width: 220px;
  height: 124px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(120deg, $navy, $sky);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
.inp {
  padding: 9px 11px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13px;
  outline: none;
  &:focus {
    border-color: $sky;
  }
}
.btn-save {
  align-self: flex-start;
  margin-top: 12px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 7px;
  padding: 8px 16px;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: $navy-700;
  }
  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
}

@media (max-width: 560px) {
  .hset__row {
    flex-direction: column;
  }
  .ph {
    width: 100%;
    height: 160px;
  }
}
</style>
