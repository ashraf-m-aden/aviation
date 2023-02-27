<template>
  <div class="row">
    <div class="col-12">
      <v-app-bar color="blue" class="bar" app dark elevation="0">
        <img
          id="box"
          class="fly light"
          src="https://images.vexels.com/media/users/3/145795/isolated/preview/05cd33059a006bf49006097af4ccba98-plane-in-flight-by-vexels.png"
        />

        <template v-slot:prepend>
          <router-link to="/">
            <a class="navbar-brand img-fluid" href="#">
              <img src="../assets/casa.png" alt="logo" class="logo-menu" />
            </a>
          </router-link>
        </template>
        <v-spacer></v-spacer>
        <v-app-bar-title
          >Autorité de l'aviation civile de Djibouti</v-app-bar-title
        >
        <v-spacer></v-spacer>

        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list dense nav>
          <v-list-item
            v-for="(menu, index) in menuArray"
            :key="menu.title"
            link
          >
            <v-list-item-title v-if="index == 0">
              <router-link to="/">
                <a class="navbar-brand img-fluid" href="#">
                  <img src="../assets/casa.png" alt="logo" class="logo" />
                </a>
              </router-link>
            </v-list-item-title>
            <v-expansion-panels v-else>
              <v-expansion-panel
                :value="value"
                :title="menu.title"
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
              >
                <v-expansion-panel-text>
                  <v-list>
                    <v-list-item v-for="(subtitle, i) in menu.sub" :key="i">
                      <router-link :to="subtitle.router">{{
                        subtitle.title
                      }}</router-link>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list-item>
        </v-list>
        <v-spacer>
          <v-list dense nav>
            <v-list-item
              class="nav-item nav-link gestion"
              v-show="user.isAdmin"
            >
              <router-link
                to="/gestionMedia"
                class="nav-item text-primary font-weight-bolder"
                >Gestion Media</router-link
              >
            </v-list-item>
            <v-list-item class="nav-item nav-link" v-show="user.isAdmin">
              <router-link
                to="/gestionDocs"
                class="nav-item text-primary font-weight-bolder"
                >Gestion Documents</router-link
              >
            </v-list-item>
            <v-list-item class="nav-item nav-link" v-show="user.id">
              <router-link
                to="/docIntern"
                class="nav-item text-primary font-weight-bolder"
                >Documents Internes</router-link
              >
            </v-list-item>
            <v-list-item class="nav-item nav-link" v-show="user.id">
              <button class="btn-group btn-outline-danger" @click="logout">
                Sign out
              </button>
            </v-list-item>
          </v-list>
        </v-spacer>
      </v-navigation-drawer>
      <!-- <div class="row">
      <div class="col-12 social">
        <a class="social_language" @click="switchLang('french')">Francais</a>/
        <a class="social_language" @click="switchLang('eng')">English</a>
      </div>
    </div>

    <div class="row">
      <div class="socialBottom bg-success"></div>
    </div> -->
    </div>
  </div>
</template>

<script>
import auth from "../services/auth.service";
export default {
  data() {
    return {
      drawer: true,
      temporary: false,
      value: false,
      sub: [false, false, false, false, false, false, false, false, false],
      menuArray: [
        {
          title: "Acceuil",
          sub: [],
        },
        {
          title: "A propos de nous",
          sub: [
            {
              title: "Presentation",
              router: "/Presentation",
            },
            {
              title: "Mot du directeur",
              router: "/Mot du directeur",
            },
            {
              title: "Organisation",
              router: "/Organisation",
            },
            {
              title: "Politique de supervision",
              router: "/Politique de Supervision",
            },
            {
              title: "Politique de formation",
              router: "/Politique de Formation",
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
          title: "Inspection",
          sub: [
            {
              title: "Audit et Inspection",
              router: "/Audit et Inspection",
            },
          ],
        },
        {
          title: "e-Services",
          sub: [
            {
              title: "Formulaire de compte rendu",
              router: "/Formulaire de compte rendu",
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
.btn {
  width: 2rem;
  height: 2rem;
}
.logo {
  width: 10rem;
  &-menu {
    width: 5rem;
  }
}
.socialBottom {
  height: 0.5rem;
  width: 100%;
}
.social {
  background: rgb(48, 139, 224);
  color: white;
  text-align: right;

  &_language {
    &,
    &:link,
    &:visited,
    &:active {
      text-decoration: none;
      color: white !important;
    }
    &:hover {
      color: black !important;
    }
  }
  .contact {
    &_img {
      width: 2rem;
      color: white;
    }
    &_btn {
      width: 2rem;
      color: white;
    }
  }
}

.navbar {
  width: 100%;
}

.tabTitle {
  color: #005ba1;
}

#sidebar-2 {
  transition-duration: 1s;
}

.right {
  width: 400px;
}

.dropdown-subtitle {
  // tres important sinn le sous title n'est pas adjacent au title
  position: relative;
}

.dropdown-subtitle > .dropdown-title {
  // c'est ce qui met le sous title a droite
  top: 0;
  left: 100%;
  margin-top: 0px;
  margin-left: 0px;
  border-radius: 0%;
}

.dropdown-subtitle:hover > .dropdown-title {
  display: block; // c'st lui qui le truc hoverable
}

.nav-item > a:after {
  // c'est  pour la fleche du nav
  //    display: block;
  content: " ";
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  // border-style: solid;
  // border-width: 5px 0 5px 5px;
  // margin-top: 5px;
  // margin-right: -10px;
}

.dropdown-subtitle > a:after {
  // c'est tjr pour la fleche
  display: block;
  content: " ";
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  margin-top: 5px;
  margin-right: -10px;
}

.dropdown-subtitle:hover > a:after {
  // la fleche
  // border-left-color: red;
  display: none;
}

.dropdown-item {
  list-style: none;
  font-size: 1.6;
  color: black;
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

.sidebar {
  transition: all 2s;
}
@-webkit-keyframes fly {
  0% {
    top: 0%;
    left: 0%;
  }
  75% {
    top: 50%;
    left: 50%;
  }
  100% {
    top: 0%;
    left: 100%;
  }
}

@keyframes fly {
  0% {
    top: 0%;
    left: 0%;
  }
  75% {
    top: 50%;
    left: 50%;
  }
  100% {
    top: 0%;
    left: 100%;
  }
}

#box {
  width: 100px;
  height: 100px;
  position: absolute;
  -webkit-animation: fly 10s linear 10s infinite;
  -moz-animation: fly 10s linear 10s infinite;
  animation: fly 10s linear 10s infinite;
}
</style>
