import CategoryS from "../services/category.service";

export const state = () => ({
  category: [],
  subCategoryOne: [],
  subCategoryTwo: [],
  breadCrumb1: "",
  breadCrumb2: "",
  breadCrumb3: "",
});
export const getters = {
  getCategoryOne(state) {
    return state.subCategoryOne;
  },
  getCategoryTwo(state) {
    return state.subCategoryTwo;
  },
  getCategory(state) {
    return state.category;
  },
  getBreadCrumb(state) {
    return state.breadCrumb;
  },
};
export const mutations = {
  SET_Category(state, categoryMenu) {
    state.category = categoryMenu;
  },
  SET_SubCategoryOne(state, subCategoryOne) {
    state.subCategoryOne = subCategoryOne;
  },
  SET_SubCategoryTwo(state, subCategoryTwo) {
    state.subCategoryTwo = subCategoryTwo;
  },
  SET_B1(state, B1) {
    state.breadCrumb1 = B1;
  },
  SET_B2(state, B2) {
    state.breadCrumb2 = B2;
  },
  SET_B3(state, B3) {
    state.breadCrumb3 = B3;
  },
};
export const actions = {
  updateSubOne({ dispatch }, { id, data }) {
    return CategoryS.updateSubCategoryOne(id, data).then(() =>
      dispatch("fetchSubCategoryOne"),
    );
  },
  updateSubTwo({ dispatch }, { id, data }) {
    return CategoryS.updateSubCategoryTwo(id, data).then(() =>
      dispatch("fetchSubCategoryTwo"),
    );
  },
  fetchCategory({ commit }) {
    return CategoryS.getCategories().then(async (querySnapshot) => {
      const categoryMenu = querySnapshot.docs.map((doc) => doc.data());
      await commit("SET_Category", categoryMenu);
    });
  },
  fetchSubCategoryOne({ commit }) {
    return CategoryS.getSubCategoryOne().then(async (querySnapshot) => {
      const categoryMenu = querySnapshot.docs.map((doc) => doc.data());
      await commit("SET_SubCategoryOne", categoryMenu);
    });
  },
  fetchSubCategoryTwo({ commit }) {
    return CategoryS.getSubCategoryTwo().then(async (querySnapshot) => {
      const categoryMenu = querySnapshot.docs.map((doc) => doc.data());
      await commit("SET_SubCategoryTwo", categoryMenu);
    });
  },

  // --- AJOUTÉ : gestion des catégories ---
  createCategory({ dispatch }, category) {
    return CategoryS.addCategory(category).then(() =>
      dispatch("fetchCategory"),
    );
  },
  updateCategory({ dispatch }, { id, data }) {
    return CategoryS.updateCategory(id, data).then(() =>
      dispatch("fetchCategory"),
    );
  },
  removeCategory({ dispatch }, id) {
    return CategoryS.removeCategory(id).then(() => dispatch("fetchCategory"));
  },
  retrieveCategory({ dispatch }, id) {
    return CategoryS.retrieveCategory(id).then(() => dispatch("fetchCategory"));
  },
  eraseCategory({ dispatch }, id) {
    return CategoryS.eraseCategory(id).then(() => dispatch("fetchCategory"));
  },

  fetchB1({ commit }, B1) {
    commit("SET_B1", B1);
  },
  fetchB2({ commit }, B2) {
    commit("SET_B2", B2);
  },
  fetchB3({ commit }, B3) {
    commit("SET_B3", B3);
  },
};

export default {
  actions,
  mutations,
  getters,
  state,
};
