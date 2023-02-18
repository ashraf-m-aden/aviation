import documentService from "../services/document.service";
import moment from "moment";

export const state = () => ({
  documents: [],
  publicDocuments: [],
});
export const getters = {
  getDocumments(state) {
    return state.documents;
  },
  getPublicDocumments(state) {
    return state.publicDocuments;
  },
};
export const mutations = {
  SET_DOCUMENTS(state, documents) {
    state.documents = documents;
  },
  SET_PUBLIC_DOCUMENTS(state, documents) {
    state.publicDocuments = documents;
  },
};
export const actions = {
  setDocuments({ commit }) {
    return documentService.getDocuments().then(async (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => doc.data());
      await documents.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      //    await documentService.saveToFirestore(documents.data);
      await documents.forEach((doc) => {
        doc.createdAt =
          typeof doc.createdAt == "string"
            ? doc.createdAt
            : doc.createdAt.toDate();
        doc.createdAt = moment(String(doc.createdAt)).format("DD/MM/YYYY");
      });
      await commit("SET_DOCUMENTS", documents);
    });
  },
  setPublicDocuments({ commit }) {
    return documentService.getPublic().then(async (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => doc.data());
      await documents.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      await documents.forEach((doc) => {
        doc.createdAt =
          typeof doc.createdAt == "string"
            ? doc.createdAt
            : doc.createdAt.toDate();
        doc.createdAt = moment(String(doc.createdAt)).format("DD/MM/YYYY");
      });
      await commit("SET_PUBLIC_DOCUMENTS", documents);
    });
  },
  addDocument({ dispatch }, document) {
    return documentService.postDocument(document).then(async () => {
      await dispatch("setDocuments");
      await dispatch("setPublicDocuments");
    });
  },
  deleteOneDocument({ dispatch }, id) {
    documentService.deleteDocument(id).then(async () => {
      await dispatch("setDocuments");
      await dispatch("setPublicDocuments");
    });
  },
  disableOneDocument({ dispatch }, id) {
    documentService.disableDocument(id).then(async () => {
      await dispatch("setDocuments");
      await dispatch("setPublicDocuments");
    });
  },
  enableOneDocument({ dispatch }, id) {
    documentService.enableDocument(id).then(async () => {
      await dispatch("setDocuments");
      await dispatch("setPublicDocuments");
    });
  },
};

export default {   

  actions,
  mutations,
  getters,
  state,
};
