import { db } from "../firebaseConfig";
export default {
  /////////////////////////////////////////////////////////////////// CATEGORIES
  getCategories() {
    // return category.get("/allCategory");
    return db.collection("categories").get();
  },

  ///////////////////////////////////////////////////////////////////  SUB CATEGORIES

  getSubCategoryOne() {
    // return category.get("/allSubCategoryOne");
    return db.collection("subcategories").get();
  },

  /////////////////////////////////////////////////////////////////// SUB CATEGORIES 2
  getSubCategoryTwo() {
    // return category.get("/allSubCategoryTwo");
    return db.collection("subcategorytwos").get();
  },

  ///////////////////////////////////////////////////////////////////////////////////
  async saveToFirestore(subcategorytwos) {
    subcategorytwos.forEach(async (categorie) => {
      await db.collection("subcategorytwos").doc(categorie._id).set(categorie);
    });
  },
};
