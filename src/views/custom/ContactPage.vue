<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-hero__bg" :style="heroBgStyle"></div>
      <div class="page-hero__overlay"></div>
      <div class="page-hero__inner">
        <span class="page-hero__eyebrow">{{ parentLabel }}</span>
        <h1 class="page-hero__title">{{ heroTitle }}</h1>
      </div>
    </header>

    <section class="contact-page">
      <p class="contact-page__intro">
        {{ $t("pages.contact.intro") }}
      </p>

      <div class="contact-grid">
        <!-- Coordonnées -->
        <div class="info-card">
          <h2 class="info-card__title">Siège social</h2>

          <div class="info-row">
            <span class="info-row__ic"
              ><font-awesome-icon :icon="['fas', 'home']"
            /></span>
            <div>
              <b>Siège social</b>
              <span>Aéroport international de Djibouti (Ambouli)</span>
            </div>
          </div>

          <a class="info-row" href="tel:+25321335100">
            <span class="info-row__ic"
              ><font-awesome-icon :icon="['fas', 'phone']"
            /></span>
            <div><b>Téléphone</b><span>+253 21 33 51 00</span></div>
          </a>

          <div class="info-row">
            <span class="info-row__ic"
              ><font-awesome-icon :icon="['fas', 'fax']"
            /></span>
            <div><b>Fax</b><span>+253 21 34 01 69</span></div>
          </div>

          <div class="info-row">
            <span class="info-row__ic"
              ><font-awesome-icon :icon="['fas', 'inbox']"
            /></span>
            <div><b>Boîte postale</b><span>2609</span></div>
          </div>

          <a class="info-row" href="mailto:civilaviaton@intnet.dj">
            <span class="info-row__ic"
              ><font-awesome-icon :icon="['fas', 'envelope']"
            /></span>
            <div><b>E-mail</b><span>civilaviaton@intnet.dj</span></div>
          </a>
        </div>

        <!-- Carte -->
        <div class="map-card">
          <Map />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Map from "@/components/MapComponent.vue";
import { driveImageUrl } from "@/utils/drive";
import fallbackHero from "@/assets/article.jpeg";

export default {
  name: "ContactPage",
  components: { Map },
  computed: {
    heroTitle() {
      return this.$t("pages.contact.title");
    },
    parentLabel() {
      return this.$t("pages.contact.eyebrow");
    },
    headerImage() {
      return this.$store.getters.getHeaderImage;
    },
    heroBgUrl() {
      const h = this.headerImage;
      if (h?.driveId) return driveImageUrl(h.driveId, 1200);
      if (h?.url) return h.url;
      return fallbackHero;
    },
    heroBgStyle() {
      return { backgroundImage: `url(${this.heroBgUrl})` };
    },
  },
  created() {
    if (!this.$store.state.media.headerImage) {
      this.$store.dispatch("getHeaderImage");
    }
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$muted: #5b6b78;
$line: #dde6ec;

.page {
  background: #fff;
}
.page-hero {
  position: relative;
  min-height: 220px;
  display: flex;
  align-items: flex-end;
  background: $navy;
  &__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 43, 78, 0.4) 0%,
      rgba(10, 43, 78, 0.86) 100%
    );
  }
  &__inner {
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 26px 24px;
  }
  &__eyebrow {
    color: #bcd4e6;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  &__title {
    font-family: "Spectral", Georgia, serif;
    color: #fff;
    font-size: 32px;
    font-weight: 800;
    margin-top: 6px;
  }
}

.contact-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px 24px 64px;
  &__intro {
    font-size: 14.5px;
    color: $muted;
    max-width: 560px;
    margin-bottom: 24px;
  }
}
.contact-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 22px;
  align-items: stretch;
}
.info-card {
  background: #fff;
  border: 1px solid $line;
  border-top: 4px solid $navy;
  border-radius: 14px;
  padding: 24px;
  &__title {
    font-family: "Spectral", Georgia, serif;
    font-size: 18px;
    color: $navy;
    margin-bottom: 16px;
  }
}
.info-row {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 12px 0;
  border-bottom: 1px solid #eef3f6;
  text-decoration: none;
  color: inherit;
  &:last-child {
    border-bottom: none;
  }
  &__ic {
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: $sky-soft;
    color: $sky;
    display: grid;
    place-items: center;
    font-size: 15px;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  b {
    font-size: 13.5px;
    color: $navy;
  }
  span {
    font-size: 13.5px;
    color: $muted;
  }
  &[href]:hover {
    b {
      color: $sky;
    }
    span {
      color: $navy;
    }
  }
}
.map-card {
  background: #fff;
  border: 1px solid $line;
  border-radius: 14px;
  overflow: hidden;
  min-height: 420px;
  :deep(.map),
  :deep(iframe),
  :deep(canvas),
  :deep(.leaflet-container) {
    width: 100%;
    height: 100%;
    min-height: 420px;
  }
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  .map-card {
    min-height: 340px;
  }
}
@media (max-width: 560px) {
  .page-hero {
    min-height: 160px;
  }
  .page-hero__title {
    font-size: 24px;
  }
}
</style>
