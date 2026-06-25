<template>
  <footer class="foot">
    <div class="wrap">
      <div class="fgrid">

        <!-- Colonne 1: Identité de la marque -->
        <div>
          <div class="brand">
            <img src="@/assets/casa.png" alt="Logo AAC" class="logo" />
            <div class="txt">
              <h1>{{ $t("brand.full") }}</h1>
            </div>
          </div>
          <p class="about">{{ $t("footer.tagline") }}</p>
        </div>

        <!-- Colonne 2: Siège Social & Administration -->
        <div>
          <h6>{{ $t("footer.headOffice") }}</h6>
          <p class="office-details">
            <strong>{{ $t("footer.authority") }}</strong><br />
            {{ $t("footer.address") }}
          </p>
        </div>

        <!-- Colonne 3: Contacts Directs -->
        <div>
          <h6>Contact</h6>
          <ul class="contact-list">
            <li>
              <font-awesome-icon :icon="['fas', 'phone']" class="ic-width" />
              <span>+253 21 335100</span>
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'fax']" class="ic-width" />
              <span>+253 21 340169</span>
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'inbox']" class="ic-width" />
              <span>B.P. 2609</span>
            </li>
            <li>
              <font-awesome-icon :icon="['fas', 'envelope']" class="ic-width" />
              <a href="mailto:civilaviation@intnet.dj">civilaviation@intnet.dj</a>
            </li>
          </ul>
        </div>

        <!-- Colonne 4: Liens utiles & Espace Agent -->
        <div>
          <h6>{{ $t("footer.quickLinks") }}</h6>
          <ul class="links-list">
            <li><a href="https://www.presidence.dj/" target="_blank" rel="noopener">{{ $t("links.presidency") }}</a></li>
            <li><a href="https://primature.gouv.dj/" target="_blank" rel="noopener">{{ $t("links.primature") }}</a></li>
            <li><a href="http://www.met.dj/" target="_blank" rel="noopener">{{ $t("links.ministry") }}</a></li>
            <li><a href="#">{{ $t("links.airport") }}</a></li>
            <li><a href="https://www.air-djibouti.com/" target="_blank" rel="noopener">{{ $t("links.airDjibouti") }}</a></li>
            <li><a href="https://www.lanation.dj/" target="_blank" rel="noopener">{{ $t("links.laNation") }}</a></li>
          </ul>

          <div class="auth-action" v-show="!isLoggedIn">
            <router-link to="/login" class="btn-agent">
              <font-awesome-icon :icon="['fas', 'user']" />
              {{ $t("common.login") }}
            </router-link>
          </div>
        </div>

      </div>

      <!-- Barre de bas de page (Copyright & Mentions) -->
      <div class="fbar">
        <span>{{ $t("footer.copyright", { year: currentYear }) }}</span>
        <span class="legal">Mentions légales · Confidentialité</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    isLoggedIn() {
      const u = this.user || {};
      return Boolean(u.id || u._id);
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
// Variables locales basées sur le design mémorisé
$navy-dark: #06203b;
$sky: #1B9DD9;
$text-muted: #9fbdd2;
$text-light: #7fa6c2;
$serif: "Spectral", Georgia, serif;
$sans: "Inter", system-ui, sans-serif;

.foot {
  background: $navy-dark;
  color: $text-muted;
  padding: 48px 0 0;
  font-family: $sans;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  .wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
  }
}

/* Grille principale (Desktop) */
.fgrid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 36px;
  padding-bottom: 36px;
}

/* Identité Visuelle */
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;

  .logo {
    width: 54px;
    height: auto;
    object-fit: contain;
  }

  .txt h1 {
    font-family: $serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin: 0;
  }
}

.about {
  font-size: 13px;
  line-height: 1.7;
  color: $text-light;
  max-width: 34ch;
}

/* Éléments de blocs */
h6 {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.office-details {
  font-size: 13px;
  line-height: 1.6;
  color: $text-muted;
  strong {
    color: #fff;
  }
}

/* Listes de liens & contacts */
ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
    font-size: 13px;
    display: flex;
    align-items: flex-start;
    gap: 8px;

    a {
      color: $text-muted;
      transition: color 0.15s ease;
      text-decoration: none;

      &:hover {
        color: $sky;
      }
    }
  }
}

.ic-width {
  width: 16px;
  margin-top: 3px;
  color: $sky;
  flex-shrink: 0;
}

/* Bouton Espace Agent */
.auth-action {
  margin-top: 20px;
}

.btn-agent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: $sky;
    border-color: $sky;
  }
}

/* Barre basse de Copyright */
.fbar {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 0;
  font-size: 12.5px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: $text-light;

  .legal {
    opacity: 0.8;
  }
}

/* Gestion du responsive (Tablettes et Mobiles) */
@media (max-width: 920px) {
  .fgrid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 520px) {
  .fgrid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .fbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}

/* Support Internationalisation Arabe (RTL) */
:global(html[dir="rtl"]) {
  .foot {
    text-align: right;

    ul li {
      text-align: right;
    }

    .btn-agent {
      flex-direction: row-reverse;
    }
  }
}
</style>
