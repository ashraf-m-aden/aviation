// SDK modulaire utilisé UNIQUEMENT pour le MFA (TOTP) côté admin.
// Le reste de l'app (public + compat auth) continue d'utiliser firebaseConfig.js sans changement.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config } from "./firebaseConfig"; // même config que ton app compat

// Réutilise l'app compat déjà initialisée (firebase.initializeApp(config) dans firebaseConfig.js)
// plutôt que d'en recréer une seconde — évite les conflits de double init.
const app = getApps().length ? getApp() : initializeApp(config);
export const modularAuth = getAuth(app);
