<template>
  <article class="content-page">
    <h1 class="content-page__title">{{ localized(item.label) }}</h1>

    <component
      :is="blockTag(block)"
      v-for="(block, i) in blocks"
      :key="i"
      class="content-block"
    >
      <!-- Titre de section -->
      <template v-if="block.type === 'heading'">{{ localized(block.text) }}</template>

      <!-- Paragraphe riche (HTML produit par Quill, par langue) -->
      <span
        v-else-if="block.type === 'text'"
        class="content-block__html"
        v-html="localized(block.html)"
      ></span>

      <!-- Image hébergée sur Drive -->
      <figure v-else-if="block.type === 'image'" class="content-block__figure">
        <img
          :src="driveImageUrl(block.driveId)"
          :alt="localized(block.caption)"
          @error="onImgError($event, block)"
        />
        <figcaption v-if="localized(block.caption)">
          {{ localized(block.caption) }}
        </figcaption>
      </figure>

      <!-- Encart document téléchargeable -->
      <a
        v-else-if="block.type === 'file'"
        class="content-block__file"
        :href="driveFileUrl(block.driveId)"
        target="_blank"
        rel="noopener"
      >
        {{ localized(block.label) || $t("common.download") }}
      </a>
    </component>
  </article>
</template>

<script>
import { driveImageUrl, driveThumbUrl, driveFileUrl } from "@/utils/drive";

export default {
  name: "ContentPage",
  props: {
    item: { type: Object, required: true },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    blocks() {
      return (this.item.content && this.item.content.blocks) || [];
    },
  },
  methods: {
    localized(map) {
      if (!map) return "";
      if (typeof map === "string") return map;
      return map[this.locale] || map.fr || "";
    },
    driveImageUrl,
    driveFileUrl,
    // un bloc heading devient un <h2>, le reste un <div>
    blockTag(block) {
      return block.type === "heading" ? "h2" : "div";
    },
    // repli sur l'endpoint thumbnail si la 1re URL d'image échoue
    onImgError(event, block) {
      const fallback = driveThumbUrl(block.driveId);
      if (event.target.src !== fallback) event.target.src = fallback;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-page {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 24px;
  line-height: 1.7;
}
.content-page__title {
  font-size: 30px;
  color: #0a2b4e;
  margin-bottom: 24px;
}
.content-block {
  margin-bottom: 20px;
  color: #16242f;
}
h2.content-block {
  font-size: 20px;
  color: #0a2b4e;
  margin: 32px 0 12px;
}
.content-block__figure {
  margin: 0;
  img {
    width: 100%;
    border-radius: 10px;
    display: block;
  }
  figcaption {
    font-size: 13px;
    color: #5b6b78;
    margin-top: 8px;
    text-align: center;
  }
}
.content-block__file {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1b9dd9;
  border: 1px solid #dde6ec;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  &:hover {
    background: #e8f5fc;
  }
}
</style>
