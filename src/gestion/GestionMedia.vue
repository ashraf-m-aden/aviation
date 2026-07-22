<template>
  <div class="gestion-media">
    <h2 class="gm-title">Médias & bannières</h2>

    <div class="gm-tabs">
      <button
        v-for="t in visibleTabs"
        :key="t.key"
        class="gm-tab"
        :class="{ 'is-active': tab === t.key }"
        @click="tab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <p v-if="!visibleTabs.length" class="gm-empty">
      Aucun accès média ne t'a été attribué. Contacte un administrateur.
    </p>

    <div class="gm-panel" v-else>
      <HeaderImagePage v-if="tab === 'header' && isAdmin" />
      <BannerPage v-else-if="tab === 'banners' && canAccess('banners')" />
      <NewsPage v-else-if="tab === 'news' && canAccess('news')" />
    </div>
  </div>
</template>

<script>
import HeaderImagePage from "./HeaderImagePage.vue";
import BannerPage from "./BannerPage.vue";
import NewsPage from "./NewsPage.vue";

export default {
  name: "GestionMedia",
  components: { BannerPage, NewsPage, HeaderImagePage },
  metaInfo() {
    return { meta: [{ name: "robots", content: "noindex" }] };
  },
  data() {
    return {
      tab: "",
      tabs: [
        { key: "banners", label: "Bannières" },
        { key: "news", label: "Actualités" },
        { key: "header", label: "Image d'en-tête", adminOnly: true },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser || {};
    },
    isAdmin() {
      return this.currentUser.isAdmin === true;
    },
    mediaAccess() {
      return this.currentUser.mediaAccess || [];
    },
    visibleTabs() {
      return this.tabs.filter((t) => {
        if (t.adminOnly) return this.isAdmin;
        return this.isAdmin || this.mediaAccess.includes(t.key);
      });
    },
  },
  methods: {
    canAccess(key) {
      return this.isAdmin || this.mediaAccess.includes(key);
    },
  },
  watch: {
    // Si l'onglet actif devient inaccessible (rôle/attribution changés en
    // cours de session), on bascule sur le premier onglet encore visible.
    visibleTabs: {
      immediate: true,
      handler(tabs) {
        const stillVisible = tabs.some((t) => t.key === this.tab);
        if (!stillVisible) {
          this.tab = tabs.length ? tabs[0].key : "";
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
$muted: #5b6b78;
$line: #dde6ec;

.gestion-media {
  max-width: 1000px;
}
.gm-title {
  font-size: 22px;
  color: $navy;
  font-family: "Spectral", Georgia, serif;
  margin-bottom: 18px;
}
.gm-tabs {
  display: inline-flex;
  gap: 4px;
  background: #fff;
  border: 1px solid $line;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 22px;
}
.gm-tab {
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: $muted;
  background: none;
  border: none;
  padding: 9px 18px;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    color: $navy;
  }
  &.is-active {
    background: $navy;
    color: #fff;
  }
}
.gm-empty {
  color: $muted;
  font-size: 14px;
}
</style>
