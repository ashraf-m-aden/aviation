/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
// Plugins
import { registerPlugins } from "@/plugins";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
const app = createApp(App);

registerPlugins(app);
app.component("QuillEditor", QuillEditor);
/////////////////////////////////

// import "./registerServiceWorker.js";
import store from "./store/index";
import Vue3Material from "vue3-material";
import router from "./router/index";

app.use(store);
app.use(router);
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faPhone,
  faMobile,
  faEnvelope,
  faFax,
  faInbox,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import Meta from "vue-meta";

// app.use(Meta, {
//   keyName: "metaInfo",
//   attribute: "data-vue-meta",
//   ssrAttribute: "data-vue-meta-server-rendered",
//   tagIDKeyName: "vmid",
//   refreshOnceOnNavigation: true,
// });

import Vue2Editor from "vue2-editor";
app.use(Vue2Editor);
app.use(Vue3Material);
library.add(
  faUserSecret,
  faPhone,
  faCalendar,
  faMobile,
  faEnvelope,
  faFax,
  faInbox
);
import "./firebaseConfig";
app.component("font-awesome-icon", FontAwesomeIcon);
// app.use(MdCard);
// app.use(MdContent);
// app.use(MdTabs);
// app.use(MdButton);
// app.use(MdIcon);
// app.use(MdProgress);

app.mount("#app");
