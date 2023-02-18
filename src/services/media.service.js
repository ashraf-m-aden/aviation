import * as firebase  from "../firebaseConfig";
const db = firebase.db
export default {   

  async postbanner(banner) {
    // return media.post("/banner", { params: banner });
    const newData = await db.collection("banners").add(banner);
    banner._id = newData.id;

    return db.collection("banners").doc(banner._id).update(banner);
  },

  deletebanner(id) {
    //   return media.post("/deleteBanner/" + id);
    return db.collection("banners").doc(id).delete();
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

  deleteNews(id) {
    //  return media.post("/deleteNews/" + id);
    return db.collection("news").doc(id).delete();
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
  },
};
