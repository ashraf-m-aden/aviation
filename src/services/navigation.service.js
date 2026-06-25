import { db } from "../firebaseConfig";

const COLLECTION = "navigation";

/**
 * Accès Firestore à la collection `navigation`.
 * Style aligné sur tes services existants (compat, _id stocké dans le doc).
 *
 * Forme d'un document :
 * {
 *   _id, label:{fr,en,ar}, slug, type:"link"|"dropdown",
 *   kind:"documents"|"content"|"external"|"component",
 *   order, enabled,
 *   category, url, component,           // selon kind
 *   content:{ blocks:[...] },           // si kind = content
 *   children:[ ...mêmes objets... ]     // si type = dropdown
 * }
 */
export default {
  getNavigation() {
    return db.collection(COLLECTION).get();
  },

  // Header public : seuls les items activés. Le tri par `order` est fait côté
  // store pour éviter d'avoir à créer un index composite Firestore.
  getPublicNavigation() {
    return db.collection(COLLECTION).where("enabled", "==", true).get();
  },

  async addNavItem(item) {
    const ref = await db.collection(COLLECTION).add(item);
    await db.collection(COLLECTION).doc(ref.id).update("_id", ref.id);
    return ref.id;
  },

  updateNavItem(id, data) {
    return db.collection(COLLECTION).doc(id).update(data);
  },

  deleteNavItem(id) {
    return db.collection(COLLECTION).doc(id).delete();
  },

  setEnabled(id, value) {
    return db.collection(COLLECTION).doc(id).update("enabled", value);
  },

  // Réordonnancement par lot après un drag & drop : on réécrit le champ `order`.
  reorder(items) {
    const batch = db.batch();
    items.forEach((it, index) => {
      batch.update(db.collection(COLLECTION).doc(it._id), { order: index });
    });
    return batch.commit();
  },
};
