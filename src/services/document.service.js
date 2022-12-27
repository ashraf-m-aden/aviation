import axios from "axios";
import { db } from "../firebaseConfig";

const document = axios.create({
    baseURL: process.env.VUE_APP_BACKEND

});
document.interceptors.request.use((config) => {
    config.headers.common.Authorization =
        "Bearer " + localStorage.getItem("token");
    return config;
});
export default {
    async postDocument(doc) {
        // return document.post("/document", { params: doc });
        const newData = await db.collection("documents").add(doc);
        doc._id = newData.id;

        return db.collection("documents").doc(doc._id).update(doc);
    },
    deleteDocument(id) {
        //   return document.post("/deleteDocument/" + id);
        return db.collection("documents").doc(id).delete()

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
        return db.collection("documents").where("enabled", "==", true).get();
    },

    ///////////////////////////////////////////////////////////////////////////////////
    async saveToFirestore(documents) {
        documents.forEach(async (one) => {
            await db.collection("documents").doc(one._id).set(one);
        });
    }
};
