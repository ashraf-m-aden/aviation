<template>
  <div>
    <div class="row">
      <div class="col-12 social">
        <a class="social_language" @click="switchLang('french')">Francais</a>/
        <a class="social_language" @click="switchLang('eng')">English</a>
      </div>
    </div>
    <v-app-bar elevation="0" density="prominent">
      <v-navigation-drawer v-model="drawer">
        <v-list dense nav>
          <v-list-item v-for="{ item, index } in menu" :key="index" link>
            <v-list-item-title @click="sub[index] = !sub[index]">{{
              item?.menu
            }}</v-list-item-title>
            <v-navigation-drawer v-model="sub[index]">
              <v-list dense nav>
                <v-list-item v-for="{ sub, i } in item?.sub" :key="i" link>
                  <v-list-item-title
                    ><router-link :to="sub.router">{{
                      sub.title
                    }}</router-link></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <router-link to="/">
          <a class="navbar-brand img-fluid" href="#">
            <img src="../assets/casa.png" alt="logo" class="logo" />
          </a>
        </router-link>
      </v-container>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="row">
      <div class="col-12">
        <!-- Header French -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <!-- A propos de nous -->
            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >A propos de nous</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <li>
                  <router-link to="/Presentation"
                    ><a href="#" class="dropdown-item"
                      >Presentation
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Organisation"
                    ><a href="#" class="dropdown-item"
                      >Organisation
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Mot du directeur"
                    ><a href="#" class="dropdown-item"
                      >Mot du directeur
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Politique de Formation"
                    ><a href="#" class="dropdown-item"
                      >Politique de formation
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Politique de Supervision"
                    ><a href="#" class="dropdown-item"
                      >Politique de supervision
                    </a></router-link
                  >
                </li>
              </ul>
            </li>
            <!-- Publications -->

            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >Publications</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <!-- Level two dropdown-->
                <li class="dropdown-submenu">
                  <a
                    @click="goTo('5f53706c838ed6002be47d36', 'Legislations')"
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Legislations</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link to="/Legislations/Lois"
                        ><a href="#" class="dropdown-item">Lois</a></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo('5f53707658ac040039a1a6c0', 'Textes reglementaires')
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Texte reglementaires</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        to="/Textes reglementaires/Reglementation aeronautique de Djibouti"
                      >
                        <a tabindex="-1" href="#" class="dropdown-item"
                          >Réglementation aéronautique de Djibouti</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link to="/Textes reglementaires/Arretes">
                        <a tabindex="-1" href="#" class="dropdown-item"
                          >Arrêtés</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link to="/Textes reglementaires/Decrets"
                        ><a href="#" class="dropdown-item"
                          >Décrets</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <!-- End Level two -->
                <li>
                  <router-link to="/Directives"
                    ><a href="#" class="dropdown-item"
                      >Directives
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Circulaires"
                    ><a href="#" class="dropdown-item"
                      >Circulaires
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Decisions"
                    ><a href="#" class="dropdown-item"
                      >Decisions
                    </a></router-link
                  >
                </li>
              </ul>
            </li>

            <!-- Securité -->

            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >Securité</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <!-- Level two dropdown-->
                <li class="dropdown-submenu">
                  <a
                    @click="goTo('5f3aa3413c2c433e946dcca6', 'Navigabilité')"
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle link"
                    >Navigabilité</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f3aa6cb34512340cc2b8252' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f3aa6cb34512340cc2b8251' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f3aa6cb34512340cc2b824e' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f3aa6cb34512340cc2b824f' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f3aa6cb34512340cc2b8250' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo(
                        '5f3aa7e234512340cc2b8253',
                        'Exploitation technique des aéronefs'
                      )
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Exploitation technique des aéronefs</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f3aa8fe34512340cc2b825e' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f3aa8fe34512340cc2b825d' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f3aa8fe34512340cc2b825a' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f3aa8fe34512340cc2b825b' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f3aa8fe34512340cc2b825c' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo('5f3aa7f034512340cc2b8254', 'License du personel')
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >License du personels</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f3aa91c34512340cc2b8264' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f3aa91c34512340cc2b8263' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f3aa91c34512340cc2b8260' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f3aa91c34512340cc2b8261' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f3aa7f034512340cc2b8254' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <!-- End Level two -->
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo(
                        '5f3aa7fe34512340cc2b8255',
                        'Aérodrome et infrastructures aéroportuaires'
                      )
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Aérodromes et infrastructures aéroportuaires</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f3aa94334512340cc2b826a' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f3aa94334512340cc2b8269' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f3aa94334512340cc2b8266' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f3aa94334512340cc2b8267' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f3aa94334512340cc2b8268' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo(
                        '5f3aa80a34512340cc2b8256',
                        'Service de l\'information aéronautique et de la cartographie'
                      )
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Service de l'information aéronautique et de la
                    cartographie</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f3aa95b34512340cc2b8270' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f3aa95b34512340cc2b826f' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f3aa95b34512340cc2b826c' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f3aa95b34512340cc2b826d' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f3aa95b34512340cc2b826e' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo(
                        '5f535bbc1dc9dc44eceead5c',
                        'Communication, navigation et surveillance'
                      )
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Communication, navigation et surveillance</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f585d9eb1398d47641a5ecd' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f585d9eb1398d47641a5ecc' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f585dfdb1398d47641a5ece' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f585d9eb1398d47641a5eca' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f585d9eb1398d47641a5ecb' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo(
                        '5f535bcd1dc9dc44eceead5d',
                        'Gestion de l\'espace aérien'
                      )
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Gestion de l'espace aérien</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f58f66747a3152af4d2e319' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f58f66747a3152af4d2e318' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f58f66747a3152af4d2e315' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f58f66747a3152af4d2e316' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f58f66747a3152af4d2e317' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo('5f535bd91dc9dc44eceead5e', 'Service metéorologique')
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Service météorologique</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f58f77f47a3152af4d2e31e' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f58f77f47a3152af4d2e31d' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f58f77f47a3152af4d2e31a' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f58f77f47a3152af4d2e31b' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f58f77f47a3152af4d2e31c' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="
                      goTo(
                        '5f57966756cc341290c683d2',
                        'Recherches et sauvetages'
                      )
                    "
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Recherches et sauvetages</a
                  >
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f585a81b1398d47641a5ec8' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f585a81b1398d47641a5ec7' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f585a81b1398d47641a5ec4' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f585a81b1398d47641a5ec5' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f585a81b1398d47641a5ec6' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <!-- Sureté -->

            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >Sureté</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <!-- Level two dropdown-->
                <li class="dropdown-submenu">
                  <a
                    @click="goTo('5f535d6433d82b0034f95ee8', 'Sureté')"
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle link"
                    >Sureté
                  </a>
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f5b37ab638e43228cf0a56e' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f5b37ab638e43228cf0a56d' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f5b37ab638e43228cf0a56a' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f5b37ab638e43228cf0a56b' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f5b37ab638e43228cf0a56c' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a
                    @click="goTo('5f535d69c0161b0045e05444', 'Facilitation')"
                    id="dropdownMenu2"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    class="dropdown-item dropdown-toggle"
                    >Facilitation
                  </a>
                  <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                    <li>
                      <router-link
                        :to="{
                          name: 'Reglements',
                          params: { id: '5f5b409c638e43228cf0a573' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Reglements</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Procedures',
                          params: { id: '5f5b409c638e43228cf0a572' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Procedures</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Formulaires',
                          params: { id: '5f5b409c638e43228cf0a56f' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Formulaires</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Guides',
                          params: { id: '5f5b409c638e43228cf0a570' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Guides</a
                        ></router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{
                          name: 'Manuels',
                          params: { id: '5f5b409c638e43228cf0a571' },
                        }"
                        ><a href="#" class="dropdown-item"
                          >Manuels</a
                        ></router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <!-- Inspecton -->
            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >Inspection</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <li>
                  <router-link to="/Audit et Inspection"
                    ><a href="#" class="dropdown-item"
                      >Audit et Inspection
                    </a></router-link
                  >
                </li>
                <!-- End Level two -->
              </ul>
            </li>

            <!-- Juridiques -->
            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >Administration et Affaires juridiques</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Lois',
                      query: { id: '6035f30ea713263cf8a98c51' },
                    }"
                    ><a href="#" class="dropdown-item">Lois </a></router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Décrets',
                      query: { id: '6035f317a713263cf8a98c52' },
                    }"
                    ><a href="#" class="dropdown-item">Décrets </a></router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Arrêtés',
                      query: { id: '6035f32ca713263cf8a98c53' },
                    }"
                    ><a href="#" class="dropdown-item">Arrêtés </a></router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Règlements',
                      query: { id: '6035f337a713263cf8a98c54' },
                    }"
                    ><a href="#" class="dropdown-item"
                      >Règlements
                    </a></router-link
                  >
                </li>

                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Procédures',
                      query: { id: '6035f350a713263cf8a98c57' },
                    }"
                    ><a href="#" class="dropdown-item"
                      >Procédures
                    </a></router-link
                  >
                </li>

                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Directives',
                      query: { id: '6035f35da713263cf8a98c59' },
                    }"
                    ><a href="#" class="dropdown-item"
                      >Directives
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Circulaires',
                      query: { id: '6035f362a713263cf8a98c5a' },
                    }"
                    ><a href="#" class="dropdown-item"
                      >Circulaires
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{
                      path: '/Juridiques/Politiques',
                      query: { id: '6035f347a713263cf8a98c56' },
                    }"
                    ><a href="#" class="dropdown-item"
                      >Politiques
                    </a></router-link
                  >
                </li>

                <!-- End Level two -->
              </ul>
            </li>

            <!-- e-services -->
            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >e-Services</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <li>
                  <router-link to="/Formulaire de compte rendu"
                    ><a href="#" class="dropdown-item"
                      >Formulaire de compte rendu
                    </a></router-link
                  >
                </li>
                <li>
                  <router-link to="/Demande d'autorisation de vol"
                    ><a href="#" class="dropdown-item"
                      >Demande d'autorisation de vol
                    </a></router-link
                  >
                </li>
              </ul>
            </li>

            <!-- aip -->
            <li class="nav-item dropdown">
              <a
                id="dropdownMenu1"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                class="nav-link dropdown-toggle"
                >A.I.P.</a
              >
              <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
                <li>
                  <router-link
                    :to="{
                      path: '/aip',
                      query: { id: '61a3bf992a5e4d2a901c8f40' },
                    }"
                    ><a href="#" class="dropdown-item"
                      >Publications d'Information Aéronautique
                    </a></router-link
                  >
                </li>
              </ul>
            </li>

            <!-- gestion -->

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
            <li class="nav-item nav-link" v-show="user._id">
              <router-link
                to="/docIntern"
                class="nav-item text-primary font-weight-bolder"
                >Documents Internes</router-link
              >
            </li>
            <li class="nav-item nav-link" v-show="user._id">
              <button class="btn-group btn-outline-danger" @click="logout">
                Sign out
              </button>
            </li>
          </ul>
          <v-btn @click="drawer = !drawer">Menu</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../services/auth.service";
