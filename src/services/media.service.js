import axios from "axios";
import { db } from "../firebaseConfig";

const media = axios.create({
    baseURL: process.env.VUE_APP_BACKEND

});
media.interceptors.request.use((config) => {
    config.headers.common.Authorization =
        "Bearer " + localStorage.getItem("token");
    return config;
});
export default {
    async postbanner(banner) {
        // return media.post("/banner", { params: banner });
        const newData = await db.collection("banners").add(banner);
        banner._id = newData.id;

        return db.collection("banners").doc(banner._id).update(banner);

    },
    saveNewBanner(banner) {
        return media.post("/newBanner", { params: banner });
    },
    deletebanner(id) {
        //   return media.post("/deleteBanner/" + id);
        return db.collection("banners").doc(id).delete()
    },
    disablebanner(id) {
        return media.post("/disableBanner/" + id);
    },
    enableBanner(id) {
        return media.post("/enableBanner/" + id);
    },
    getBanner() {
        // return media.get("/banners");
        return db.collection("banners").get();

    },
    async postnews(news) {
        //   return media.post("/news", { params: news });
        const newData = await db.collection("news").add(news);
        news._id = newData.id;

        return db.collection("news").doc(news._id).update(news);
    },
    saveNewNews(news) {
        return media.post("/newNews", { params: news });
    },
    deleteNews(id) {
        //  return media.post("/deleteNews/" + id);
        return db.collection("news").doc(id).delete()

    },
    modifyNews(news) {
        return media.post("/modifyNews", { params: news });
    },
    enableNews(id) {
        return media.post("/enableNews/" + id);
    },
    getNews() {
        //  return media.get("/news");
        return db.collection("news").get();

    },
    ///////////////////////////////////////////////////////////////////////////////////
    async saveNewsToFirestore(news) {
        news.forEach(async (article) => {
            await db.collection("news").doc(article._id).set(article);
        });
    }
};
