import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { MdCard, MdContent, MdTabs, MdButton, MdIcon, MdProgress } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faPhone,
  faMobile,
  faEnvelope,
  faFax, faInbox, faCalendar
} from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PortalVue from 'portal-vue'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import VueMeta from 'vue-meta'
import vuetify from './plugins/vuetify';
Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import style
import 'swiper/swiper.scss'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(PortalVue)

library.add(faUserSecret, faPhone,faCalendar, faMobile, faEnvelope, faFax, faInbox);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdProgress);
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

Vue.use(BootstrapVue);

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
