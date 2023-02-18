<template>
  <div class="container-fluid">
    <div>
      <b-sidebar class="sidebar text-dark bg-dark" id="sidebar-1" title="Menu">
        <b-list-group>
          <b-list-group-item>
            <router-link to="/">{{ menu1 }}</router-link>
          </b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-2>{{
            menu2
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-3>{{
            menu3
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-4>{{
            menu4
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-5>{{
            menu5
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-8>{{
            menu8
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-6>{{
            menu6
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-7>{{
            menu7
          }}</b-list-group-item>
          <b-list-group-item v-b-toggle.sidebar-9>{{
            menu9
          }}</b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-info"
        id="sidebar-2"
        :title="menu2"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-dark">
          <b-list-group-item v-for="(item, index) in sub2" :key="index">
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-3"
        :title="menu3"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-b-toggle.sub-sidebar-3
            v-for="(item, index) in sub3"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>

      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-4"
        :title="menu4"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-for="(item, index) in sub4"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-5"
        :title="menu5"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-for="(item, index) in sub5"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-6"
        :title="menu6"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-for="(item, index) in sub6"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-7"
        :title="menu7"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-for="(item, index) in sub7"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-8"
        :title="menu8"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-for="(item, index) in sub8"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
      <b-sidebar
        class="sidebar text-dark bg-dark"
        id="sidebar-9"
        :title="menu8"
        shadow
        text-variant="dark"
      >
        <b-list-group class="bg-light">
          <b-list-group-item
            v-for="(item, index) in sub9"
            :key="index"
            href="#"
          >
            <router-link :to="item.router">{{ item.title }}</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-sidebar>
    </div>
    <div class="row">
      <div class="col-12 social">
        <a class="social_language" @click="switchLang('french')">Francais</a>/
        <a class="social_language" @click="switchLang('eng')">English</a>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <router-link to="/">
        <a class="navbar-brand img-fluid" href="#">
          <img src="../assets/casa.png" alt="logo" class="logo" />
        </a>
      </router-link>

      <b-navbar-toggle v-b-toggle.sidebar-1 target=""></b-navbar-toggle>

      <!-- Header French -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- About us -->
          <li class="nav-item dropdown">
            <a
              id="dropdownMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              >About us</a
            >
            <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
              <li>
                <router-link to="/Presentation"
                  ><a href="#" class="dropdown-item">About us </a></router-link
                >
              </li>
              <li>
                <router-link to="/Organization"
                  ><a href="#" class="dropdown-item"
                    >Organization
                  </a></router-link
                >
              </li>
              <li>
                <router-link to="/General director's commitment"
                  ><a href="#" class="dropdown-item"
                    >General director's commitment
                  </a></router-link
                >
              </li>
              <li>
                <router-link to="/Training policy"
                  ><a href="#" class="dropdown-item"
                    >Training policy
                  </a></router-link
                >
              </li>
              <li>
                <router-link to="/Oversight policy"
                  ><a href="#" class="dropdown-item"
                    >Oversight policy
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
                  @click="
                    goTo('5f53706c838ed6002be47d36', 'Textes legislatifs')
                  "
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
                      ><a href="#" class="dropdown-item">Laws</a></router-link
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
                  >Regulations</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      to="/Textes reglementaires/Djibouti aeronautical regulations"
                    >
                      <a tabindex="-1" href="#" class="dropdown-item"
                        >Djibouti aeronautical regulations</a
                      ></router-link
                    >
                  </li>
                  <li>
                    <router-link to="/Textes reglementaires/Arretes">
                      <a tabindex="-1" href="#" class="dropdown-item"
                        >Orders</a
                      ></router-link
                    >
                  </li>
                  <li>
                    <router-link to="/Textes reglementaires/Decrets"
                      ><a href="#" class="dropdown-item"
                        >Decrees</a
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
                <router-link to="/Circulars"
                  ><a href="#" class="dropdown-item">Circulars </a></router-link
                >
              </li>
              <li>
                <router-link to="/Decisions"
                  ><a href="#" class="dropdown-item">Decisions </a></router-link
                >
              </li>
            </ul>
          </li>

          <!-- Safety -->

          <li class="nav-item dropdown">
            <a
              id="dropdownMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              >Safety</a
            >
            <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
              <!-- Level two dropdown-->
              <li class="dropdown-submenu">
                <a
                  @click="goTo('5f3aa3413c2c433e946dcca6', 'Airworthiness')"
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle link"
                  >Airworthiness</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f3aa6cb34512340cc2b824e' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f3aa6cb34512340cc2b824f' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f3aa6cb34512340cc2b8250' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f3aa6cb34512340cc2b8252' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
                      ></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a
                  @click="
                    goTo('5f3aa7e234512340cc2b8253', 'Aircraft operations')
                  "
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle"
                  >Aircraft operations</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f3aa8fe34512340cc2b825a' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f3aa8fe34512340cc2b825b' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f3aa8fe34512340cc2b825c' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f3aa8fe34512340cc2b825e' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
                      ></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a
                  @click="
                    goTo('5f3aa7f034512340cc2b8254', 'Personnel licensing')
                  "
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle"
                  >Personnel licensing</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f3aa91c34512340cc2b8260' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f3aa91c34512340cc2b8261' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f3aa7f034512340cc2b8254' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f3aa91c34512340cc2b8264' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
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
                      'Aerdromes and ground aids'
                    )
                  "
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle"
                  >Aerdromes and ground aids</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f3aa94334512340cc2b8266' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f3aa94334512340cc2b8267' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f3aa94334512340cc2b8268' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f3aa94334512340cc2b826a' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
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
                  >Aeronautical Information Service and cartography</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f3aa95b34512340cc2b826c' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f3aa95b34512340cc2b826d' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f3aa95b34512340cc2b826e' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f3aa95b34512340cc2b8270' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
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
                      'Communication, navigation and surveillance'
                    )
                  "
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle"
                  >Communication, navigation and surveillance</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f585dfdb1398d47641a5ece' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f585d9eb1398d47641a5eca' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f585d9eb1398d47641a5ecb' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f585d9eb1398d47641a5ecd' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
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
                  >Air traffic management</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f58f66747a3152af4d2e315' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f58f66747a3152af4d2e316' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f58f66747a3152af4d2e317' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f58f66747a3152af4d2e319' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
                      ></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a
                  @click="
                    goTo('5f535bd91dc9dc44eceead5e', 'Meterogical service')
                  "
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle"
                  >Meteorological service</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f58f77f47a3152af4d2e31a' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f58f77f47a3152af4d2e31b' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f58f77f47a3152af4d2e31c' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f58f77f47a3152af4d2e31e' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
                      ></router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="dropdown-submenu">
                <a
                  @click="
                    goTo('5f57966756cc341290c683d2', 'Searche and rescue')
                  "
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle"
                  >Search and rescue</a
                >
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f585a81b1398d47641a5ec4' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f585a81b1398d47641a5ec5' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f585a81b1398d47641a5ec6' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f585a81b1398d47641a5ec8' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
                      ></router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <!-- Safety -->

          <li class="nav-item dropdown">
            <a
              id="dropdownMenu1"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              >Security</a
            >
            <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
              <!-- Level two dropdown-->
              <li class="dropdown-submenu">
                <a
                  @click="goTo('5f535d6433d82b0034f95ee8', 'Security')"
                  id="dropdownMenu2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="dropdown-item dropdown-toggle link"
                  >Security
                </a>
                <ul aria-labelledby="dropdownMenu2" class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{
                        name: 'Formulaires',
                        params: { id: '5f585a81b1398d47641a5ec4' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f585a81b1398d47641a5ec5' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f585a81b1398d47641a5ec6' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f585a81b1398d47641a5ec8' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
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
                        name: 'Formulaires',
                        params: { id: '5f5b409c638e43228cf0a56f' },
                      }"
                      ><a href="#" class="dropdown-item">Forms</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Guides',
                        params: { id: '5f5b409c638e43228cf0a570' },
                      }"
                      ><a href="#" class="dropdown-item">Guides</a></router-link
                    >
                  </li>
                  <li>
                    <router-link
                      :to="{
                        name: 'Manuels',
                        params: { id: '5f5b409c638e43228cf0a571' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Manuals</a
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
                        name: 'Reglements',
                        params: { id: '5f5b409c638e43228cf0a573' },
                      }"
                      ><a href="#" class="dropdown-item"
                        >Regulations</a
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
                    >Audit and Inspection
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
              >Administration and Legal Affairs</a
            >
            <ul aria-labelledby="dropdownMenu1" class="dropdown-menu">
              <li>
                <router-link
                  :to="{
                    path: '/Legal/laws',
                    query: { id: '6035f30ea713263cf8a98c51' },
                  }"
                  ><a href="#" class="dropdown-item">Laws </a></router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/Legal/Decrees',
                    query: { id: '6035f317a713263cf8a98c52' },
                  }"
                  ><a href="#" class="dropdown-item">Decrees </a></router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/Legal/orders',
                    query: { id: '6035f32ca713263cf8a98c53' },
                  }"
                  ><a href="#" class="dropdown-item">Orders </a></router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/Legal/regulations',
                    query: { id: '6035f337a713263cf8a98c54' },
                  }"
                  ><a href="#" class="dropdown-item"
                    >Regulations
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
                    path: '/Legal/directives',
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
                    path: '/Legal/circulars',
                    query: { id: '6035f362a713263cf8a98c5a' },
                  }"
                  ><a href="#" class="dropdown-item">Circulars </a></router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/Legal/policies',
                    query: { id: '6035f347a713263cf8a98c56' },
                  }"
                  ><a href="#" class="dropdown-item">Policies </a></router-link
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
                <router-link to="/Occurrence report"
                  ><a href="#" class="dropdown-item"
                    >Occurrence report
                  </a></router-link
                >
              </li>
              <li>
                <router-link to="/Flight permit request"
                  ><a href="#" class="dropdown-item"
                    >Flight permit request
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
      </div>
    </nav>
    <div class="row">
      <div class="socialBottom bg-success"></div>
    </div>
  </div>
</template>

<script>
import auth from "../services/auth.service";

export default {   

  data() {
    return {
      menu: "Menu",
      menu1: "Home",
      menu2: "About us",
      menu3: "Publications",
      menu4: "Safety",
      menu5: "Safety",
      menu6: "Inspection",
      menu7: "e-Services",
      menu8: "Administration and Legal affairs",
      menu9: "A.I.P.",

      sub2: [
        {
          title: "About us",
          router: "/About us",
        },
        {
          title: "General director's commitment",
          router: "/General director's commitment",
        },
        {
          title: "Organization",
          router: "/Organization",
        },
        {
          title: "Oversight policy",
          router: "/Oversight policy",
        },
        {
          title: "Training policy",
          router: "/Training policy",
        },
      ],
      sub3: [
        {
          title: "Legislations",
          router: "/Textes legislatifs?id=5f53706c838ed6002be47d36",
        },
        {
          title: "Regulations",
          router: "/Textes reglementaires?id=5f53707658ac040039a1a6c0",
        },
        {
          title: "Directives",
          router: "/Directives",
        },
        {
          title: "Circulars",
          router: "/Circulars",
        },
        {
          title: "Decisions",
          router: "/Decisions",
        },
      ],
      sub4: [
        {
          title: "Airworthiness",
          router: "/Airworthiness?id=5f3aa3413c2c433e946dcca6",
        },
        {
          title: "Aircraft operations",
          router: "/Aircraft operations?id=5f3aa7e234512340cc2b8253",
        },
        {
          title: "Personnel licensing",
          router: "/Personnel licensing?id=5f3aa7f034512340cc2b8254",
        },
        {
          title: "Aerdromes and ground aid",
          router: "/Aerdromes and ground aid?id=5f3aa7fe34512340cc2b8255",
        },
        {
          title: "Aeronautical information service and cartography",
          router:
            "/Aeronautical information service and cartography?id=5f3aa80a34512340cc2b8256",
        },
        {
          title: "Communication, navigation and surveillance",
          router:
            "/Communication, navigation and surveillance?id=5f535bbc1dc9dc44eceead5c",
        },
        {
          title: "Airspace management",
          router: "/Airspace management?id=5f535bcd1dc9dc44eceead5d",
        },
        {
          title: "Meteorogical service",
          router: "/Meterogical service?id=5f535bd91dc9dc44eceead5e",
        },
        {
          title: "Searche and rescue",
          router: "/Searche and rescue?id=5f57966756cc341290c683d2",
        },
      ],
      sub5: [
        {
          title: "Security",
          router: "/Safety?id=5f535d6433d82b0034f95ee8",
        },
        {
          title: "Facilitation",
          router: "/Facilitation?id=5f535d69c0161b0045e05444",
        },
      ],
      sub6: [
        {
          title: "Audit et Inspection",
          router: "/Audit et Inspection",
        },
      ],
      sub7: [
        {
          title: "Occurrence report",
          router: "/Occurrence report",
        },
        {
          title: "Flight permit request",
          router: "/Demande autorisation",
        },
      ],
      sub8: [
        {
          title: "Laws",
          router: "/Juridiques/Lois?id=6035f30ea713263cf8a98c51",
        },
        {
          title: "Decrees",
          router: "/Juridiques/Décrets?id=6035f317a713263cf8a98c52",
        },
        {
          title: "Orders",
          router: "/Juridiques/Arrêtés?id=6035f32ca713263cf8a98c53",
        },
        {
          title: "Regulations",
          router: "/Juridiques/Règlements?id=6035f337a713263cf8a98c54",
        },
        {
          title: "Procedures",
          router: "/Juridiques/Procédures?id=6035f350a713263cf8a98c57",
        },
        {
          title: "Directives",
          router: "/Juridiques/Directives?id=6035f35da713263cf8a98c59",
        },
        {
          title: "Circulars",
          router: "/Juridiques/Circulaires?id=6035f362a713263cf8a98c5a",
        },
        {
          title: "Policies",
          router: "/Juridiques/Politiques?id=6035f347a713263cf8a98c56",
        },
      ],
      sub9: [
        {
          title: "Aeronautical Informations Publications",
          router: "/aip?id=61a3bf992a5e4d2a901c8f40",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    loading() {
      if (localStorage.getItem("token")) {
        return false;
      } else {
        return true;
      }
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
    switchLang(lang) {
      this.$store.dispatch("setLang", lang);
    },
    goTo(id, name) {
      this.$router.push({ path: "/Categorie/" + name, query: { id } });
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
