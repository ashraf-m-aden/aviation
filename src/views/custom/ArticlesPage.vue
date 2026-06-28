<template>
  <div class="page">
    <header class="page-hero">
      <div class="page-hero__bg"></div>
      <div class="page-hero__overlay"></div>
      <div class="page-hero__inner">
        <span class="page-hero__eyebrow"
          >Autorité de l'Aviation Civile de Djibouti</span
        >
        <h1 class="page-hero__title">
          {{ selected ? selected.title : "Actualités" }}
        </h1>
      </div>
    </header>

    <!-- ============ DÉTAIL ============ -->
    <div v-if="selected" class="page-body detail">
      <article class="article">
        <button class="back" @click="closeArticle">‹ Tous les articles</button>

        <div class="article__media">
          <img
            :src="imageSrc(selected)"
            alt=""
            @error="onImgError($event, selected)"
          />
        </div>

        <div class="article__meta" v-if="selected.createdAt">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>{{ selected.createdAt }}</span>
        </div>

        <h2 class="article__title">{{ selected.title }}</h2>
        <div class="article__content" v-html="selected.content"></div>
      </article>

      <!-- Sidebar : autres articles -->
      <aside class="aside" v-if="others.length">
        <div class="aside__title">À lire aussi</div>
        <ul class="aside__list">
          <li v-for="a in others" :key="a._id">
            <button class="mini" @click="openArticle(a._id)">
              <span class="mini__thumb"
                ><img :src="imageSrc(a)" alt="" @error="onImgError($event, a)"
              /></span>
              <span class="mini__txt">
                <span class="mini__title">{{ a.title }}</span>
                <span class="mini__date" v-if="a.createdAt">{{
                  a.createdAt
                }}</span>
              </span>
            </button>
          </li>
        </ul>
      </aside>
    </div>

    <!-- ============ LISTE ============ -->
    <div v-else class="page-body">
      <p v-if="loading" class="state">Chargement des articles…</p>
      <p v-else-if="!articles.length" class="state">
        Aucun article pour le moment.
      </p>

      <template v-else>
        <div class="grid">
          <button
            v-for="a in paged"
            :key="a._id"
            class="card"
            @click="openArticle(a._id)"
          >
            <span class="card__thumb"
              ><img :src="imageSrc(a)" alt="" @error="onImgError($event, a)"
            /></span>
            <span class="card__body">
              <span class="card__date" v-if="a.createdAt">{{
                a.createdAt
              }}</span>
              <span class="card__title">{{ a.title }}</span>
              <span class="card__excerpt">{{ excerpt(a.content) }}</span>
              <span class="card__more">Lire l'article ›</span>
            </span>
          </button>
        </div>

        <div class="pager" v-if="totalPages > 1">
          <button class="pg" :disabled="page === 1" @click="go(page - 1)">
            ‹
          </button>
          <button
            v-for="p in visiblePages"
            :key="p"
            class="pg"
            :class="{ on: p === page }"
            @click="go(p)"
          >
            {{ p }}
          </button>
          <span class="pg-info">/ {{ totalPages }}</span>
          <button
            class="pg"
            :disabled="page === totalPages"
            @click="go(page + 1)"
          >
            ›
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { driveImageUrl, driveThumbUrl } from "@/utils/drive";

