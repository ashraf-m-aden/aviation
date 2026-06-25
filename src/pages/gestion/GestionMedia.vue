<template>
  <div class="gestion-media">
    <h2 class="gm-title">Médias & bannières</h2>

    <div class="gm-tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="gm-tab"
        :class="{ 'is-active': tab === t.key }"
        @click="tab = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="gm-panel">
      <BannerPage v-if="tab === 'banners'" />
      <NewsPage v-else />
    </div>
  </div>
</template>

<script>
import BannerPage from "./BannerPage.vue";
import NewsPage from "./NewsPage.vue";

export default {
  name: "GestionMedia",
  components: { BannerPage, NewsPage },
  metaInfo() {
    return { meta: [{ name: "robots", content: "noindex" }] };
  },
  data() {
    return {
      tab: "banners",
      tabs: [
        { key: "banners", label: "Bannières" },
        { key: "news", label: "Actualités" },
      ],
    };
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
  &:hover { color: $navy; }
  &.is-active { background: $navy; color: #fff; }
}
</style>
