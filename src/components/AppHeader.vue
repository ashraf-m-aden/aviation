<template>
  <header class="app-header">
    <!-- Barre supérieure : burger (mobile) + logo + langue + espace agent -->
    <div class="topbar">
      <div class="topbar__inner">
        <!-- langue + espace agent (passe tout en haut sur mobile) -->
        <div class="topbar__util">
          <LanguageSwitcher />
          <router-link
            :to="isLoggedIn ? '/admin' : '/login'"
            class="topbar__login"
          >
            <font-awesome-icon :icon="['fas', 'user-secret']" />
            <span class="topbar__login-txt">{{ $t("common.staffArea") }}</span>
          </router-link>
        </div>

        <button
          class="burger"
          :aria-expanded="mobileOpen"
          aria-label="Menu"
          @click.stop="mobileOpen = !mobileOpen"
        >
          <span></span><span></span><span></span>
        </button>

        <router-link to="/" class="brand">
          <img src="@/assets/casa.png" alt="AAC" class="brand__logo" />
          <span class="brand__txt">
            <span class="brand__name">{{ $t("brand.name") }}</span>
            <span class="brand__country">{{ $t("brand.country") }}</span>
          </span>
        </router-link>
      </div>
    </div>

    <!-- Navigation principale (dynamique) -->
    <nav class="mainnav" :class="{ 'is-open': mobileOpen }">
      <ul class="mainnav__inner">
        <li
          v-for="(item, i) in navItems"
          :key="item._id || i"
          class="nav-item"
          :class="{ 'has-dropdown': item.type === 'dropdown' }"
          @mouseenter="hoverOpen(i)"
          @mouseleave="hoverClose"
        >
          <!-- Menu déroulant -->
          <template v-if="item.type === 'dropdown'">
            <button
              class="nav-link nav-link--toggle"
              :aria-expanded="activeDropdown === i"
              aria-haspopup="true"
              @click.stop="toggle(i)"
            >
              {{ localized(item.label) }}
              <span class="caret" :class="{ up: activeDropdown === i }">▾</span>
            </button>
            <ul v-show="activeDropdown === i" class="dropdown">
              <li v-for="(child, j) in item.children" :key="child._id || j">
                <a
                  v-if="isExternal(child)"
                  :href="child.url"
                  target="_blank"
                  rel="noopener"
                  class="dropdown__link"
                  >{{ localized(child.label) }}</a
                >
                <router-link
                  v-else
                  :to="resolveTo(child)"
                  class="dropdown__link"
                >
                  {{ localized(child.label) }}
                </router-link>
              </li>
            </ul>
          </template>

          <!-- Lien simple -->
          <template v-else>
            <a
              v-if="isExternal(item)"
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="nav-link"
              >{{ localized(item.label) }}</a
            >
            <router-link v-else :to="resolveTo(item)" class="nav-link">
              {{ localized(item.label) }}
            </router-link>
          </template>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default {
  name: "AppHeader",
  components: { LanguageSwitcher },
  data() {
    return { activeDropdown: null, mobileOpen: false };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    navItems() {
      return this.$store.getters.getPublicNavigation || [];
    },
    isLoggedIn() {
      const u = this.$store.state.user.user || {};
      return Boolean(u.id || u._id);
    },
  },
  watch: {
    $route() {
      this.activeDropdown = null;
      this.mobileOpen = false;
    },
  },
  methods: {
    localized(map) {
      if (!map) return "";
      if (typeof map === "string") return map;
      return map[this.locale] || map.fr || "";
    },
    isExternal(item) {
      return item.kind === "external";
    },
    resolveTo(item) {
      return "/" + (item.slug || "");
    },
    toggle(i) {
      this.activeDropdown = this.activeDropdown === i ? null : i;
    },
    hoverOpen(i) {
      if (window.matchMedia("(min-width: 921px)").matches) {
        const item = this.navItems[i];
        if (item && item.type === "dropdown") this.activeDropdown = i;
      }
    },
    hoverClose() {
      if (window.matchMedia("(min-width: 921px)").matches) {
        this.activeDropdown = null;
      }
    },
    onDocClick() {
      this.activeDropdown = null;
    },
  },
  created() {
    if (!this.navItems.length) this.$store.dispatch("fetchPublicNavigation");
  },
  mounted() {
    document.addEventListener("click", this.onDocClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onDocClick);
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;

.app-header {
  font-family: "Inter", system-ui, sans-serif;
}

/* Barre supérieure (logo + langue + agent) */
.topbar {
  background: #fff;
  border-bottom: 1px solid #dde6ec;
  &__inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 10px 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
  }
  &__util {
    order: 3;
    margin-inline-start: auto;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__login {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #5b6b78;
    font-weight: 600;
    font-size: 12.5px;
    text-decoration: none;
    &:hover {
      color: $navy;
    }
  }
}
.brand {
  order: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  &__logo {
    width: clamp(40px, 5vw, 300px);
    height: auto;
    object-fit: contain;
  }
  &__txt {
    display: flex;
    flex-direction: column;
  }
  &__name {
    font-family: "Spectral", Georgia, serif;
    font-size: 16px;
    font-weight: 700;
    color: $navy;
    line-height: 1.15;
  }
  &__country {
    font-size: 11.5px;
    color: #5b6b78;
  }
}

/* Burger (à gauche, visible en mobile) */
.burger {
  order: 1;
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  span {
    width: 24px;
    height: 2px;
    background: $navy;
    border-radius: 2px;
  }
}

/* Navigation principale */
.mainnav {
  background: $navy;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  &__inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    list-style: none;
    gap: 2px;
  }
}
.nav-item {
  position: relative;
}
.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #dce8f1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 14px 18px;
  text-decoration: none;
  transition: background 0.15s;
  &:hover {
    background: $navy-700;
    color: #fff;
  }
  &.router-link-active {
    color: #fff;
    background: $navy-700;
    box-shadow: inset 0 -3px 0 $sky;
  }
}
.caret {
  font-size: 10px;
  opacity: 0.7;
  transition: transform 0.15s;
  &.up {
    transform: rotate(180deg);
  }
}

