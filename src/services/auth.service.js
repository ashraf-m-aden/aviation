import { auth, db, config } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import {
  signInWithEmailAndPassword,
  getMultiFactorResolver,
  TotpMultiFactorGenerator,
  signOut,
} from "firebase/auth";
import { modularAuth } from "../firebase-modular";

class Auth {
  /**
   * Connexion admin — bascule sur le SDK modulaire pour supporter le TOTP.
   * Si un second facteur est requis, on ne lève pas une erreur "fatale" :
   * on attache le resolver à l'erreur pour que le composant appelant
   * (LoginPage) puisse afficher le prompt TOTP.
   */
  async signIn(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(
        modularAuth,
        email,
        password,
      );
      return await this._afterSignIn(credential.user);
    } catch (error) {
      if (error.code === "auth/multi-factor-auth-required") {
        const resolver = getMultiFactorResolver(modularAuth, error);
        const mfaError = new Error("Un second facteur est requis.");
        mfaError.code = "auth/multi-factor-auth-required";
        mfaError.resolver = resolver;
        throw mfaError;
      }
      throw error;
    }
  }

  /**
   * Deuxième étape de connexion : valide le code TOTP saisi
   * et termine la connexion initiée par signIn().
   */
  async confirmTotpSignIn(resolver, code) {
    const assertion = TotpMultiFactorGenerator.assertionForSignIn(
      resolver.hints[0].uid,
      code,
    );
    const userCredential = await resolver.resolveSignIn(assertion);
    return await this._afterSignIn(userCredential.user);
  }

  // Vérifie que le compte est actif, comme avant — mais exécuté après
  // résolution complète de l'auth (avec ou sans MFA).
  async _afterSignIn(user) {
    const snap = await db.collection("users").doc(user.uid).get();
    if (!snap.exists || snap.data().enabled === false) {
      await signOut(modularAuth);
      throw new Error("Ce compte est désactivé ou introuvable.");
    }
    return { user };
  }

  async getUser(id) {
    return await db.collection("users").doc(id).get();
  }

  async getAllUsers() {
    return await db.collection("users").where("enabled", "==", true).get();
  }

  async logout() {
    await signOut(modularAuth);
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
      const currentUser = auth.currentUser;
      await postAppAuth
        .createUserWithEmailAndPassword(staff.email, staff.password)
        .then(async (authResult) => {
          const newUser = {
            id: authResult.user.uid,
            email: authResult.user.email,
            name: staff.name,
            isAdmin: staff.isAdmin,
            accessScope: staff.accessScope || [],
            mediaAccess: staff.mediaAccess || [],
            enabled: true,
          };
          await db.collection("users").doc(newUser.id).set(newUser);
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
    return await auth.sendPasswordResetEmail(email);
  }
}

export default new Auth();
