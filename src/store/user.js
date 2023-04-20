import UserService from "../services/auth.service";
import auth from "../services/auth.service";
import { auth as authF } from "../firebaseConfig";
import router from "@/router";
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
    localStorage.setItem("email", user.email);
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
  async getUser({ commit, dispatch }) {
    return authF.onAuthStateChanged(async (user) => {
      if (user) {
        if (router.currentRoute.value.fullPath == "/login") {
          router.back();
        }
        const response = await auth.getUser(user.uid);
        if (response.data() == undefined) {
          await auth.logout();
          commit("SET_USER", []);
          commit("SET_ID", null);
          localStorage.clear();
        }
        dispatch("successNotif", "Bienvenue, " + response.data().name);
        commit("SET_USER", response.data());
      } else {
        // No user is signed in.
        commit("SET_USER", {});
        localStorage.clear();
      }
    });
  },
  getStaffs({ commit }) {
    return auth.getAllUsers().then(async (querySnapshot) => {
      let documents = querySnapshot.docs.map((doc) => doc.data()); // on fait ca pack qu'on recupere plein de doc dans querysnapshot

      await documents.sort((a, b) => {
        if (a.pseudo > b.pseudo) {
          return 1;
        }
        if (a.pseudo < b.pseudo) {
          return -1;
        }
        return 0;
      });
      const staff = documents;
      commit("SET_STAFF", staff);
    });
  },
  async logout({ commit, dispatch }) {
    await auth.logout();
    commit("SET_USER", []);
    commit("SET_ID", null);
    localStorage.clear();
    dispatch("warningNotif", "Utilisateur déconnecté");
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
