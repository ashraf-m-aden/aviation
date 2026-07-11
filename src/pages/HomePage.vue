<template>
  <div class="home">
    <!-- HERO : texte à gauche, carrousel à droite -->
    <section class="hero">
      <div class="hero__wrap">
        <!-- Texte -->
        <div class="hero__text">
          <span class="hero__eyebrow">{{ $t("home.eyebrow") }}</span>
          <h1 class="hero__title">{{ $t("home.title") }}</h1>
          <p class="hero__lead">
            L'Autorité de l'Aviation Civile (AAC), créée conformément à la Loi
            n°108/AN/10/6<sup>ème</sup>L du 10 janvier 2011, est un
            établissement public administratif, rattaché au Ministère de
            l'Équipement et des Transports en République de Djibouti. Elle est
            chargée de la mise en œuvre de la politique aéronautique nationale,
            notamment de la règlementation et de la supervision de l'aviation
            civile, en matière de sécurité, de sûreté, de la protection de
            l'environnement et d'économie. Son objectif est de veiller au
            développement sûr, ordonné et efficient de l'aviation civile en
            République de Djibouti.
          </p>
          <router-link to="/a_propos/presentation" class="btn btn--primary">
            En savoir plus
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </router-link>
        </div>

        <!-- Carrousel -->
        <div class="carousel" @mouseenter="stopAuto" @mouseleave="startAuto">
          <div
            class="carousel__track"
            :style="{ transform: `translateX(-${current * 100}%)` }"
          >
            <div class="slide" v-for="(s, i) in slides" :key="i">
              <img :src="s.img" :alt="s.title || ''" />
              <div class="slide__cap" v-if="s.title">
                <span>{{ s.title }}</span>
                <small v-if="s.sub">{{ s.sub }}</small>
              </div>
            </div>
          </div>

          <button
            v-if="slides.length > 1"
            class="cnav cnav--prev"
            @click="prev"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            v-if="slides.length > 1"
            class="cnav cnav--next"
            @click="next"
            aria-label="Suivant"
          >
            ›
          </button>

          <div class="dots" v-if="slides.length > 1">
            <button
              v-for="(s, i) in slides"
              :key="i"
              class="dot"
              :class="{ on: i === current }"
              @click="goTo(i)"
              :aria-label="`Image ${i + 1}`"
            ></button>
          </div>
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
            :to="{ path: '/articles', query: { article: article._id } }"
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
import heroImg from "@/assets/article.jpeg";

export default {
  name: "HomePage",
  data() {
    return {
      current: 0,
      timer: null,
      fallbackSlides: [{ img: heroImg, title: "", sub: "" }],
    };
  },
  computed: {
    news() {
      return (this.$store.getters.getNews || []).filter(Boolean);
    },
    slides() {
      const banners = this.$store.state.media.banner || [];
      if (banners.length) {
        return banners.map((b) => ({
          img: b.driveId ? driveImageUrl(b.driveId, 1400) : b.url || heroImg,
          title: b.title || "",
          sub: b.description || "",
        }));
      }
      return this.fallbackSlides;
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
    next() {
      this.current = (this.current + 1) % this.slides.length;
    },
    prev() {
      this.current =
        (this.current - 1 + this.slides.length) % this.slides.length;
    },
    goTo(i) {
      this.current = i;
      this.startAuto();
    },
    startAuto() {
      this.stopAuto();
      if (this.slides.length > 1) this.timer = setInterval(this.next, 5000);
    },
    stopAuto() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  created() {
    if (!this.news.length) this.$store.dispatch("getNews");
    if (!(this.$store.state.media.banner || []).length)
      this.$store.dispatch("getBanners");
  },
  mounted() {
    this.startAuto();
  },
  beforeUnmount() {
    this.stopAuto();
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
  background: linear-gradient(165deg, #f6f9fc 0%, #e9f0f8 60%, #e2ebf5 100%);
  color: #2a3a47;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      135deg,
      rgba(10, 43, 78, 0.035) 0 1px,
      transparent 1px 26px
    );
    pointer-events: none;
  }
  &__wrap {
    position: relative;
    max-width: 100%;
    margin: 0 0;
    padding: 0 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 44px;
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
    color: $navy;
    margin-bottom: 18px;
  }
  &__lead {
    font-size: 16px;
    color: #4a5b68;
    line-height: 1.7;
    max-width: 100%;
    margin-bottom: 28px;
  }
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
}

/* CARROUSEL */
.carousel {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(10, 43, 78, 0.18);
  border: 1px solid rgba(10, 43, 78, 0.08);
  height: 100%;
  &__track {
    display: flex;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
.slide {
  position: relative;
  flex: 0 0 100%;
  height: 100%;
  background: #e9eef3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &__cap {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    padding: 40px 22px 22px;
    background: linear-gradient(180deg, transparent, rgba(6, 20, 35, 0.82));
    color: #fff;
    span {
      display: block;
      font-family: $serif;
      font-size: 19px;
      font-weight: 700;
    }
    small {
      display: block;
      font-size: 13px;
      color: #cfe1ee;
      margin-top: 4px;
    }
  }
}
.cnav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.85);
  color: $navy;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.15s;
  &:hover {
    background: #fff;
  }
  &--prev {
    inset-inline-start: 12px;
  }
  &--next {
    inset-inline-end: 12px;
  }
}
.dots {
  position: absolute;
  inset-inline: 0;
  bottom: 12px;
  display: flex;
  justify-content: center;
  gap: 7px;
  z-index: 2;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  transition: 0.15s;
  &.on {
    background: #fff;
    width: 22px;
    border-radius: 5px;
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

/* RESPONSIVE */
@media (max-width: 920px) {
  .hero__wrap {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 10px 24px;
  }
  .hero__title {
    font-size: 30px;
  }
  .carousel {
    height: 260px;
  }
  .grid4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .news {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .carousel {
    height: 210px;
  }
  .grid4 {
    grid-template-columns: 1fr;
  }
}
</style>
