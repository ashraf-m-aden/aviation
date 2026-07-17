<template>
  <div class="mfa">
    <h3 class="mfa__h3">Authentification à deux facteurs (TOTP)</h3>

    <div v-if="!ready" class="mfa__hint">Chargement…</div>

    <template v-else>
      <div v-if="!enrolled">
        <p class="mfa__hint">
          Scanne ce QR code avec Google Authenticator, Authy ou une app
          similaire, puis saisis le code à 6 chiffres généré pour confirmer.
        </p>

        <button v-if="!qrUrl" class="btn-save" @click="startEnroll">
          Générer le QR code
        </button>

        <div v-else class="mfa__setup">
          <img :src="qrUrl" alt="QR code TOTP" class="mfa__qr" />
          <p class="mfa__secret">
            Ou saisis manuellement : <code>{{ secretKey }}</code>
          </p>
          <input
            class="inp"
            type="text"
            v-model="code"
            placeholder="Code à 6 chiffres"
            maxlength="6"
            inputmode="numeric"
          />
          <button
            class="btn-save"
            :disabled="code.length !== 6"
            @click="confirmEnroll"
          >
            Confirmer
          </button>
        </div>
        <p v-if="error" class="mfa__error">{{ error }}</p>
      </div>

      <div v-else class="mfa__done">
        <p>✅ Authentification à deux facteurs activée.</p>
        <button class="ico del" @click="unenroll">Désactiver le MFA</button>
      </div>
    </template>
  </div>
</template>

<script>
import {
  multiFactor,
  TotpMultiFactorGenerator,
  onAuthStateChanged,
} from "firebase/auth";
import { modularAuth } from "@/firebase-modular";

export default {
  name: "MfaEnrollPage",
  data() {
    return {
      ready: false,
      user: null,
      qrUrl: "",
      secretKey: "",
      totpSecret: null,
      code: "",
      error: "",
    };
  },
  computed: {
    enrolled() {
      if (!this.user) return false;
      return multiFactor(this.user).enrolledFactors.some(
        (f) => f.factorId === "totp",
      );
    },
  },
  methods: {
    async startEnroll() {
      this.error = "";
      try {
        if (!this.user) {
          this.error = "Session expirée, reconnecte-toi puis réessaie.";
          return;
        }
        const mfaSession = await multiFactor(this.user).getSession();
        this.totpSecret =
          await TotpMultiFactorGenerator.generateSecret(mfaSession);

        this.secretKey = this.totpSecret.secretKey;
        const otpauthUrl = this.totpSecret.generateQrCodeUrl(
          this.user.email,
          "AAC Djibouti Admin",
        );
        this.qrUrl =
          "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
          encodeURIComponent(otpauthUrl);
      } catch (e) {
        this.error =
          e.code === "auth/requires-recent-login"
            ? "Reconnecte-toi puis réessaie (session trop ancienne)."
            : "Erreur lors de la génération du QR code.";
      }
    },
    async confirmEnroll() {
      this.error = "";
      try {
        const assertion = TotpMultiFactorGenerator.assertionForEnrollment(
          this.totpSecret,
          this.code,
        );
        await multiFactor(this.user).enroll(assertion, "Authenticator app");
        this.qrUrl = "";
        this.code = "";
      } catch (e) {
        this.error = "Code invalide, réessaie.";
      }
    },
    async unenroll() {
      if (!confirm("Désactiver le MFA sur ce compte ?")) return;
      const factor = multiFactor(this.user).enrolledFactors.find(
        (f) => f.factorId === "totp",
      );
      if (factor) {
        await multiFactor(this.user).unenroll(factor);
      }
    },
  },
  created() {
    // écoute l'état d'auth modulaire (indépendant du store compat)
    onAuthStateChanged(modularAuth, (u) => {
      this.user = u;
      this.ready = true;
    });
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$muted: #5b6b78;
$line: #dde6ec;
$red: #e0322b;

.mfa {
  &__h3 {
    font-size: 16px;
    color: $navy;
    margin: 0 0 12px;
  }
  &__hint {
    font-size: 13px;
    color: $muted;
    max-width: 480px;
    margin-bottom: 14px;
  }
  &__setup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 280px;
  }
  &__qr {
    border: 1px solid $line;
    border-radius: 8px;
  }
  &__secret {
    font-size: 12px;
    color: $muted;
    code {
      background: #f4f7f9;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
  &__error {
    color: $red;
    font-size: 12.5px;
    margin-top: 8px;
  }
  &__done p {
    color: $navy;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
.inp {
  padding: 9px 11px;
  border: 1px solid $line;
  border-radius: 8px;
  font: inherit;
  font-size: 14px;
  letter-spacing: 2px;
  text-align: center;
  outline: none;
  &:focus {
    border-color: $sky;
  }
}
.btn-save {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 7px;
  padding: 9px 16px;
  cursor: pointer;
  align-self: flex-start;
  &:hover:not(:disabled) {
    background: $navy-700;
  }
  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
}
.ico.del {
  border: 1px solid $line;
  background: #fff;
  color: $red;
  border-radius: 7px;
  padding: 7px 14px;
  font-size: 12.5px;
  cursor: pointer;
  &:hover {
    background: $red;
    color: #fff;
    border-color: $red;
  }
}
</style>