export default {
  name: "ArticlesPage",
  data() {
    return { page: 1, perPage: 6 };
  },
  computed: {
    articles() {
      const list = this.$store.state.media.allNews || [];
      return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },
    loading() {
      return !this.articles.length;
    },
    selectedId() {
      return this.$route.query.article || null;
    },
    selected() {
      if (!this.selectedId) return null;
      return this.articles.find((a) => a._id === this.selectedId) || null;
    },
    others() {
      if (!this.selected) return [];
      return this.articles
        .filter((a) => a._id !== this.selected._id)
        .slice(0, 6);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.articles.length / this.perPage));
    },
    paged() {
      const start = (this.page - 1) * this.perPage;
      return this.articles.slice(start, start + this.perPage);
    },
    visiblePages() {
      const span = 2;
      const start = Math.max(1, this.page - span);
      const end = Math.min(this.totalPages, this.page + span);
      const arr = [];
      for (let i = start; i <= end; i++) arr.push(i);
      return arr;
    },
  },
  methods: {
    imageSrc(a) {
      return a.driveId ? driveImageUrl(a.driveId, 800) : a.url || "";
    },
    onImgError(e, a) {
      if (a.driveId) {
        const fb = driveThumbUrl(a.driveId, 800);
        if (e.target.src !== fb) e.target.src = fb;
      }
    },
    excerpt(html) {
      const tmp = document.createElement("div");
      tmp.innerHTML = html || "";
      const text = (tmp.textContent || tmp.innerText || "")
        .replace(/\s+/g, " ")
        .trim();
      return text.length > 150 ? text.slice(0, 150) + "…" : text;
    },
    openArticle(id) {
      this.$router.push({ query: { ...this.$route.query, article: id } });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    closeArticle() {
      const q = { ...this.$route.query };
      delete q.article;
      this.$router.push({ query: q });
      window.scrollTo({ top: 0 });
    },
    go(p) {
      this.page = Math.min(Math.max(1, p), this.totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  watch: {
    selectedId() {
      window.scrollTo({ top: 0 });
    },
  },
  created() {
    if (!this.articles.length) this.$store.dispatch("getNews");
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
$ink: #2a3a47;

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
    background: url("../../assets/article.jpeg") center / cover no-repeat;
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
    max-width: 1120px;
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
.page-body {
  max-width: 1120px;
  margin: 0 auto;
  padding: 36px 24px 64px;
}
.state {
  color: $muted;
  font-size: 14px;
}

/* ---- Liste ---- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
}
.card {
  display: flex;
  flex-direction: column;
  text-align: start;
  background: #fff;
  border: 1px solid $line;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    transform 0.15s;
  &:hover {
    border-color: $sky;
    box-shadow: 0 14px 32px rgba(10, 43, 78, 0.1);
    transform: translateY(-2px);
    .card__more {
      color: $navy;
    }
  }
  &__thumb {
    display: block;
    height: 180px;
    background: linear-gradient(120deg, $navy, $sky);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    padding: 16px 18px 18px;
  }
  &__date {
    font-size: 11.5px;
    color: $sky;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 7px;
  }
  &__title {
    font-family: "Spectral", Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: $navy;
    line-height: 1.3;
    margin-bottom: 9px;
  }
  &__excerpt {
    font-size: 13.5px;
    color: $muted;
    line-height: 1.6;
    flex: 1;
  }
  &__more {
    margin-top: 14px;
    font-size: 13px;
    font-weight: 600;
    color: $sky;
  }
}

/* ---- Pagination ---- */
.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 34px;
}
.pg {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border: 1px solid $line;
  background: #fff;
  border-radius: 8px;
  font: inherit;
  font-size: 13px;
  color: $ink;
  cursor: pointer;
  &:hover:not(:disabled):not(.on) {
    border-color: #b9cde0;
    color: $navy;
  }
  &.on {
    background: $navy;
    color: #fff;
    border-color: $navy;
    font-weight: 700;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
}
.pg-info {
  font-size: 12.5px;
  color: $muted;
  margin: 0 4px;
}

/* ---- Détail ---- */
.detail {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 34px;
  align-items: start;
}
.back {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: $sky;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 16px;
  &:hover {
    text-decoration: underline;
  }
}
.article {
  min-width: 0;
  &__media {
    border-radius: 14px;
    overflow: hidden;
    background: linear-gradient(120deg, $navy, $sky);
    img {
      width: 100%;
      max-height: 420px;
      object-fit: cover;
      display: block;
    }
  }
  &__meta {
    display: flex;
    align-items: center;
    gap: 7px;
    color: $sky;
    font-size: 12.5px;
    font-weight: 600;
    margin: 18px 0 6px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
  &__title {
    font-family: "Spectral", Georgia, serif;
    font-size: 28px;
    font-weight: 800;
    color: $navy;
    line-height: 1.25;
    margin-bottom: 18px;
  }
  &__content {
    color: $ink;
    font-size: 15.5px;
    line-height: 1.8;
    :deep(p) {
      margin-bottom: 1.1em;
    }
    :deep(img) {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      margin: 12px 0;
    }
    :deep(h2),
    :deep(h3) {
      color: $navy;
      font-family: "Spectral", Georgia, serif;
      margin: 1.2em 0 0.5em;
    }
    :deep(ul),
    :deep(ol) {
      padding-inline-start: 22px;
      margin-bottom: 1.1em;
    }
    :deep(a) {
      color: $sky;
    }
  }
}

/* ---- Sidebar détail ---- */
.aside {
  background: #fff;
  border: 1px solid $line;
  border-radius: 14px;
  padding: 16px;
  position: sticky;
  top: 16px;
  &__title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $muted;
    margin-bottom: 12px;
  }
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
.mini {
  display: flex;
  gap: 11px;
  width: 100%;
  text-align: start;
  background: none;
  border: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  transition: background 0.12s;
  &:hover {
    background: #f4f7f9;
    .mini__title {
      color: $sky;
    }
  }
  &__thumb {
    flex: none;
    width: 64px;
    height: 56px;
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
  &__txt {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  &__title {
    font-size: 13px;
    font-weight: 600;
    color: $navy;
    line-height: 1.35;
  }
  &__date {
    font-size: 11px;
    color: $muted;
  }
}

@media (max-width: 860px) {
  .detail {
    grid-template-columns: 1fr;
  }
  .aside {
    position: static;
  }
}
@media (max-width: 560px) {
  .page-hero {
    min-height: 150px;
  }
  .page-hero__title {
    font-size: 23px;
  }
}
</style>
