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

    <div class="page-body" :class="{ 'no-aside': siblings.length <= 1 }">
      <!-- Sidebar : sous-catégories 1 sœurs -->
      <aside class="aside" v-if="siblings.length > 1">
        <div class="aside__title">Dans la même rubrique</div>
        <ul class="aside__list">
          <li v-for="s in siblings" :key="s._id">
            <button
              class="aside__link"
              :class="{ on: s._id === oneId }"
              @click="selectOne(s._id)"
            >
              {{ catName(s) }}
            </button>
          </li>
        </ul>
      </aside>

      <!-- Contenu -->
      <div class="content">
        <!-- Fil d'Ariane -->
        <nav class="crumbs">
          <span v-if="category">{{ catName(category) }}</span>
          <template v-if="one">
            <span class="sep">›</span>
            <button v-if="twoId" class="crumb-link" @click="backToOne">
              {{ catName(one) }}
            </button>
            <span v-else>{{ catName(one) }}</span>
          </template>
          <template v-if="two">
            <span class="sep">›</span>
            <span>{{ catName(two) }}</span>
          </template>
        </nav>

        <p v-if="loading" class="state">Chargement…</p>

        <template v-else>
          <!-- Sous-rubriques (sous-catégories 2) -->
          <section v-if="showFolders" class="folders">
            <h2 class="section-title">Sous-rubriques</h2>
            <div class="folder-grid">
              <button
                v-for="f in childFolders"
                :key="f._id"
                class="folder"
                @click="openFolder(f._id)"
              >
                <span class="folder__ic"
                  ><svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z"
                    /></svg
                ></span>
                <span class="folder__txt">
                  <span class="folder__name">{{ catName(f) }}</span>
                  <span class="folder__count"
                    >{{ docsCount(f._id) }} document{{
                      docsCount(f._id) > 1 ? "s" : ""
                    }}</span
                  >
                </span>
                <span class="folder__arrow">›</span>
              </button>
            </div>
          </section>

          <!-- Documents (du niveau courant) -->
          <section
            v-if="twoId || documents.length || !showFolders"
            class="docs-section"
          >
            <h2 v-if="showFolders && documents.length" class="section-title">
              Documents
            </h2>

            <div class="search" v-if="documents.length">
              <svg
                class="search__ic"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                class="search__input"
                type="text"
                v-model="query"
                placeholder="Rechercher un document…"
              />
              <button
                v-if="query"
                class="search__clear"
                @click="query = ''"
                aria-label="Effacer"
              >
                ✕
              </button>
            </div>

            <p v-if="!filtered.length && query" class="state">
              Aucun résultat pour « {{ query }} ».
            </p>
            <p v-else-if="!documents.length && !showFolders" class="state">
              Aucun document disponible pour le moment.
            </p>

            <template v-else-if="filtered.length">
              <ul class="docs">
                <li v-for="doc in paged" :key="doc._id" class="doc">
                  <span
                    class="doc__ic"
                    :class="'doc__ic--' + fileMeta(doc).cls"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 1.5L18.5 8H14V3.5Z"
                      />
                    </svg>
                  </span>
                  <div class="doc__info">
                    <span class="doc__name">{{ doc.name }}</span>
                    <span class="doc__ext">{{
                      ext(doc).toUpperCase() || "FICHIER"
                    }}</span>
                  </div>
                  <a
                    class="doc__btn"
                    :href="fileLink(doc)"
                    target="_blank"
                    rel="noopener"
                    >Consulter</a
                  >
                </li>
              </ul>

              <div class="footer">
                <span class="count"
                  >{{ filtered.length }} document{{
                    filtered.length > 1 ? "s" : ""
                  }}</span
                >
                <div class="pager" v-if="totalPages > 1">
                  <button
                    class="pg"
                    :disabled="page === 1"
                    @click="go(page - 1)"
                  >
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
              </div>
            </template>
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { driveFileUrl } from "@/utils/drive";
import { localizedName } from "@/utils/i18n-name";
import { driveImageUrl } from "@/utils/drive";
import fallbackHero from "@/assets/article.jpeg";
export default {
  name: "DocumentListPage",
  props: {
    // _id de la cible (sous-catégorie 1 OU sous-catégorie 2) passée par le résolveur
    categoryId: { type: String, default: "" },
    title: { type: [Object, String], default: () => ({}) },
  },
  data() {
    return { oneId: "", twoId: null, query: "", page: 1, perPage: 10 };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    allSubOne() {
      return this.$store.state.category.subCategoryOne || [];
    },
    allSubTwo() {
      return this.$store.state.category.subCategoryTwo || [];
    },
    allCats() {
      return this.$store.state.category.category || [];
    },
    allPublic() {
      return this.$store.getters.getPublicDocumments || [];
    },
    loading() {
      return !this.allSubOne.length && !this.allPublic.length;
    },
    one() {
      return this.allSubOne.find((s) => s._id === this.oneId) || null;
    },
    two() {
      return this.twoId
        ? this.allSubTwo.find((s) => s._id === this.twoId) || null
        : null;
    },
    category() {
      return this.one
        ? this.allCats.find((c) => c._id === this.one.idParent) || null
        : null;
    },
    siblings() {
      if (!this.one) return [];
      return this.allSubOne
        .filter((s) => s.idParent === this.one.idParent && s.enabled !== false)
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    },
    childFolders() {
      if (!this.oneId) return [];
      return this.allSubTwo
        .filter((s) => s.idParent === this.oneId && s.enabled !== false)
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    },
    showFolders() {
      return !this.twoId && this.childFolders.length > 0;
    },
    activeParent() {
      return this.twoId || this.oneId;
    },
    documents() {
      return this.allPublic.filter(
        (d) => !d.isIntern && d.idParent === this.activeParent,
      );
    },
    filtered() {
      const q = this.query.toLowerCase().trim();
      if (!q) return this.documents;
      return this.documents.filter((d) =>
        (d.name || "").toLowerCase().includes(q),
      );
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filtered.length / this.perPage));
    },
    paged() {
      const start = (this.page - 1) * this.perPage;
      return this.filtered.slice(start, start + this.perPage);
    },
    visiblePages() {
      const span = 2;
      const start = Math.max(1, this.page - span);
      const end = Math.min(this.totalPages, this.page + span);
      const arr = [];
      for (let i = start; i <= end; i++) arr.push(i);
      return arr;
    },
    parentLabel() {
      if (this.two) return this.one ? this.catName(this.one) : "Documents";
      return this.category ? this.catName(this.category) : "Documents";
    },
    heroTitle() {
      if (this.two) return this.catName(this.two);
      if (this.one) return this.catName(this.one);
      return this.localized(this.title);
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
  watch: {
    categoryId() {
      this.setup();
    },
    query() {
      this.page = 1;
    },
  },
  methods: {
    localized(map) {
      if (!map) return "";
      if (typeof map === "string") return map;
      return map[this.locale] || map.fr || "";
    },
    // nom localisé d'une catégorie / sous-catégorie (repli fr)
    catName(item) {
      return localizedName(item, this.locale);
    },
    // détermine oneId / twoId à partir de la cible (qui peut être niveau 1 ou 2)
    setup() {
      const id = this.categoryId;
      const asTwo = this.allSubTwo.find((s) => s._id === id);
      if (asTwo) {
        this.oneId = asTwo.idParent;
        this.twoId = asTwo._id;
      } else {
        this.oneId = id;
        this.twoId = null;
      }
      this.query = "";
      this.page = 1;
    },
    selectOne(id) {
      this.oneId = id;
      this.twoId = null;
      this.query = "";
      this.page = 1;
    },
    openFolder(id) {
      this.twoId = id;
      this.query = "";
      this.page = 1;
    },
    backToOne() {
      this.twoId = null;
      this.query = "";
      this.page = 1;
    },
    docsCount(parentId) {
      return this.allPublic.filter(
        (d) => !d.isIntern && d.idParent === parentId,
      ).length;
    },
    go(p) {
      this.page = Math.min(Math.max(1, p), this.totalPages);
    },
    ext(doc) {
      let m = (doc.name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
      let e = m ? m[1] : "";
      if (!e && doc.src) {
        m = doc.src.toLowerCase().match(/\.([a-z0-9]+)(\?|$)/);
        e = m ? m[1] : "";
      }
      return e;
    },
    fileMeta(doc) {
      const e = this.ext(doc);
      if (e === "pdf") return { cls: "pdf" };
      if (["doc", "docx"].includes(e)) return { cls: "word" };
      if (["xls", "xlsx", "csv"].includes(e)) return { cls: "excel" };
      if (["ppt", "pptx"].includes(e)) return { cls: "ppt" };
      if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(e))
        return { cls: "img" };
      if (["zip", "rar", "7z"].includes(e)) return { cls: "zip" };
      return { cls: "generic" };
    },
    fileLink(doc) {
      if (doc.driveId) return driveFileUrl(doc.driveId);
      return doc.src || doc.url || "#";
    },
  },
  created() {
    const jobs = [];
    if (!this.allPublic.length)
      jobs.push(this.$store.dispatch("setPublicDocuments"));
    if (!this.allSubOne.length)
      jobs.push(this.$store.dispatch("fetchSubCategoryOne"));
    if (!this.allSubTwo.length)
      jobs.push(this.$store.dispatch("fetchSubCategoryTwo"));
    if (!this.allCats.length) jobs.push(this.$store.dispatch("fetchCategory"));
    this.setup();
    if (jobs.length) Promise.all(jobs).then(() => this.setup());
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
$red: #e0322b;

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
  padding: 24px 24px 64px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 28px;
  align-items: start;
  &.no-aside {
    grid-template-columns: 1fr;
    max-width: 920px;
  }
}

.aside {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 14px;
  position: sticky;
  top: 16px;
  &__title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $muted;
    padding: 4px 8px 10px;
  }
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  &__link {
    width: 100%;
    text-align: start;
    font: inherit;
    font-size: 13.5px;
    color: #2a3a47;
    background: none;
    border: none;
    border-radius: 8px;
    padding: 10px 12px;
    cursor: pointer;
    border-inline-start: 3px solid transparent;
    transition:
      background 0.12s,
      color 0.12s;
    &:hover {
      background: #f4f7f9;
      color: $navy;
    }
    &.on {
      background: $sky-soft;
      color: $navy;
      font-weight: 700;
      border-inline-start-color: $sky;
    }
  }
}
.search__ic {
  position: absolute;
  inset-inline-start: 15px;
  width: 18px;
  height: 18px;
  flex: none; // empêche l'étirement si le parent est en flex/grid
  color: $muted;
}
.crumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  font-size: 12.5px;
  color: $muted;
  margin-bottom: 18px;
  .sep {
    color: #aebcc6;
  }
  .crumb-link {
    font: inherit;
    font-size: 12.5px;
    color: $sky;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    &:hover {
      text-decoration: underline;
    }
  }
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $muted;
  margin: 0 0 12px;
}
.folders {
  margin-bottom: 30px;
}
.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}
.folder {
  display: flex;
  align-items: center;
  gap: 13px;
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  text-align: start;
  transition:
    border-color 0.12s,
    box-shadow 0.12s,
    transform 0.12s;
  &:hover {
    border-color: $sky;
    box-shadow: 0 8px 22px rgba(10, 43, 78, 0.08);
    transform: translateY(-1px);
  }
  &__ic {
    flex: none;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: $sky-soft;
    color: $sky;
    display: grid;
    place-items: center;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  &__txt {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  &__name {
    font-weight: 700;
    color: $navy;
    font-size: 14px;
  }
  &__count {
    font-size: 12px;
    color: $muted;
  }
  &__arrow {
    margin-inline-start: auto;
    color: #aebcc6;
    font-size: 18px;
  }
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  &__ic {
    position: absolute;
    inset-inline-start: 15px;
    color: $muted;
    font-size: 14px;
  }
  &__input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    border: 1px solid $line;
    border-radius: 30px;
    font: inherit;
    font-size: 14px;
    outline: none;
    transition:
      border-color 0.15s,
      box-shadow 0.15s;
    &:focus {
      border-color: $sky;
      box-shadow: 0 0 0 3px rgba(27, 157, 217, 0.12);
    }
  }
  &__clear {
    position: absolute;
    inset-inline-end: 14px;
    border: none;
    background: none;
    color: $muted;
    cursor: pointer;
    font-size: 13px;
    &:hover {
      color: $red;
    }
  }
}
.state {
  color: $muted;
  font-size: 14px;
  padding: 8px 2px;
}

.docs {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid $line;
  border-radius: 12px;
  overflow: hidden;
}
.doc {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 18px;
  border-bottom: 1px solid $line;
  transition: background 0.12s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #fafcfd;
  }
  &__ic {
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: #eef3f6;
    color: $muted;
    svg {
      width: 18px;
      height: 18px;
    }
    &--pdf {
      background: rgba(224, 50, 43, 0.1);
      color: $red;
    }
    &--word {
      background: rgba(27, 90, 161, 0.1);
      color: #1b5aa1;
    }
    &--excel {
      background: rgba(33, 115, 70, 0.12);
      color: #217346;
    }
    &--ppt {
      background: rgba(210, 71, 38, 0.12);
      color: #d24726;
    }
    &--img {
      background: rgba(27, 157, 217, 0.12);
      color: $sky;
    }
    &--zip {
      background: rgba(91, 107, 120, 0.12);
      color: $muted;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  &__name {
    font-weight: 600;
    color: $navy;
    font-size: 14.5px;
  }
  &__ext {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: $muted;
  }
  &__btn {
    margin-inline-start: auto;
    flex: none;
    font-size: 13px;
    font-weight: 600;
    color: $sky;
    border: 1px solid $line;
    padding: 7px 15px;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.12s;
    &:hover {
      background: $sky;
      color: #fff;
      border-color: $sky;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
  flex-wrap: wrap;
}
.count {
  color: $muted;
  font-size: 12.5px;
}
.pager {
  display: flex;
  align-items: center;
  gap: 5px;
}
.pg {
  min-width: 34px;
  height: 34px;
  padding: 0 9px;
  border: 1px solid $line;
  background: #fff;
  border-radius: 8px;
  font: inherit;
  font-size: 13px;
  color: #2a3a47;
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

@media (max-width: 820px) {
  .page-body {
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
  .doc {
    flex-wrap: wrap;
  }
  .doc__btn {
    margin-inline-start: 52px;
  }
}
</style>
