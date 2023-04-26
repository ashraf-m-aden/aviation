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
  async removeSubCategoryOne(id) {
    await db.collection("subcategories").doc(id).update("enabled", false);
  },
  async retrieveSubCategoryOne(id) {
    await db.collection("subcategories").doc(id).update("enabled", true);
  },
  async eraseSubCategoryOne(id) {
    await db.collection("subcategories").doc(id).delete();
  },

  /////////////////////////////////////////////////////////////////// SUB CATEGORIES 2
  getSubCategoryTwo() {
    // return category.get("/allSubCategoryTwo");
    return db.collection("subcategorytwos").get();
  },

  async addSubCategoryTwo(sub) {
    const newSub = await db.collection("subcategorytwos").add(sub);
    await db
      .collection("subcategorytwos")
      .doc(newSub.id)
      .update("_id", newSub.id);
  },
  async removeSubCategoryTwo(id) {
    await db.collection("subcategorytwos").doc(id).update("enabled", false);
  },
  async retrieveSubCategoryTwo(id) {
    await db.collection("subcategorytwos").doc(id).update("enabled", true);
  },
  async eraseSubCategoryTwo(id) {
    await db.collection("subcategorytwos").doc(id).delete();
  },
  ///////////////////////////////////////////////////////////////////////////////////
  async saveToFirestore(subcategorytwos) {
    subcategorytwos.forEach(async (categorie) => {
      await db.collection("subcategorytwos").doc(categorie._id).set(categorie);
    });
  },
};
