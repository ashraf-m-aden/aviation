import EventEmitter from "events";
import { auth } from "../firebaseConfig";
import firebase from "firebase/compat/app";

class Auth extends EventEmitter {
  // authToken = null;
  // userProfile = null;
  // tokenExpiry = null;
  // const isloggedIn = "isLoggedIn";

  signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  async getUser() {
    return await auth.onAuthStateChanged(function (user) {
      console.log(user);
      if (user) {
        return user;
      } else {
        // No user is signed in.
        return null;
      }
    });
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
          email: authResult.user.email,
          name: staff.name,
          isAdmin: user.isAdmin,
        };
        await postApp.firestore().collection("users").doc(user.id).set(user); // cree dans la collection users un document qui a cet id users.id avk les donné "user"
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
