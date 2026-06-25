import { db } from "../firebaseConfig";
export default {
  /////////////////////////////////////////////////////////////////// CATEGORIES
  getCategories() {
    return db.collection("categories").get();
  },

  // --- AJOUTÉ : création / modification / suppression de catégories ---
  async addCategory(category) {
    const ref = await db.collection("categories").add(category);
    await db.collection("categories").doc(ref.id).update("_id", ref.id);
    return ref.id;
  },
  updateCategory(id, data) {
    return db.collection("categories").doc(id).update(data);
  },
  removeCategory(id) {
    // masquage (soft delete)
    return db.collection("categories").doc(id).update("enabled", false);
  },
  retrieveCategory(id) {
    return db.collection("categories").doc(id).update("enabled", true);
  },
  eraseCategory(id) {
    // suppression définitive
    return db.collection("categories").doc(id).delete();
  },

  ///////////////////////////////////////////////////////////////////  SUB CATEGORIES
  getSubCategoryOne() {
    return db.collection("subcategories").get();
  },

  async addSubCategoryToCategory(sub) {
    const newSub = await db.collection("subcategories").add(sub);
    await db.collection("subcategories").doc(newSub.id).update("_id", newSub.id);
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
    return db.collection("subcategorytwos").get();
  },

  async addSubCategoryTwo(idParent) {
    let newSubTwo = {
      idParent: idParent,
      enabled: true,
      _id: "",
      name: "",
    };
    const arrayOfFieldTwoNames = [
      "Formulaires",
      "Guides",
      "Manuels",
      "Reglements",
      "Procédures",
      "Programmes d'inspection",
      "Programmes nationaux",
    ];
    for (let index = 0; index < arrayOfFieldTwoNames.length; index++) {
      newSubTwo.name = arrayOfFieldTwoNames[index];
      const newSub = await db.collection("subcategorytwos").add(newSubTwo);
      await db.collection("subcategorytwos").doc(newSub.id).update("_id", newSub.id);
    }
  },
  async addNewSubCategoryTwoField(sub) {
    const newSub = await db.collection("subcategorytwos").add(sub);
    await db.collection("subcategorytwos").doc(newSub.id).update("_id", newSub.id);
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
  async togglePublicItem(data, id) {
    try {
      await db.collection("subcategories").doc(id).update("isPublic", data);
    } catch (error) {
      await db.collection("subcategorytwos").doc(id).update("isPublic", data);
    }
  },
  async toggleInternItem(data, id) {
    try {
      await db.collection("subcategories").doc(id).update("isIntern", data);
    } catch (error) {
      await db.collection("subcategorytwos").doc(id).update("isIntern", data);
    }
  },
};
