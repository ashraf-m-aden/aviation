import mediaService from "../services/media.service";
import moment from "moment";

export const state = () => ({
  banner: [],
  news: [], // les news mises en avant (dashboard / accueil)
  allNews: [], // toutes les news
});

export const getters = {
  getBanner(state) {
    return state.banner;
  },
  getNews(state) {
    return state.news;
  },
  getAllNews(state) {
    return state.allNews;
  },
};

export const mutations = {
  SET_BANNER(state, banner) {
    state.banner = banner;
  },
  SET_NEWS(state, news) {
    state.allNews = news;
    // BUG corrigé : on bornait en dur à 7, ce qui poussait des `undefined`
    // quand il y avait moins de 7 articles.
    state.news = news.slice(0, 7);
  },
  TOP_BANNER(state, index) {
    if (index !== 0) {
      const arr = [...state.banner];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      state.banner = arr;
    }
  },
  DOWN_BANNER(state, index) {
    if (index < state.banner.length - 1) {
      const arr = [...state.banner];
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      state.banner = arr;
    }
  },
  TOP_NEWS(state, index) {
    if (index !== 0) {
      const arr = [...state.allNews];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      state.allNews = arr;
    }
  },
  DOWN_NEWS(state, index) {
    if (index < state.allNews.length - 1) {
      const arr = [...state.allNews];
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      state.allNews = arr;
    }
  },
};

export const actions = {
  getBanners({ commit }) {
    return mediaService.getBanner().then(async (querySnapshot) => {
      const response = querySnapshot.docs.map((doc) => doc.data());
      response.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      await commit("SET_BANNER", response);
    });
  },
  getNews({ commit }) {
    return mediaService.getNews().then(async (querySnapshot) => {
      const response = querySnapshot.docs.map((doc) => doc.data());
      response.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      response.forEach((el) => {
        if (el.createdAt) {
          const d = typeof el.createdAt === "string" ? el.createdAt : el.createdAt.toDate();
          el.createdAt = moment(String(d)).format("DD/MM/YYYY");
        }
      });
      await commit("SET_NEWS", response);
    });
  },

  addBanner({ dispatch }, banner) {
    return mediaService.postbanner(banner).then(() => dispatch("getBanners"));
  },
  modifyBanner({ dispatch }, banner) {
    return mediaService.modifyBanner(banner).then(() => dispatch("getBanners"));
  },
  deleteOneBanner({ dispatch }, id) {
    return mediaService.deletebanner(id).then(() => dispatch("getBanners"));
  },

  addNews({ dispatch }, news) {
    return mediaService.postnews(news).then(() => dispatch("getNews"));
  },
  modifyNews({ dispatch }, news) {
    return mediaService.modifyNews(news).then(() => dispatch("getNews"));
  },
  deleteOneNews({ dispatch }, id) {
    return mediaService.deleteNews(id).then(() => dispatch("getNews"));
  },

  topBanner({ commit }, index) {
    commit("TOP_BANNER", index);
  },
  downBanner({ commit }, index) {
    commit("DOWN_BANNER", index);
  },
  topNews({ commit }, index) {
    commit("TOP_NEWS", index);
  },
  downNews({ commit }, index) {
    commit("DOWN_NEWS", index);
  },
  saveNewBanner({ state }) {
    return mediaService.saveNewBanner(state.banner);
  },
  saveNewNews({ state }) {
    return mediaService.saveNewNews(state.allNews);
  },
};

export default {
  getters,
  actions,
  mutations,
  state,
};
