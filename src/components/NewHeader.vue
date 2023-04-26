<template>
  <div class="nav-wrapper pb-5">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/">
          <a class="navbar-brand img-fluid" href="#">
            <img src="../assets/casa.png" alt="logo" class="logo" />
          </a>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-justify"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              class="nav-item dropdown"
              v-for="menu in menuArray"
              :key="menu.title"
            >
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ menu.title }}
              </a>
              <ul
                class="dropdown-menu"
                v-for="(subtitle, i) in menu.sub"
                :key="i"
              >
                <li
                  v-for="(subtitle, i) in menu.sub"
                  :key="i"
                  class="dropdown-item"
                >
                  <router-link :to="subtitle.router">
                    <a href="#" class="dropdown-item">{{
                      subtitle.title
                    }}</a></router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-expand-lg logged">
      <div class="collapse navbar-collapse logged" id="navbarSupportedContent">
        <ul v-show="user.id" class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item nav-link gestion" v-show="user.isAdmin">
            <router-link
              to="/gestionMedia"
              class="nav-item text-primary font-weight-bolder"
              >Gestion Media</router-link
            >
          </li>
          <li class="nav-item nav-link" v-show="user.isAdmin">
            <router-link
              to="/gestionDocs"
              class="nav-item text-primary font-weight-bolder"
              >Gestion Documents</router-link
            >
          </li>
          <li class="nav-item nav-link" v-show="user.id">
            <router-link
              to="/docIntern"
              class="nav-item text-primary font-weight-bolder"
              >Documents Internes</router-link
            >
          </li>
          <li class="nav-item nav-link" v-show="user.id">
            <button class="btn-group btn btn-danger" @click="logout">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import auth from "../services/auth.service";
