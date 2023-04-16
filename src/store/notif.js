export const state = () => ({
  message: null,
  success: false,
  notif: false,
});
export const getters = {
  getMessage(state) {
    return state.message;
  },
  getNotif(state) {
    return state.notif;
  },
  getSuccess(state) {
    return state.success;
  },
};
export const mutations = {
  SET_SUCCESS(state, is) {
    state.success = is;
  },
  SET_NOTIF(state, is) {
    state.notif = is;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  SET_STAFF(state, staff) {
    state.staff = staff;
  },
};
export const actions = {
  successNotif({ commit }, message) {
    commit("SET_MESSAGE", message);
    commit("SET_SUCCESS", true);
    commit("SET_NOTIF", true);
    setTimeout(() => {
      commit("SET_NOTIF", false);
    }, 3000);
  },
  warningNotif({ commit }, message) {
    commit("SET_MESSAGE", message);
    commit("SET_SUCCESS", false);
    commit("SET_NOTIF", true);
    setTimeout(() => {
      commit("SET_NOTIF", false);
    }, 3000);
  },
};
export default {
  getters,
  actions,
  mutations,
  state,
};
