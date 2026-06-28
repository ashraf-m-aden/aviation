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
    state.user = user || {};
    if (user && user.email) localStorage.setItem("email", user.email);
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

  // Résout une promesse une fois l'état d'authentification connu.
  // Ne fait AUCUNE navigation (c'est le rôle des gardes de route) :
  // l'ancien router.back() faisait sortir du site au rafraîchissement.
  getUser({ commit }) {
    return new Promise((resolve) => {
      const unsubscribe = authF.onAuthStateChanged(async (user) => {
        if (typeof unsubscribe === "function") unsubscribe();

        if (!user) {
          commit("SET_USER", {});
          commit("SET_ID", null);
          return resolve(null);
        }

        try {
          const response = await auth.getUser(user.uid);
          const data = response.data();
          if (!data) {
            // compte supprimé / introuvable
            await auth.logout();
            commit("SET_USER", {});
            commit("SET_ID", null);
            localStorage.clear();
            return resolve(null);
          }
          commit("SET_USER", data);
          commit("SET_ID", user.uid);
          return resolve(data);
        } catch (e) {
          commit("SET_USER", {});
          commit("SET_ID", null);
          return resolve(null);
        }
      });
    });
  },

  getStaffs({ commit }) {
    return auth.getAllUsers().then(async (querySnapshot) => {
      let documents = querySnapshot.docs.map((doc) => doc.data());
      documents.sort((a, b) => {
        if ((a.name || "") > (b.name || "")) return 1;
        if ((a.name || "") < (b.name || "")) return -1;
        return 0;
      });
      commit("SET_STAFF", documents);
    });
  },

  async logout({ commit, dispatch }) {
    await auth.logout();
    commit("SET_USER", {});
    commit("SET_ID", null);
    localStorage.clear();
    dispatch("warningNotif", "Utilisateur déconnecté");
  },

  patchUser({ commit }, payload) {
    return UserService.modifyStaff(payload).then((response) => {
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