/* Déroulant */
.dropdown {
  position: absolute;
  inset-inline-start: 0;
  top: 100%;
  min-width: 230px;
  background: #fff;
  border: 1px solid #dde6ec;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 12px 28px rgba(10, 43, 78, 0.12);
  list-style: none;
  padding: 6px;
  z-index: 50;
  &__link {
    display: block;
    padding: 10px 14px;
    border-radius: 7px;
    font-size: 13.5px;
    color: #16242f;
    text-decoration: none;
    &:hover {
      background: #e8f5fc;
      color: $navy;
    }
  }
}

@media (max-width: 920px) {
  .burger {
    display: flex;
    order: 2;
  }
  .brand {
    order: 3;
  }
  .brand__logo {
    width: clamp(40px, 5vw, 300px);
    height: auto;
    object-fit: contain;
  }
  .brand__name {
    font-size: 15px;
  }

  /* 1re ligne : uniquement langue + espace agent */
  .topbar__util {
    order: 1;
    flex-basis: 100%;
    margin-inline-start: 0;
    justify-content: flex-end;
    padding-bottom: 8px;
    border-bottom: 1px solid #eef1f4;
  }

  .mainnav__inner {
    flex-direction: column;
    gap: 0;
    display: none;
  }
  .mainnav.is-open .mainnav__inner {
    display: flex;
  }
  .nav-link {
    width: 100%;
    justify-content: space-between;
  }
  .dropdown {
    position: static;
    box-shadow: none;
    border: none;
    border-radius: 0;
    background: rgba(255, 255, 255, 0.06);
    padding-inline-start: 16px;
    &__link {
      color: #dce8f1;
      &:hover {
        background: $navy-700;
        color: #fff;
      }
    }
  }
}
</style>
