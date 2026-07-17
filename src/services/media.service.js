import { db } from "../firebaseConfig";

export default {
  /* ---------------- Bannières ---------------- */
  async postbanner(banner) {
    const newData = await db.collection("banners").add(banner);
    banner._id = newData.id;
    return db.collection("banners").doc(banner._id).update(banner);
  },
  modifyBanner(banner) {
    return db.collection("banners").doc(banner._id).update(banner);
  },
  deletebanner(id) {
    return db.collection("banners").doc(id).delete();
  },
  getBanner() {
    return db.collection("banners").get();
  },
  // persiste l'ordre après réordonnancement (champ `order`)
  saveNewBanner(banners) {
    const batch = db.batch();
    banners.forEach((b, i) => {
      if (b && b._id)
        batch.update(db.collection("banners").doc(b._id), { order: i });
    });
    return batch.commit();
  },

  /* ---------------- Actualités ---------------- */
  async postnews(news) {
    const newData = await db.collection("news").add(news);
    news._id = newData.id;
    return db.collection("news").doc(news._id).update(news);
  },
  // était appelée par le store mais n'existait pas → corrigé
  modifyNews(news) {
    return db.collection("news").doc(news._id).update(news);
  },
  deleteNews(id) {
    return db.collection("news").doc(id).delete();
  },
  getNews() {
    return db.collection("news").get();
  },
  saveNewNews(news) {
    const batch = db.batch();
    news.forEach((n, i) => {
      if (n && n._id)
        batch.update(db.collection("news").doc(n._id), { order: i });
    });
    return batch.commit();
  },
  getHeaderImage() {
    return db.collection("settings").doc("headerImage").get();
  },
  setHeaderImage(data) {
    return db
      .collection("settings")
      .doc("headerImage")
      .set(data, { merge: true });
  },
};
