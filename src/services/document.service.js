import * as firebase  from "../firebaseConfig";
const db = firebase.db
export default {   

  async postDocument(doc) {
    // return document.post("/document", { params: doc });
    const newData = await db.collection("documents").add(doc);
    doc._id = newData.id;

    return db.collection("documents").doc(doc._id).update(doc);
  },
  deleteDocument(id) {
    //   return document.post("/deleteDocument/" + id);
    return db.collection("documents").doc(id).delete();
  },
  disableDocument(id) {
    return db.collection("documents").doc(id).update("enabled", false);
  },
  enableDocument(id) {
    return db.collection("documents").doc(id).update("enabled", true);
  },
  getDocuments() {
    // return document.get("/documents");
    return db.collection("documents").get();
  },
  getPublic() {
    return db
      .collection("documents")
      .where("enabled", "==", true)
      .where("isIntern", "==", false)
      .get();
  },

  ///////////////////////////////////////////////////////////////////////////////////
  async saveToFirestore(documents) {
    documents.forEach(async (one) => {
      await db.collection("documents").doc(one._id).set(one);
    });
  },
};
