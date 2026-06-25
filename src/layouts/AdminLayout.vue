<template>
  <div class="admin-shell" :class="{ 'is-open': sidebarOpen }">
    <!-- Sidebar -->
    <aside class="aside">
      <div class="aside__brand">
        <img src="@/assets/casa.png" alt="AAC" class="aside__logo" />
        <b>AAC Admin</b>
      </div>

      <nav class="aside__nav">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="aside__link"
          :class="{ 'is-active': isActive(link.to, link.exact) }"
          @click="sidebarOpen = false"
        >
          <span class="aside__ic" v-html="link.icon"></span>
          <span>{{ link.label }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Zone principale -->
    <div class="admin-main">
      <header class="topbar">
        <button class="burger" type="button" aria-label="Menu" @click="sidebarOpen = !sidebarOpen">
          <span></span><span></span><span></span>
        </button>
        <h1 class="topbar__title">{{ currentTitle }}</h1>
        <span class="topbar__spacer"></span>
        <LanguageSwitcher />
        <router-link to="/" class="topbar__btn">{{ $t("common.backToSite") }}</router-link>
        <button class="topbar__btn topbar__btn--out" @click="logout">{{ $t("common.logout") }}</button>
      </header>

      <main class="admin-content">
        <router-view />
      </main>
    </div>

    <div class="aside__backdrop" @click="sidebarOpen = false"></div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const ICONS = {
  dash: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  nav: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  media: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
  staff: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
};

export default {
  name: "AdminLayout",
  components: { LanguageSwitcher },
  data() {
    return {
      sidebarOpen: false,
      links: [
        { to: "/admin", exact: true, label: "Tableau de bord", icon: ICONS.dash },
        { to: "/admin/navigation", label: "Navigation", icon: ICONS.nav },
        { to: "/admin/documents", label: "Documents publics", icon: ICONS.doc },
        { to: "/admin/documents-intern", label: "Documents internes", icon: ICONS.lock },
        { to: "/admin/media", label: "Médias & bannières", icon: ICONS.media },
        { to: "/admin/staff", label: "Personnel", icon: ICONS.staff },
      ],
    };
  },
  computed: {
    currentTitle() {
      const found = this.links.find((l) => this.isActive(l.to, l.exact));
      return found ? found.label : "Administration";
    },
  },
  methods: {
    isActive(path, exact) {
      const cur = this.$route.path;
      if (exact) return cur === path;
      // actif si exactement la page, ou un vrai sous-chemin (évite que
      // /admin/documents-intern active aussi /admin/documents)
      return cur === path || cur.startsWith(path + "/");
    },
    logout() {
      this.$store.dispatch("logout").finally(() => this.$router.push("/login"));
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$line: #dde6ec;

.admin-shell {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  background: #f4f7f9;
}

/* Sidebar */
.aside {
  background: $navy;
  color: #cfe0ee;
  padding: 20px 14px;
  &__brand {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 8px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 16px;
    b { color: #fff; font-size: 15px; font-family: "Spectral", Georgia, serif; }
  }
  &__logo { width: 36px; height: 36px; object-fit: contain; }
  &__nav { display: flex; flex-direction: column; gap: 3px; }
  &__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 13px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 500;
    color: #cfe0ee;
    text-decoration: none;
    transition: 0.13s;
    &:hover { background: $navy-700; color: #fff; }
    &.is-active { background: $sky; color: #fff; font-weight: 600; }
  }
  &__ic { display: inline-flex; }
  &__backdrop { display: none; }
}

/* Main */
.admin-main { display: flex; flex-direction: column; min-width: 0; }
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  background: $navy;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  &__title { font-size: 16px; font-weight: 600; font-family: "Spectral", Georgia, serif; }
  &__spacer { flex: 1; }
  &__btn {
    font: inherit;
    font-size: 12.5px;
    font-weight: 600;
    color: #cfe0ee;
    background: rgba(255, 255, 255, 0.08);
    border: none;
    padding: 7px 13px;
    border-radius: 7px;
    cursor: pointer;
    text-decoration: none;
    &:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
    &--out:hover { background: #e0322b; }
  }
}
.admin-content { padding: 26px; flex: 1; }

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  span { width: 20px; height: 2px; background: #fff; border-radius: 2px; }
}

@media (max-width: 860px) {
  .admin-shell { grid-template-columns: 1fr; }
  .aside {
    position: fixed;
    inset: 0 auto 0 0;
    width: 250px;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.2s;
  }
  .admin-shell.is-open .aside { transform: translateX(0); }
  .admin-shell.is-open .aside__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(6, 20, 35, 0.5);
    z-index: 150;
  }
  .burger { display: flex; }
}
</style>
