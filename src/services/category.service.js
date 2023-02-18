import {db}  from "../firebaseConfig";
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

  ///////////////////////////////////////////////////////////////////////////////////
  async saveToFirestore(subcategorytwos) {
    subcategorytwos.forEach(async (categorie) => {
      await db.collection("subcategorytwos").doc(categorie._id).set(categorie);
    });
  },
};
