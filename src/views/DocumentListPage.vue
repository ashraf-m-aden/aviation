<template>
  <div class="doc-list">
    <header class="doc-list__head">
      <h1>{{ localized(title) }}</h1>
    </header>

    <p v-if="!documents.length" class="doc-list__empty">
      {{ $t("common.loading") }}
    </p>

    <ul v-else class="doc-list__items">
      <li v-for="doc in documents" :key="doc._id" class="doc-row">
        <div class="doc-row__info">
          <span class="doc-row__name">{{ doc.name }}</span>
          <span v-if="doc.createdAt" class="doc-row__date">{{ doc.createdAt }}</span>
        </div>
        <a
          class="doc-row__consult"
          :href="fileLink(doc)"
          target="_blank"
          rel="noopener"
        >
          {{ $t("common.consult") }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { driveFileUrl } from "@/utils/drive";

export default {
  name: "DocumentListPage",
  props: {
    // _id de la sous-catégorie dont on liste les documents (= idParent des docs)
    categoryId: { type: String, default: "" },
    // libellé multilingue { fr, en, ar } passé par le résolveur
    title: { type: [Object, String], default: () => ({}) },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    allPublic() {
      return this.$store.getters.getPublicDocumments || [];
    },
    documents() {
      if (!this.categoryId) return this.allPublic;
      // les documents sont rattachés à leur (sous-)catégorie via `idParent`
      return this.allPublic.filter((d) => d.idParent === this.categoryId);
    },
  },
  methods: {
    localized(map) {
      if (!map) return "";
      if (typeof map === "string") return map;
      return map[this.locale] || map.fr || "";
    },
    // nouvelle donnée = driveId ; ancienne = src (URL Storage) le temps de la migration
    fileLink(doc) {
      if (doc.driveId) return driveFileUrl(doc.driveId);
      return doc.src || doc.url || "#";
    },
  },
  created() {
    if (!this.allPublic.length) {
      this.$store.dispatch("setPublicDocuments");
    }
  },
};
</script>

<style lang="scss" scoped>
.doc-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}
.doc-list__head h1 {
  font-size: 28px;
  color: #0a2b4e;
  margin-bottom: 24px;
}
.doc-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #dde6ec;
  border-radius: 10px;
  overflow: hidden;
}
.doc-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid #dde6ec;
  &:last-child {
    border-bottom: none;
  }
}
.doc-row__info {
  display: flex;
  flex-direction: column;
}
.doc-row__name {
  font-weight: 600;
  color: #0a2b4e;
}
.doc-row__date {
  font-size: 12px;
  color: #5b6b78;
}
.doc-row__consult {
  margin-inline-start: auto;
  font-size: 13px;
  font-weight: 600;
  color: #1b9dd9;
  border: 1px solid #dde6ec;
  padding: 7px 14px;
  border-radius: 7px;
  text-decoration: none;
  &:hover {
    background: #1b9dd9;
    color: #fff;
  }
}
</style>
