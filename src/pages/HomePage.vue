<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__wrap">
        <div class="hero__main">
          <span class="hero__eyebrow">{{ $t("home.eyebrow") }}</span>
          <h1 class="hero__title">{{ $t("home.title") }}</h1>
          <p class="hero__lead">{{ $t("home.lead") }}</p>
          <div class="hero__cta">
            <router-link to="/aip" class="btn btn--primary">{{
              $t("home.cta1")
            }}</router-link>
            <router-link
              to="/eservice/Demande d'autorisation de vol"
              class="btn btn--ghost"
              >{{ $t("home.cta2") }}</router-link
            >
          </div>
        </div>

        <div class="hero__card">
          <div class="hero__label">{{ $t("home.quickTitle") }}</div>
          <router-link to="/aip" class="qrow">
            <span class="qrow__b">{{ $t("home.qaAip") }}</span>
            <span class="qrow__s">{{ $t("home.qaAipSub") }}</span>
          </router-link>
          <router-link to="/eservice/demande_autorisation_vol" class="qrow">
            <span class="qrow__b">{{ $t("home.qaPermit") }}</span>
            <span class="qrow__s">{{ $t("home.qaPermitSub") }}</span>
          </router-link>
          <router-link to="/eservice/formulaire_compte_rendu" class="qrow">
            <span class="qrow__b">{{ $t("home.qaReport") }}</span>
            <span class="qrow__s">{{ $t("home.qaReportSub") }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="section">
      <div class="wrap">
        <div class="wingline">
          <svg width="52" height="14" viewBox="0 0 52 14">
            <g fill="#1B9DD9">
              <path d="M0 6h20l-4 2H0z" opacity=".5" />
              <path d="M6 1h20l-4 2H6z" />
              <path d="M3 11h20l-4 2H3z" opacity=".35" />
            </g>
          </svg>
          <span class="wingline__lbl">{{ $t("home.servicesLabel") }}</span>
        </div>
        <h2 class="shead">{{ $t("home.servicesTitle") }}</h2>
        <div class="grid4">
          <div class="card" v-for="n in 4" :key="n">
            <div class="card__ic">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                />
                <path d="M14 2v6h6" />
              </svg>
            </div>
            <h3>{{ $t("home.s" + n + "t") }}</h3>
            <p>{{ $t("home.s" + n + "p") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ACTUALITÉS -->
    <section class="section section--alt">
      <div class="wrap">
        <div class="shead-row">
          <div>
            <div class="wingline">
              <svg width="52" height="14" viewBox="0 0 52 14">
                <g fill="#1B9DD9">
                  <path d="M0 6h20l-4 2H0z" opacity=".5" />
                  <path d="M6 1h20l-4 2H6z" />
                  <path d="M3 11h20l-4 2H3z" opacity=".35" />
                </g>
              </svg>
              <span class="wingline__lbl">{{ $t("home.newsLabel") }}</span>
            </div>
            <h2 class="shead">{{ $t("home.newsTitle") }}</h2>
          </div>
        </div>

        <p v-if="!news.length" class="empty">{{ $t("home.newsEmpty") }}</p>

        <div v-else class="news">
          <router-link
            v-for="article in news"
            :key="article._id"
            :to="'/Article/' + article._id"
            class="ncard"
          >
            <div class="ncard__ph">
              <img
                v-if="imageSrc(article)"
                :src="imageSrc(article)"
                alt=""
                @error="onImgError($event, article)"
              />
            </div>
            <div class="ncard__bd">
              <div class="ncard__date">{{ article.createdAt }}</div>
              <h3 class="ncard__title">{{ article.title }}</h3>
              <p class="ncard__excerpt">{{ excerpt(article.content) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { driveImageUrl, driveThumbUrl } from "@/utils/drive";

export default {
  name: "HomePage",
  computed: {
    news() {
      // les actualités mises en avant (déjà triées et datées par le store)
      return (this.$store.getters.getNews || []).filter(Boolean);
    },
  },
  methods: {
    imageSrc(item) {
      if (item.driveId) return driveImageUrl(item.driveId, 600);
      return item.url || "";
    },
    onImgError(e, item) {
      if (item.driveId) {
        const fb = driveThumbUrl(item.driveId, 600);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    excerpt(html) {
      const text = String(html || "")
        .replace(/<[^>]*>/g, "")
        .trim();
      return text.length > 120 ? text.slice(0, 120) + "…" : text;
    },
  },
  created() {
    if (!this.news.length) this.$store.dispatch("getNews");
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$ink: #16242f;
$muted: #5b6b78;
$line: #dde6ec;
$serif: "Spectral", Georgia, serif;

.home {
  font-family: "Inter", system-ui, sans-serif;
}
.wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* HERO */
.hero {
  background: radial-gradient(
    120% 130% at 80% -10%,
    #15406e 0%,
    $navy 55%,
    #07223e 100%
  );
  color: #eaf3fa;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      135deg,
      rgba(27, 157, 217, 0.06) 0 1px,
      transparent 1px 26px
    );
    pointer-events: none;
  }
  &__wrap {
    position: relative;
    max-width: 1180px;
    margin: 0 auto;
    padding: 64px 24px;
    display: grid;
    grid-template-columns: 1.25fr 0.9fr;
    gap: 40px;
    align-items: center;
  }
  &__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: $sky;
    margin-bottom: 16px;
    &::before {
      content: "";
      width: 26px;
      height: 1px;
      background: $sky;
    }
  }
  &__title {
    font-family: $serif;
    font-size: 40px;
    line-height: 1.12;
    font-weight: 800;
    color: #fff;
    margin-bottom: 18px;
  }
  &__lead {
    font-size: 16px;
    color: #bcd4e6;
    max-width: 46ch;
    margin-bottom: 28px;
  }
  &__cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  &__card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 14px;
    padding: 8px;
  }
  &__label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9fbdd2;
    padding: 12px 16px 8px;
  }
}
.btn {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 22px;
  border-radius: 8px;
  text-decoration: none;
  border: 1px solid transparent;
  transition: 0.15s;
  &--primary {
    background: $sky;
    color: #fff;
    &:hover {
      background: #1689bf;
    }
  }
  &--ghost {
    background: rgba(255, 255, 255, 0.06);
    color: #eaf3fa;
    border-color: rgba(255, 255, 255, 0.22);
    &:hover {
      background: rgba(255, 255, 255, 0.12);
    }
  }
}
.qrow {
  display: flex;
  flex-direction: column;
  padding: 13px 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.15s;
  & + .qrow {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }
  &__b {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  &__s {
    font-size: 12px;
    color: #9fbdd2;
  }
}

/* SECTIONS */
.section {
  padding: 56px 0;
  &--alt {
    background: #fff;
    border-top: 1px solid $line;
    border-bottom: 1px solid $line;
  }
}
.wingline {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 6px;
  &__lbl {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: $sky;
  }
}
.shead {
  font-family: $serif;
  font-size: 27px;
  font-weight: 700;
  color: $navy;
  margin-bottom: 28px;
}
.shead-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.grid4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.card {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 22px;
  transition: 0.18s;
  &:hover {
    transform: translateY(-3px);
    border-color: #c4d6e2;
  }
  &__ic {
    width: 46px;
    height: 46px;
    border-radius: 11px;
    background: $sky-soft;
    color: $sky;
    display: grid;
    place-items: center;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 15px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 5px;
  }
  p {
    font-size: 12.5px;
    color: $muted;
    line-height: 1.5;
  }
}

/* NEWS */
.news {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.ncard {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: 0.18s;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(10, 43, 78, 0.1);
  }
  &__ph {
    height: 170px;
    background: linear-gradient(120deg, $navy, $sky);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  &__bd {
    padding: 16px 17px;
  }
  &__date {
    font-size: 11.5px;
    color: $sky;
    font-weight: 600;
    margin-bottom: 7px;
  }
  &__title {
    font-family: $serif;
    font-size: 17px;
    font-weight: 600;
    color: $navy;
    line-height: 1.3;
    margin-bottom: 8px;
  }
  &__excerpt {
    font-size: 13px;
    color: $muted;
    line-height: 1.55;
  }
}
.empty {
  color: $muted;
  font-size: 14px;
}

@media (max-width: 920px) {
  .hero__wrap {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 44px 24px;
  }
  .hero__title {
    font-size: 30px;
  }
  .grid4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .news {
    grid-template-columns: 1fr;
  }
}
</style>
