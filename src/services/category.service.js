import axios from "axios";
import { db } from "../firebaseConfig";
const category = axios.create({
  baseURL: process.env.VUE_APP_BACKEND

});
category.interceptors.request.use((config) => {
  config.headers.common.Authorization =
    "Bearer " + localStorage.getItem("token");
  return config;
});
export default {
  getCategories() {
    // return category.get("/allCategory");
    return db.collection("categories").get();
  },
  getSubCategoryOne() {
    // return category.get("/allSubCategoryOne");
    return db.collection("subcategories").get();
  },
  getSubCategoryTwo() {
    // return category.get("/allSubCategoryTwo");
    return db.collection("subcategorytwos").get();
  },
  getMenu(id) {
    return category.get("/menu/" + id);
  },
  getMenuS(id) {
    return category.get("/menuS/" + id);
  },

  ///////////////////////////////////////////////////////////////////////////////////
  async saveToFirestore(subcategorytwos) {
    subcategorytwos.forEach(async (categorie) => {
      await db.collection("subcategorytwos").doc(categorie._id).set(categorie);
    });
  }
};
