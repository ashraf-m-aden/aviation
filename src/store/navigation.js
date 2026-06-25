import navigationService from "../services/navigation.service";

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

export const state = () => ({
  navigation: [], // tout (admin)
  publicNavigation: [], // items activés, triés (header public)
});

export const getters = {
  getNavigation(state) {
    return state.navigation;
  },
  getPublicNavigation(state) {
    return state.publicNavigation;
  },
};

export const mutations = {
  SET_NAVIGATION(state, items) {
    state.navigation = items;
  },
  SET_PUBLIC_NAVIGATION(state, items) {
    state.publicNavigation = items;
  },
};

export const actions = {
  fetchNavigation({ commit }) {
    return navigationService.getNavigation().then((snap) => {
      const items = snap.docs.map((d) => d.data()).sort(byOrder);
      items.forEach((it) => {
        if (Array.isArray(it.children)) it.children.sort(byOrder);
      });
      commit("SET_NAVIGATION", items);
    });
  },

  fetchPublicNavigation({ commit }) {
    return navigationService.getPublicNavigation().then((snap) => {
      const items = snap.docs.map((d) => d.data()).sort(byOrder);
      items.forEach((it) => {
        if (Array.isArray(it.children)) {
          it.children = it.children
            .filter((c) => c.enabled !== false)
            .sort(byOrder);
        }
      });
      commit("SET_PUBLIC_NAVIGATION", items);
    });
  },

  createNavItem({ dispatch }, item) {
    return navigationService.addNavItem(item).then(() => dispatch("fetchNavigation"));
  },

  updateNavItem({ dispatch }, { id, data }) {
    return navigationService.updateNavItem(id, data).then(() => dispatch("fetchNavigation"));
  },

  removeNavItem({ dispatch }, id) {
    return navigationService.deleteNavItem(id).then(() => dispatch("fetchNavigation"));
  },

  toggleNavItem({ dispatch }, { id, value }) {
    return navigationService.setEnabled(id, value).then(() => dispatch("fetchNavigation"));
  },

  reorderNav({ dispatch }, items) {
    return navigationService.reorder(items).then(() => dispatch("fetchNavigation"));
  },
};

export default {
  actions,
  mutations,
  getters,
  state,
};
