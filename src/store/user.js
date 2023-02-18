import UserService from "../services/auth.service";
import auth from "../services/auth.service";
import { auth as authF } from "../firebaseConfig";

export const state = () => ({
  id: null,
  token: null,
  staff: [],
  user: {},
});
export const getters = {
  getId(state) {
    return state.id;
  },
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  },
};
export const mutations = {
  SET_ID(state, id) {
    state.id = id;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_STAFF(state, staff) {
    state.staff = staff;
  },
};
export const actions = {
  login({ commit }, user) {
    commit("SET_USER", user);
    commit("SET_ID", user.uid);
  },
  async getUser({ commit }) {
    return authF.onAuthStateChanged(async (user) => {
      if (user) {
        const response = await auth.getUser(user.uid);
        // console.log(response.data());
        commit("SET_USER", response.data());
      } else {
        // No user is signed in.
        console.log("clear storage");
        commit("SET_USER", {});
        localStorage.clear();
      }
    });
  },
  getStaffs({ commit }) {
    return auth.getAllUsers().then(async (data) => {
      await data.data.sort((a, b) => {
        if (a.pseudo > b.pseudo) {
          return 1;
        }
        if (a.pseudo < b.pseudo) {
          return -1;
        }
        return 0;
      });
      const staff = data.data;
      commit("SET_STAFF", staff);
    });
  },
  logout({ commit }) {
    commit("SET_USER", []);
    commit("SET_ID", null);
    commit("SET_TOKEN", null);
    localStorage.clear();
  },

  patchUser({ commit }, payload) {
    return UserService.modifyUser(payload).then((response) => {
      commit("SET_USER", response.data);
    });
  },
};
export default {
  getters,
  actions,
  mutations,
  state,
};
