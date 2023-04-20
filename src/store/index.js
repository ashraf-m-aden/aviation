import documents from "./documents";
import category from "./categoryMenu";
import media from "./media";
import user from "./user";
import notif from "./notif";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      lang: "french",
    };
  },
  getters: {
    getLang(state) {
      return state.lang;
    },
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang;
    },
  },
  actions: {
    setLang({ commit }, lang) {
      commit("SET_LANG", lang);
    },
  },
  modules: {
    documents,
    category,
    media,
    user,
    notif,
  },
});
export default store;
