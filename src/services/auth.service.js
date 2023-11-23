import { auth, db, config } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import {
  sendPasswordResetEmail,
  confirmPasswordReset,
  getAuth,
} from "firebase/auth";
class Auth {
  // authToken = null;
  // userProfile = null;
  // tokenExpiry = null;
  // const isloggedIn = "isLoggedIn";
  firebaseAuth = getAuth();

  async signIn(email, password) {
    const user = await db.collection("users").where("email", "==", email).get();

    let documents = user.docs.map((doc) => doc.data());

    if (documents[0].enabled) {
      return auth.signInWithEmailAndPassword(email, password);
    } else {
      throw new Error("Utilisateur inexistant");
    }
  }
  async getUser(id) {
    return await db.collection("users").doc(id).get();
  }
  async getAllUsers() {
    return await db.collection("users").where("enabled", "==", true).get();
  }
  async logout() {
    await auth.signOut();
  }
  async postStaff(staff) {
    const user = await db
      .collection("users")
      .where("email", "==", staff.email)
      .get();

    let documents = user.docs.map((doc) => doc.data());

    if (documents.length > 0) {
      throw new Error("Email existe deja");
    } else {
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
            enabled: true,
          };
          await db.collection("users").doc(user.id).set(user); // cree dans la collection users un document qui a cet id users.id avk les donné "user"
          await postAppAuth.signOut();
          await postApp.delete();
        });
      auth.updateCurrentUser(currentUser);
    }
  }
  async modifyStaff(staff) {
    return await db.collection("users").doc(staff.id).update(staff);
  }
  async deleteStaff(id) {
    return await db.collection("users").doc(id).update("enabled", false);
  }

  async resetPassword(email) {
    /// dans authservice
    var actionCodeSettings = {
      url: "https://www.example.com/?email=user@example.com",
      iOS: {
        bundleId: "com.example.ios",
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12",
      },
      handleCodeInApp: true,
    };
    return await sendPasswordResetEmail(this.firebaseAuth, email);
  }

  async confirmNewPassword(link, newPassword) {
    // return await confirmPasswordReset(this.firebaseAuth, link, newPassword);
    // return sendCustomVerificationEmail(useremail, displayName, link);
  }
}

export default new Auth();
