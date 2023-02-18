import EventEmitter from "events";
import { auth, db } from "../firebaseConfig";
import firebase from "firebase/compat/app";

class Auth extends EventEmitter {
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
  getAllUsers() {
    return auth.get("/allUsers");
  }
  async logout() {
    await auth.signOut();
  }
  postStaff(staff) {
    const postApp = firebase.app("postApp");
    const postAppAuth = postApp.auth();
    return postAppAuth
      .createUserWithEmailAndPassword(staff.email, staff.password)
      .then(async (authResult) => {
        // this.tokenExpiry = new Date();
        // localStorage.setItem(loginExpiryKey, this.tokenExpiry);
        const user = {
          id: authResult.user.uid,
          email: authResult.user.email,
          name: staff.name,
          isAdmin: user.isAdmin,
        };
        await postApp.firestore().collection("users").doc(user.uid).set(user); // cree dans la collection users un document qui a cet id users.id avk les donné "user"
        await postApp.delete();
      });
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
