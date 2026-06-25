<template>
  <div class="block-editor">
    <!-- Onglet de langue commun à tous les blocs -->
    <div class="block-editor__langs">
      <span class="block-editor__hint">Langue du contenu :</span>
      <button
        v-for="l in langs"
        :key="l.code"
        type="button"
        class="lang-tab"
        :class="{ 'is-active': activeLang === l.code }"
        @click="activeLang = l.code"
      >
        {{ l.label }}
      </button>
    </div>

    <!-- Liste des blocs -->
    <div v-if="!blocks.length" class="block-editor__empty">
      Aucun bloc. Ajoute un titre, un paragraphe, une image ou un fichier.
    </div>

    <div v-for="(block, i) in blocks" :key="block._uid" class="blk">
      <div class="blk__bar">
        <span class="blk__type">{{ typeLabel(block.type) }}</span>
        <span class="blk__spacer"></span>
        <button type="button" class="blk__btn" :disabled="i === 0" @click="move(i, -1)" title="Monter">▲</button>
        <button type="button" class="blk__btn" :disabled="i === blocks.length - 1" @click="move(i, 1)" title="Descendre">▼</button>
        <button type="button" class="blk__btn blk__btn--del" @click="remove(i)" title="Supprimer">✕</button>
      </div>

      <!-- Titre -->
      <input
        v-if="block.type === 'heading'"
        v-model="block.text[activeLang]"
        class="blk__input"
        :dir="dirFor(activeLang)"
        placeholder="Titre de section"
      />

      <!-- Paragraphe riche (Quill) -->
      <div v-else-if="block.type === 'text'" class="blk__quill" :dir="dirFor(activeLang)">
        <QuillEditor
          :key="block._uid + '-' + activeLang"
          :content="block.html[activeLang]"
          content-type="html"
          theme="snow"
          @update:content="(val) => (block.html[activeLang] = val)"
        />
      </div>

      <!-- Image Drive -->
      <div v-else-if="block.type === 'image'" class="blk__media">
        <input
          v-model="block.driveId"
          class="blk__input"
          placeholder="Colle le lien Google Drive ou l'ID"
          @change="block.driveId = extractDriveId(block.driveId)"
        />
        <input
          v-model="block.caption[activeLang]"
          class="blk__input"
          :dir="dirFor(activeLang)"
          placeholder="Légende (optionnelle)"
        />
        <img
          v-if="block.driveId"
          :src="driveImageUrl(block.driveId, 600)"
          class="blk__preview"
          alt="aperçu"
          @error="onImgError($event, block)"
        />
      </div>

      <!-- Fichier Drive -->
      <div v-else-if="block.type === 'file'" class="blk__media">
        <input
          v-model="block.driveId"
          class="blk__input"
          placeholder="Colle le lien Google Drive ou l'ID"
          @change="block.driveId = extractDriveId(block.driveId)"
        />
        <input
          v-model="block.label[activeLang]"
          class="blk__input"
          :dir="dirFor(activeLang)"
          placeholder="Libellé du bouton de téléchargement"
        />
      </div>
    </div>

    <!-- Barre d'ajout -->
    <div class="block-editor__add">
      <button type="button" @click="add('heading')">+ Titre</button>
      <button type="button" @click="add('text')">+ Paragraphe</button>
      <button type="button" @click="add('image')">+ Image</button>
      <button type="button" @click="add('file')">+ Fichier</button>
    </div>
  </div>
</template>

<script>
import { extractDriveId, driveImageUrl, driveThumbUrl } from "@/utils/drive";

let uid = 0;
const nextUid = () => `b${Date.now()}_${uid++}`;

export default {
  name: "BlockEditor",
  props: {
    // tableau réactif de blocs (détenu par la modal) — muté en place
    blocks: { type: Array, required: true },
  },
  data() {
    return {
      activeLang: "fr",
      langs: [
        { code: "fr", label: "Français" },
        { code: "en", label: "English" },
        { code: "ar", label: "العربية" },
      ],
    };
  },
  created() {
    // garantit une clé stable pour le rendu (les blocs venant de Firestore n'en ont pas)
    this.blocks.forEach((b) => {
      if (!b._uid) b._uid = nextUid();
    });
  },
  methods: {
    extractDriveId,
    driveImageUrl,
    dirFor(lang) {
      return lang === "ar" ? "rtl" : "ltr";
    },
    typeLabel(type) {
      return { heading: "Titre", text: "Paragraphe", image: "Image", file: "Fichier" }[type] || type;
    },
    blank() {
      return { fr: "", en: "", ar: "" };
    },
    add(type) {
      const base = { _uid: nextUid(), type };
      if (type === "heading") base.text = this.blank();
      else if (type === "text") base.html = this.blank();
      else if (type === "image") (base.driveId = ""), (base.caption = this.blank());
      else if (type === "file") (base.driveId = ""), (base.label = this.blank());
      this.blocks.push(base);
    },
    remove(i) {
      this.blocks.splice(i, 1);
    },
    move(i, dir) {
      const j = i + dir;
      if (j < 0 || j >= this.blocks.length) return;
      const arr = this.blocks;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    },
    onImgError(event, block) {
      const fb = driveThumbUrl(block.driveId, 600);
      if (event.target.src !== fb) event.target.src = fb;
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
$line: #dde6ec;

.block-editor {
  border: 1px solid $line;
  border-radius: 10px;
  padding: 14px;
  background: #fbfcfd;

  &__langs {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }
  &__hint {
    font-size: 12px;
    color: #5b6b78;
    margin-inline-end: 4px;
  }
  &__empty {
    font-size: 13px;
    color: #5b6b78;
    padding: 10px 2px;
  }
  &__add {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;
    button {
      font: inherit;
      font-size: 12.5px;
      font-weight: 600;
      color: $navy;
      background: #fff;
      border: 1px dashed #b9cde0;
      border-radius: 8px;
      padding: 8px 14px;
      cursor: pointer;
      &:hover {
        border-color: $sky;
        background: #e8f5fc;
      }
    }
  }
}
.lang-tab {
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 6px;
  border: 1px solid $line;
  background: #fff;
  color: #5b6b78;
  cursor: pointer;
  &.is-active {
    background: $navy;
    color: #fff;
    border-color: $navy;
  }
}
.blk {
  background: #fff;
  border: 1px solid $line;
  border-radius: 9px;
  padding: 12px;
  margin-bottom: 10px;
  &__bar {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 9px;
  }
  &__type {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: $sky;
  }
  &__spacer {
    flex: 1;
  }
  &__btn {
    width: 28px;
    height: 28px;
    border: 1px solid $line;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    color: #5b6b78;
    font-size: 11px;
    &:hover:not(:disabled) {
      border-color: #b9cde0;
      color: $navy;
    }
    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
    &--del:hover {
      background: #e0322b;
      color: #fff;
      border-color: #e0322b;
    }
  }
  &__input {
    width: 100%;
    padding: 9px 12px;
    border: 1px solid $line;
    border-radius: 8px;
    font: inherit;
    font-size: 13.5px;
    outline: none;
    margin-bottom: 8px;
    &:focus {
      border-color: $sky;
    }
  }
  &__media {
    display: flex;
    flex-direction: column;
  }
  &__preview {
    max-width: 220px;
    border-radius: 8px;
    border: 1px solid $line;
    margin-top: 4px;
  }
  &__quill {
    background: #fff;
  }
}
</style>
