<template>
  <div class="profile">
    <h2 class="profile__title">Mon profil</h2>

<!-- Section TOTP dans ProfilePage.vue, remplace le bloc existant -->
<section class="pcard">
  <h3 class="pcard__h3">Authentification à deux facteurs</h3>

  <div v-if="mfaEnabled" class="pcard__status pcard__status--on">
    <span>✅ Activée</span>
    <button class="btn-link btn-link--danger" @click="disableMfa">Désactiver</button>
  </div>

  <template v-else>
    <p class="pcard__hint">
      Un code à 6 chiffres généré par une application comme Google
      Authenticator te sera demandé à chaque connexion, une fois activée.
    </p>

    <div v-if="!showQr" class="pcard__row">
      <button class="btn-save" @click="loadQr">
        Configurer l'authentification à deux facteurs
      </button>
    </div>

    <div v-else class="qr-box">
      <div v-if="qrLoading" class="qr-box__state">Chargement…</div>
      <div v-else-if="qrError" class="qr-box__error">{{ qrError }}</div>
      <template v-else>
        <img :src="qrDataUrl" alt="QR code TOTP" class="qr-box__img" />
        <p class="qr-box__manual">
          Ou saisis manuellement dans l'app : <code>{{ secretKey }}</code>
        </p>

        <div class="fld">
          <label>Confirme avec un code généré par l'app</label>
          <input
            class="inp"
            type="text"
            v-model="confirmCode"
            maxlength="6"
            inputmode="numeric"
            placeholder="123456"
          />
        </div>
        <button
          class="btn-save"
          :disabled="confirmCode.length !== 6 || confirmLoading"
          @click="confirmAndEnable"
        >
          {{ confirmLoading ? "Vérification…" : "Confirmer et activer" }}
        </button>
        <p v-if="confirmError" class="pcard__error">{{ confirmError }}</p>
      </template>
      <button class="btn-link" @click="showQr = false">Annuler</button>
    </div>
  </template>
</section>

    <!-- Section mot de passe -->
    <section class="pcard">
      <h3 class="pcard__h3">Changer mon mot de passe</h3>

      <div class="fld">
        <label>Mot de passe actuel</label>
        <input class="inp" type="password" v-model="currentPassword" />
      </div>
      <div class="fld">
        <label>Nouveau mot de passe</label>
        <input class="inp" type="password" v-model="newPassword" />
      </div>
      <div class="fld">
        <label>Confirmer le nouveau mot de passe</label>
        <input class="inp" type="password" v-model="confirmPassword" />
      </div>

      <button class="btn-save" :disabled="pwLoading" @click="changePassword">
        {{ pwLoading ? "Mise à jour…" : "Mettre à jour le mot de passe" }}
      </button>

      <p v-if="pwError" class="pcard__error">{{ pwError }}</p>
      <p v-if="pwSuccess" class="pcard__success">{{ pwSuccess }}</p>
    </section>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { modularAuth } from "@/firebase-modular";
import { db } from "@/firebaseConfig";

// Ordre correct : on déclare `functions` AVANT de l'utiliser
const functions = getFunctions(getApp(), "us-central1");
const getTotpUriCallable = httpsCallable(functions, "getTotpUri");
const verifyTotpCallable = httpsCallable(functions, "verifyTotp");

export default {
  name: "ProfilePage",
  data() {
    return {
      showQr: false,
      qrLoading: false,
      qrError: "",
      qrDataUrl: "",
      secretKey: "",
      mfaEnabled: false,
      confirmCode: "",
      confirmLoading: false,
      confirmError: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      pwLoading: false,
      pwError: "",
      pwSuccess: "",
    };
  },
  methods: {
    async loadQr() {
      this.showQr = true;
      if (this.qrDataUrl) return;
      this.qrLoading = true;
      this.qrError = "";
      try {
        const result = await getTotpUriCallable();
        const { uri, secret } = result.data;
        this.secretKey = secret;
        this.qrDataUrl = await QRCode.toDataURL(uri, { width: 220, margin: 1 });
      } catch (e) {
        this.qrError = "Impossible de charger le QR code.";
      } finally {
        this.qrLoading = false;
      }
    },

    async confirmAndEnable() {
      this.confirmLoading = true;
      this.confirmError = "";
      try {
        const result = await verifyTotpCallable({ code: this.confirmCode });
        if (!result.data.valid) {
          this.confirmError = "Code invalide, réessaie.";
          return;
        }
        const uid = modularAuth.currentUser.uid;
        await db.collection("users").doc(uid).update({ mfaEnabled: true });
        this.mfaEnabled = true;
        this.showQr = false;
        this.confirmCode = "";
        this.$store.dispatch("successNotif", "Double authentification activée.");
      } catch (e) {
        this.confirmError = "Erreur lors de la vérification.";
      } finally {
        this.confirmLoading = false;
      }
    },

    async disableMfa() {
      if (!confirm("Désactiver la double authentification ?")) return;
      const uid = modularAuth.currentUser.uid;
      await db.collection("users").doc(uid).update({ mfaEnabled: false });
      this.mfaEnabled = false;
      this.$store.dispatch("warningNotif", "Double authentification désactivée.");
    },

    async changePassword() {
      this.pwError = "";
      this.pwSuccess = "";

      if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
        this.pwError = "Tous les champs sont requis.";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.pwError = "Les nouveaux mots de passe ne correspondent pas.";
        return;
      }
      if (this.newPassword.length < 6) {
        this.pwError = "Le nouveau mot de passe doit contenir au moins 6 caractères.";
        return;
      }

      this.pwLoading = true;
      try {
        const user = modularAuth.currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          this.currentPassword,
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.newPassword);

        this.pwSuccess = "Mot de passe mis à jour avec succès.";
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (e) {
        this.pwError =
          e.code === "auth/wrong-password" || e.code === "auth/invalid-credential"
            ? "Mot de passe actuel incorrect."
            : "Erreur lors de la mise à jour du mot de passe.";
      } finally {
        this.pwLoading = false;
      }
    },
  },
created() {
  this.mfaEnabled = this.$store.getters.getUser?.mfaEnabled === true;
},
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$muted: #5b6b78;
$red: #e0322b;
$green: #217346;
$line: #dde6ec;

.profile {
  max-width: 560px;
  &__title {
    font-size: 22px;
    color: $navy;
    font-family: "Spectral", Georgia, serif;
    margin-bottom: 20px;
  }
}
.pcard {
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  &__h3 {
    font-size: 15px;
    color: $navy;
    margin: 0 0 8px;
  }
  &__hint {
    font-size: 13px;
    color: $muted;
    margin-bottom: 16px;
  }
  &__error {
    color: $red;
    font-size: 13px;
    margin-top: 12px;
  }
  &__success {
    color: $green;
    font-size: 13px;
    margin-top: 12px;
  }
}
.fld {
  margin-bottom: 14px;
  label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 6px;
  }
}
.inp {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 13.5px;
  outline: none;
  &:focus {
    border-color: $sky;
  }
}
.btn-save {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: $navy-700;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
.btn-link {
  display: block;
  margin-top: 12px;
  background: none;
  border: none;
  color: $sky;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.qr-box {
  text-align: center;
  background: #f9fbfc;
  border: 1px solid $line;
  border-radius: 10px;
  padding: 16px;
  &__state {
    color: $muted;
    font-size: 13px;
  }
  &__error {
    color: $red;
    font-size: 13px;
  }
  &__manual {
    margin-top: 10px;
    font-size: 11px;
    color: $muted;
    word-break: break-all;
    code {
      background: #fff;
      border: 1px solid $line;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }
  }
}
</style>
