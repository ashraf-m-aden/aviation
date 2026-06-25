<template>
  <div class="dashboard">
    <h2 class="dashboard__title">Tableau de bord</h2>
    <p class="dashboard__sub">Vue d'ensemble et accès rapides à la gestion du site.</p>

    <!-- Compteurs -->
    <div class="stats">
      <div class="stat">
        <div class="stat__n">{{ counts.documents }}</div>
        <div class="stat__l">Documents</div>
      </div>
      <div class="stat">
        <div class="stat__n">{{ counts.news }}</div>
        <div class="stat__l">Actualités</div>
      </div>
      <div class="stat">
        <div class="stat__n">{{ counts.banners }}</div>
        <div class="stat__l">Bannières</div>
      </div>
      <div class="stat">
        <div class="stat__n">{{ counts.nav }}</div>
        <div class="stat__l">Entrées de menu</div>
      </div>
    </div>

    <!-- Raccourcis -->
    <h3 class="dashboard__h3">Gérer</h3>
    <div class="cards">
      <router-link v-for="s in shortcuts" :key="s.to" :to="s.to" class="scard">
        <div class="scard__ic" v-html="s.icon"></div>
        <div>
          <b>{{ s.title }}</b>
          <span>{{ s.desc }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      shortcuts: [
        {
          to: "/admin/navigation",
          title: "Navigation",
          desc: "Menus, pages de contenu, liens",
          icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
        },
        {
          to: "/admin/documents",
          title: "Documents publics",
          desc: "Textes et publications en ligne",
          icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
        },
        {
          to: "/admin/documents-intern",
          title: "Documents internes",
          desc: "Documents réservés",
          icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        },
        {
          to: "/admin/media",
          title: "Médias & bannières",
          desc: "Carrousel et actualités",
          icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
        },
        {
          to: "/admin/staff",
          title: "Personnel",
          desc: "Comptes et équipe",
          icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        },
      ],
    };
  },
  computed: {
    counts() {
      const s = this.$store.state;
      return {
        documents: (s.documents && s.documents.documents ? s.documents.documents.length : 0),
        news: (s.media && s.media.allNews ? s.media.allNews.length : 0),
        banners: (s.media && s.media.banner ? s.media.banner.length : 0),
        nav: (this.$store.getters.getNavigation || []).length,
      };
    },
  },
  created() {
    // s'assure que les compteurs ont des données même en accès direct à /admin
    this.$store.dispatch("fetchNavigation");
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getNews");
    this.$store.dispatch("setDocuments");
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$sky: #1b9dd9;
$sky-soft: #e8f5fc;
$muted: #5b6b78;
$line: #dde6ec;

.dashboard {
  max-width: 1000px;
  &__title { font-size: 24px; color: $navy; font-family: "Spectral", Georgia, serif; }
  &__sub { color: $muted; font-size: 14px; margin-bottom: 24px; }
  &__h3 { font-size: 15px; color: $navy; margin: 28px 0 14px; }
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 20px 22px;
  &__n { font-size: 30px; font-weight: 700; color: $sky; line-height: 1; font-family: "Spectral", Georgia, serif; }
  &__l { font-size: 13px; color: $muted; margin-top: 8px; }
}
.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.scard {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 18px 20px;
  text-decoration: none;
  transition: 0.16s;
  &:hover { transform: translateY(-2px); border-color: #c4d6e2; box-shadow: 0 8px 20px rgba(10, 43, 78, 0.06); }
  &__ic {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: $sky-soft;
    color: $sky;
    display: grid;
    place-items: center;
    flex: none;
  }
  b { display: block; color: $navy; font-size: 15px; }
  span { font-size: 12.5px; color: $muted; }
}

@media (max-width: 860px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .cards { grid-template-columns: 1fr; }
}
</style>
