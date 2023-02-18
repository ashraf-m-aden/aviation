import mediaService from "../services/media.service";
import moment from "moment";

export const state = () => ({
  banner: [],
  news: [], // les news que l'on presente sur le dashboard
  allNews: [], // tous ls news
});
export const getters = {
  getBanner(state) {
    return state.banner;
  },
  getNews(state) {
    return state.news;
  },
};
export const mutations = {
  SET_BANNER(state, banner) {
    state.banner = banner;
  },
  SET_NEWS(state, news) {
    state.allNews = news;
    var filter = [];
    for (let index = 0; index < 7; index++) {
      filter.push(news[index]);
    }
    state.news = filter;
  },
  TOP_BANNER(state, index) {
    if (index !== 0) {
      let temp = state.banner[index];
      state.banner[index] = state.banner[index - 1];
      state.banner[index - 1] = temp;
      let arr = state.banner;
      state.banner = [];
      state.banner = arr;
    }
  },
  DOWN_BANNER(state, index) {
    let length = state.banner.length;
    if (index < length - 1) {
      let temp = state.banner[index];
      state.banner[index] = state.banner[index + 1];
      state.banner[index + 1] = temp;
      let arr = state.banner;
      state.banner = [];
      state.banner = arr;
    }
  },
  TOP_NEWS(state, index) {
    if (index !== 0) {
      let temp = state.allNews[index];
      state.allNews[index] = state.allNews[index - 1];
      state.allNews[index - 1] = temp;
      let arr = state.allNews;
      state.allNews = [];
      state.allNews = arr;
    }
  },
  DOWN_NEWS(state, index) {
    let length = state.allNews.length;
    if (index < length - 1) {
      let temp = state.allNews[index];
      state.allNews[index] = state.allNews[index + 1];
      state.allNews[index + 1] = temp;
      let arr = state.allNews;
      state.allNews = [];
      state.allNews = arr;
    }
  },
};
export const actions = {
  getBanners({ commit }) {
    mediaService.getBanner().then(async (querySnapshot) => {
      const response = querySnapshot.docs.map((doc) => doc.data());
      await response.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      });
      // await mediaService.saveBannersToFirestore(response.data);
      await commit("SET_BANNER", response);
    });
  },
  getNews({ commit }) {
    mediaService.getNews().then(async (querySnapshot) => {
      const response = querySnapshot.docs.map((doc) => doc.data());

      await response.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      });
      // await mediaService.saveNewsToFirestore(response.data);

      await response.forEach((element) => {
        element.createdAt =
          typeof element.createdAt == "string"
            ? element.createdAt
            : element.createdAt.toDate();
        element.createdAt = moment(String(element.createdAt)).format(
          "DD/MM/YYYY"
        );
      });

      await commit("SET_NEWS", response);
    });
  },

  addBanner({ dispatch }, Banner) {
    return mediaService.postbanner(Banner).then(async () => {
      await dispatch("getBanners");
    });
  },
  deleteOneBanner({ dispatch }, id) {
    mediaService.deletebanner(id).then(async () => {
      await dispatch("getBanners");
    });
  },
  addNews({ dispatch }, news) {
    return mediaService.postnews(news).then(async () => {
      await dispatch("getNews");
    });
  },
  modifyNews({ dispatch }, news) {
    return mediaService.modifyNews(news).then(async () => {
      await dispatch("getNews");
    });
  },
  deleteOneNews({ dispatch }, id) {
    mediaService.deleteNews(id).then(async () => {
      await dispatch("getNews");
    });
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
    console.log("ok");
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
