import { auth, db, config } from "../firebaseConfig";
import firebase from "firebase/compat/app";

class Auth {
  /**
   * Connexion.
   * On authentifie d'ABORD, puis on lit le profil de l'utilisateur connecté
   * pour vérifier qu'il est actif. Avantages :
   *  - plus de crash quand l'e-mail n'existe pas (l'ancien code faisait
   *    documents[0].enabled sur un tableau vide) ;
   *  - la collection `users` n'a plus besoin d'être lisible par des
   *    visiteurs non connectés (on peut la verrouiller dans les règles).
   */
  async signIn(email, password) {
    const credential = await auth.signInWithEmailAndPassword(email, password);
    const snap = await db.collection("users").doc(credential.user.uid).get();

    if (!snap.exists || snap.data().enabled === false) {
      // compte supprimé/désactivé : on referme la session ouverte
      await auth.signOut();
      throw new Error("Ce compte est désactivé ou introuvable.");
    }
    return credential;
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
      const currentUser = auth.currentUser;
      await postAppAuth
        .createUserWithEmailAndPassword(staff.email, staff.password)
        .then(async (authResult) => {
          const user = {
            id: authResult.user.uid,
            email: authResult.user.email,
            name: staff.name,
            isAdmin: staff.isAdmin,
            enabled: true,
          };
          await db.collection("users").doc(user.id).set(user);
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
