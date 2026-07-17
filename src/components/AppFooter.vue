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
            <strong>{{ $t("footer.authority") }}</strong
            ><br />
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
              <a href="mailto:civilaviation@intnet.dj"
                >civilaviation@intnet.dj</a
              >
            </li>
          </ul>
        </div>

        <!-- Colonne 4: Liens utiles & Espace Agent -->
        <div>
          <h6>{{ $t("footer.quickLinks") }}</h6>
          <ul class="links-list">
            <li>
              <a
                href="https://www.presidence.dj/"
                target="_blank"
                rel="noopener"
                >{{ $t("links.presidency") }}</a
              >
            </li>
            <li>
              <a
                href="https://primature.gouv.dj/"
                target="_blank"
                rel="noopener"
                >{{ $t("links.primature") }}</a
              >
            </li>
            <li>
              <a href="http://www.met.dj/" target="_blank" rel="noopener">{{
                $t("links.ministry")
              }}</a>
            </li>
            <li>
              <a href="#">{{ $t("links.airport") }}</a>
            </li>
            <li>
              <a
                href="https://www.air-djibouti.com/"
                target="_blank"
                rel="noopener"
                >{{ $t("links.airDjibouti") }}</a
              >
            </li>
            <li>
              <a
                href="https://www.lanation.dj/"
                target="_blank"
                rel="noopener"
                >{{ $t("links.laNation") }}</a
              >
            </li>
          </ul>

          <div class="auth-action" v-show="!isLoggedIn">
            <router-link to="/login" class="btn-agent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path
                  d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9c19.7-26.6 31.3-59.5 31.3-95.1c0-26.2-6.3-51-17.4-72.9C384.1 40.5 407.6 32 433 32c62.9 0 113.9 51.7 113.9 115.5c0 63.9-51 115.5-113.9 115.5z"
                />
              </svg>
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
$sky: #1b9dd9;
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
    width: clamp(40px, 5vw, 300px);
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
