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
    // return db.collection("subcategories").where("enabled", "==", true).get();
    return db.collection("subcategories").get();
  },

  async addSubCategoryToCategory(sub) {
    const newSub = await db.collection("subcategories").add(sub);
    await db
      .collection("subcategories")
      .doc(newSub.id)
      .update("_id", newSub.id);
  },
  async removeSubCategoryToCategory(id) {
    await db.collection("subcategories").doc(id).update("enabled", false);
  },
  async retrieveSubCategoryToCategory(id) {
    await db.collection("subcategories").doc(id).update("enabled", true);
  },
  async eraseSubCategoryToCategory(id) {
    await db.collection("subcategories").doc(id).delete();
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
