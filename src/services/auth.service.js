import { auth, db, config } from "../firebaseConfig";
import firebase from "firebase/compat/app";

class Auth {
  // authToken = null;
  // userProfile = null;
  // tokenExpiry = null;
  // const isloggedIn = "isLoggedIn";

  signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  async getUser(id) {
    return await db.collection("users").doc(id).get();
  }
  async getAllUsers() {
    return await db.collection("users").get();
  }
  async logout() {
    await auth.signOut();
  }
  async postStaff(staff) {
    const postApp = firebase.initializeApp(config, "postApp");
    const postAppAuth = postApp.auth();
    // const postAppDb = postApp.firestore();
    const currentUser = auth.currentUser;
    await postAppAuth
      .createUserWithEmailAndPassword(staff.email, staff.password)
      .then(async (authResult) => {
        // this.tokenExpiry = new Date();
        // localStorage.setItem(loginExpiryKey, this.tokenExpiry);
        const user = {
          id: authResult.user.uid,
          email: authResult.user.email,
          name: staff.name,
          isAdmin: staff.isAdmin,
        };
        await db.collection("users").doc(user.uid).set(user); // cree dans la collection users un document qui a cet id users.id avk les donné "user"
        await postAppAuth.signOut();
        await postApp.delete();
      });
    auth.updateCurrentUser(currentUser);
  }
  modifyStaff(staff) {
    return auth.post("/modifyStaff/" + staff._id, {
      params: staff,
    });
  }
  deleteStaff(staff) {
    return auth.post("/deleteStaff/" + staff._id, {
      params: staff,
    });
  }
}

export default new Auth();
