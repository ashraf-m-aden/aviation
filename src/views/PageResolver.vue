<template>
  <div class="page-resolver">
    <div v-if="loading" class="page-resolver__loading">{{ $t("common.loading") }}</div>

    <!-- Route dynamique : liste de documents d'une catégorie -->
    <DocumentListPage
      v-else-if="resolved && resolved.kind === 'documents'"
      :key="'docs-' + currentSlug"
      :category-id="resolved.category"
      :title="resolved.label"
    />

    <!-- Page de contenu éditable (blocs texte + images) -->
    <ContentPage
      v-else-if="resolved && resolved.kind === 'content'"
      :key="'content-' + currentSlug"
      :item="resolved"
    />

    <!-- Page codée à la main, référencée par clé dans le registre -->
    <component
      v-else-if="asyncComponent"
      :is="asyncComponent"
      :key="'comp-' + currentSlug"
    />

    <!-- Rien ne correspond -->
    <PageNotFound v-else />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import DocumentListPage from "./DocumentListPage.vue";
import ContentPage from "./ContentPage.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import { getCustomComponent } from "@/router/componentRegistry";

/** Aplatit l'arbre de navigation en une liste d'items navigables (type link). */
function flattenLinks(items) {
  const out = [];
  (items || []).forEach((it) => {
    if (it.type === "link") out.push(it);
    if (Array.isArray(it.children)) {
      it.children.forEach((c) => {
        if (c.type !== "dropdown") out.push(c);
      });
    }
  });
  return out;
}

export default {
  name: "PageResolver",
  components: { DocumentListPage, ContentPage, PageNotFound },
  data() {
    return { navLoaded: false };
  },
  computed: {
    navItems() {
      return this.$store.getters.getPublicNavigation || [];
    },
    loading() {
      return !this.navLoaded;
    },
    currentSlug() {
      const s = this.$route.params.slug;
      return Array.isArray(s) ? s.join("/") : s || "";
    },
    resolved() {
      const slug = this.currentSlug;
      return flattenLinks(this.navItems).find((it) => it.slug === slug) || null;
    },
    asyncComponent() {
      if (this.resolved && this.resolved.kind === "component") {
        const loader = getCustomComponent(this.resolved.component);
        return loader ? defineAsyncComponent(loader) : null;
      }
      return null;
    },
  },
  watch: {
    // Un lien externe n'a pas de page : on redirige.
    resolved: {
      immediate: true,
      handler(item) {
        if (item && item.kind === "external" && item.url) {
          window.location.href = item.url;
        }
      },
    },
  },
  async created() {
    if (!this.navItems.length) {
      await this.$store.dispatch("fetchPublicNavigation");
    }
    this.navLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.page-resolver__loading {
  padding: 80px 24px;
  text-align: center;
  color: #5b6b78;
}
</style>