export default {
  data() {
    return {
      sub: [false, false, false, false, false, false, false, false],
      menuArray: [
        {
          title: "A propos de nous",
          sub: [
            {
              title: "Presentation",
              router: "/Presentation",
            },
            {
              title: "Mot du directeur",
              router: "/Mot-du-directeur",
            },
            {
              title: "Organisation",
              router: "/Organisation",
            },
            {
              title: "Politique de supervision",
              router: "/Politique-de-Supervision",
            },
            {
              title: "Politique de formation",
              router: "/Politique-de-Formation",
            },
          ],
        },
        {
          title: "Publications",
          sub: [
            {
              title: "Legislations",
              router: "/Categorie/Legislations?id=5f53706c838ed6002be47d36",
            },
            {
              title: "Textes reglementaires",
              router:
                "/Categorie/Textes reglementaires?id=5f53707658ac040039a1a6c0",
            },
            {
              title: "Directives",
              router: "/Directives",
            },
            {
              title: "Circulaires",
              router: "/Circulaires",
            },
            {
              title: "Decisions",
              router: "/Decisions",
            },
          ],
        },
        {
          title: "Securité",
          sub: [
            {
              title: "Navigabilité",
              router: "/Categorie/Navigabilité?id=5f3aa3413c2c433e946dcca6",
            },
            {
              title: "Exploitation technique des aeronefs",
              router:
                "/Categorie/Exploitation technique des aéronefs?id=5f3aa7e234512340cc2b8253",
            },
            {
              title: "License du personel",
              router:
                "/Categorie/License du personel?id=5f3aa7f034512340cc2b8254",
            },
            {
              title: "Aérodrome et infrastructures aéroportuaires",
              router:
                "/Categorie/Aérodrome et infrastructures aéroportuaires?id=5f3aa7fe34512340cc2b8255",
            },
            {
              title:
                "Service de l'information aéronautique et de la cartographie",
              router:
                "/Categorie/Service de l'information aéronautique et de la cartographie?id=5f3aa80a34512340cc2b8256",
            },
            {
              title: "Communication, navigation et surveillance",
              router:
                "/Categorie/Communication, navigation et surveillance?id=5f535bbc1dc9dc44eceead5c",
            },
            {
              title: "Gestion de l'espace aérien",
              router:
                "/Categorie/Gestion de l'espace aérien?id=5f535bcd1dc9dc44eceead5d",
            },
            {
              title: "Service metéorologique",
              router:
                "/Categorie/Service metéorologique?id=5f535bd91dc9dc44eceead5e",
            },
            {
              title: "Recherches et sauvetages",
              router:
                "/Categorie/Recherches et sauvetages?id=5f57966756cc341290c683d2",
            },
          ],
        },
        {
          title: "Sureté",
          sub: [
            {
              title: "Sureté",
              router: "/Categorie/Sureté?id=5f535d6433d82b0034f95ee8",
            },
            {
              title: "Facilitation",
              router: "/Categorie/Facilitation?id=5f535d69c0161b0045e05444",
            },
          ],
        },

        {
          title: "e-Services",
          sub: [
            {
              title: "Formulaire de compte rendu",
              router: "/Formulaire-de-compte-rendu",
            },
            {
              title: "Demande d'autorisation de vol",
              router: "/Demande autorisation",
            },
          ],
        },
        {
          title: "Administration et Affaires juridiques",

          sub: [
            {
              title: "Lois",
              router: "/Juridiques/Lois?id=6035f30ea713263cf8a98c51",
            },
            {
              title: "Décrets",
              router: "/Juridiques/Décrets?id=6035f317a713263cf8a98c52",
            },
            {
              title: "Arrêtés",
              router: "/Juridiques/Arrêtés?id=6035f32ca713263cf8a98c53",
            },
            {
              title: "Règlements",
              router: "/Juridiques/Règlements?id=6035f337a713263cf8a98c54",
            },
            {
              title: "Procédures",
              router: "/Juridiques/Procédures?id=6035f350a713263cf8a98c57",
            },
            {
              title: "Directives",
              router: "/Juridiques/Directives?id=6035f35da713263cf8a98c59",
            },
            {
              title: "Circulaires",
              router: "/Juridiques/Circulaires?id=6035f362a713263cf8a98c5a",
            },
            {
              title: "Politiques",
              router: "/Juridiques/Politiques?id=6035f347a713263cf8a98c56",
            },
          ],
        },
        {
          title: "A.I.P.",
          sub: [
            {
              title: "Publications d'Information Aéronautique",
              router: "/aip?id=61a3bf992a5e4d2a901c8f40",
            },
          ],
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  watch: {
    temporary(newTemporay) {
      if (newTemporay == false) {
        this.value == false;
      }
    },
  },
  methods: {
    test(index) {
      for (let i = 0; i < this.sub.length; i++) {
        if (index !== i) {
          this.sub[index] = false;
        } else {
          this.sub[index] = true;
        }
      }
      console.log(this.sub);
    },
    logout() {
      auth
        .logout()
        .then(() => {
          this.$store.dispatch("logout");

          if (this.$router.history.current.path !== "/") {
            this.$router.push("/");
          }
        })
        .catch(() => {
          this.$store.dispatch("logout");

          if (this.$router.currentRoute.value.fullPath !== "/") {
            this.$router.push("/");
          }
        });
    },
    goTo(id, name) {
      this.$router.push({ path: "/Categorie/" + name, query: { id } });
    },
    switchLang(lang) {
      this.$store.dispatch("setLang", lang);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.navbar {
  width: 100%;
  padding: 0;
}
.logged {
  width: 40%;
}
.nav-wrapper {
  border-bottom: solid 2px #1dd2dd;
  border-bottom-left-radius: 10%;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.logo {
  width: 10rem;
}
.dropdown {
  color: black;
  .dropdown-menu {
    border: solid 2px rgb(0, 212, 255);
  }
  &:last-child > .dropdown-menu {
    margin-left: -320px;
    @include respond(tablet-land) {
    }
  }
}
.nav-item {
  color: radial-gradient(
    circle,
    rgba(8, 0, 255, 0.5130427170868348) 40%,
    rgba(0, 241, 255, 0.4430147058823529) 89%
  );
  text-transform: uppercase;
}
.nav-item > a:after {
  // c'est  pour la fleche du nav
  //    display: block;
  content: "";
  width: 0;
  height: 0;
  border-color: transparent;
  color: radial-gradient(
    circle,
    rgba(8, 0, 255, 0.5130427170868348) 40%,
    rgba(0, 241, 255, 0.4430147058823529) 89%
  );
  // border-style: solid;
  // border-width: 5px 0 5px 5px;
  // margin-top: 5px;
  // margin-right: -10px;
}

.dropdown-item {
  list-style: none;
  font-size: 1.6;
  color: rgba(0, 241, 255, 0.4430147058823529);
  text-decoration: none;

  &:link,
  &:visited,
  &:active {
    color: black;
    text-decoration: none;
  }

  &:hover {
    text-transform: uppercase;
    color: black;
  }
}
</style>