export default {
  data() {
    return {
      drawer: true,
      menu1: "Acceuil",
      menu2: "A propos de nous",
      menu3: "Publications",
      menu4: "Securité",
      menu5: "Sureté",
      menu8: "Administration et Affaires juridiques",
      menu6: "Inspection",
      menu7: "e-Services",
      menu9: "A.I.P.",
      sub: [false, false, false, false, false, false, false, false, false],
      menu: [
        {
          menu: "Acceuil",
        },
        {
          menu: "A propos de nous",
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
          menu: "Publications",
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
          menu: "Securité",

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
          menu: "Sureté",

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
          menu: "Inspection",

          sub: [
            {
              title: "Audit et Inspection",
              router: "/Audit et Inspection",
            },
          ],
        },
        {
          menu: "e-Services",
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
          menu: "Administration et Affaires juridiques",

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
          menu: "A.I.P.",
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
  methods: {
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

          if (this.$router.history.current.path !== "/") {
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

.dropdown-submenu {
  // tres important sinn le sous menu n'est pas adjacent au menu
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  // c'est ce qui met le sous menu a droite
  top: 0;
  left: 100%;
  margin-top: 0px;
  margin-left: 0px;
  border-radius: 0%;
}

.dropdown-submenu:hover > .dropdown-menu {
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

.dropdown-submenu > a:after {
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

.dropdown-submenu:hover > a:after {
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
</style>
