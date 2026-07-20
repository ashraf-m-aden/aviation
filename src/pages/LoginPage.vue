<template>
  <section class="login">
    <div class="login__card">
      <div class="login__brand">
        <img src="@/assets/casa.png" alt="AAC" />
        <svg
          class="login__wings"
          width="80"
          height="20"
          viewBox="0 0 80 20"
          aria-hidden="true"
        >
          <g fill="#1B9DD9">
            <path d="M0 9h30l-6 3H0z" opacity=".4" />
            <path d="M9 2h30l-6 3H9z" />
            <path d="M5 16h30l-6 3H5z" opacity=".3" />
          </g>
        </svg>
      </div>

      <h1 class="login__title">Espace agent</h1>

      <!-- Étape 1 : email/mot de passe -->
      <template v-if="!awaitingTotp">
        <p class="login__sub">
          Connectez-vous pour accéder à l'administration.
        </p>

        <div class="fld">
          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            v-model="email"
            type="text"
            class="inp"
            placeholder="agent@aac.dj"
            @keyup.enter="submit"
          />
        </div>

        <div class="fld">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="inp"
            placeholder="••••••••"
            @keyup.enter="submit"
          />
        </div>

        <button class="login__btn" :disabled="loading" @click="submit">
          {{ loading ? "Connexion…" : "Se connecter" }}
        </button>

        <router-link to="/reset-password" class="login__reset">
          Réinitialiser mon mot de passe
        </router-link>
      </template>

      <!-- Étape 2 : TOTP -->
      <template v-else>
        <p class="login__sub">
          Saisis le code à 6 chiffres généré par ton application
          d'authentification.
        </p>

        <!-- QR affiché uniquement si l'utilisateur clique sur "pas encore configuré" -->
        <div v-if="showQr" class="qr-box">
          <div v-if="qrLoading" class="qr-box__state">
            Chargement du QR code…
          </div>
          <div v-else-if="qrError" class="qr-box__error">{{ qrError }}</div>
          <template v-else>
            <img :src="qrDataUrl" alt="QR code TOTP" class="qr-box__img" />
            <p class="qr-box__manual">
              Ou saisis manuellement : <code>{{ secretKey }}</code>
            </p>
          </template>
        </div>

        <div class="fld">
          <label for="totp">Code d'authentification</label>
          <input
            id="totp"
            v-model="totpCode"
            type="text"
            class="inp"
            placeholder="123456"
            maxlength="6"
            inputmode="numeric"
            autofocus
            @keyup.enter="submit"
          />
        </div>

        <button
          class="login__btn"
          :disabled="loading || totpCode.length !== 6"
          @click="submit"
        >
          {{ loading ? "Vérification…" : "Valider" }}
        </button>

        <button class="login__link" @click="toggleQr">
          {{
            showQr
              ? "Masquer le QR code"
              : "Je n'ai pas encore configuré mon authenticator"
          }}
        </button>

        <button class="login__cancel" @click="cancel">Annuler</button>
      </template>

      <p v-if="error" class="login__error">{{ errorMessage }}</p>
    </div>
  </section>
</template>

<script>
import authService from "../services/auth.service";
import QRCode from "qrcode";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const verifyTotpCallable = httpsCallable(functions, "verifyTotp");
const getTotpUriCallable = httpsCallable(functions, "getTotpUri");

export default {
  metaInfo() {
    return {
      meta: [
        { name: "robots", content: "noindex" },
        { name: "googlebot", content: "noindex" },
      ],
    };
  },
  data() {
    return {
      email: "",
      password: "",
      totpCode: "",
      awaitingTotp: false,
      errorMessage: "",
      error: false,
      loading: false,
      showQr: false,
      qrLoading: false,
      qrError: "",
      qrDataUrl: "",
      secretKey: "",
    };
  },
  methods: {
    async submit() {
      if (this.awaitingTotp) return this.confirmTotp();
      await this.signInFirstStep();
    },

    async signInFirstStep() {
      if (!this.email || !this.password) return;
      this.loading = true;
      this.error = false;
      try {
        const data = await authService.signIn(this.email, this.password);
        localStorage.setItem("id", data.user.uid);
        this.loading = false;
        this.awaitingTotp = true;
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message || "Identifiants invalides.";
        this.$store.dispatch("warningNotif", this.errorMessage);
      }
    },

    async confirmTotp() {
      this.loading = true;
      this.error = false;
      try {
        const result = await verifyTotpCallable({ code: this.totpCode });
        if (result.data.valid) {
          this.$router.push({ path: "/admin" });
        } else {
          throw new Error("Code invalide");
        }
      } catch (e) {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Code invalide, réessaie.";
        this.totpCode = "";
      }
    },

    // Affiche/masque le QR — chargé à la demande seulement,
    // pour ne pas exposer le secret à chaque connexion inutilement.
    async toggleQr() {
      this.showQr = !this.showQr;
      if (this.showQr && !this.qrDataUrl) {
        this.qrLoading = true;
        this.qrError = "";
        try {
          const result = await getTotpUriCallable();
          const { uri, secret } = result.data;
          this.secretKey = secret;
          this.qrDataUrl = await QRCode.toDataURL(uri, {
            width: 220,
            margin: 1,
          });
        } catch (e) {
          this.qrError = "Impossible de charger le QR code.";
        } finally {
          this.qrLoading = false;
        }
      }
    },

    async cancel() {
      await authService.logout();
      this.awaitingTotp = false;
      this.email = "";
      this.password = "";
      this.totpCode = "";
      this.showQr = false;
      this.qrDataUrl = "";
      this.error = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$muted: #5b6b78;
$red: #e0322b;
$line: #dde6ec;

.login {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 48px 20px;
  background: radial-gradient(120% 120% at 80% -10%, #eef6fb 0%, #f4f7f9 60%);
}
.login__card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 1px solid $line;
  border-top: 4px solid $navy;
  border-radius: 16px;
  padding: 36px 34px;
  box-shadow: 0 18px 44px rgba(10, 43, 78, 0.1);
}
.login__brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  img {
    width: 52px;
    height: 52px;
    object-fit: contain;
  }
}
.login__title {
  font-family: "Spectral", Georgia, serif;
  font-size: 26px;
  font-weight: 800;
  color: $navy;
  margin-bottom: 6px;
}
.login__sub {
  font-size: 13.5px;
  color: $muted;
  margin-bottom: 26px;
}
.fld {
  margin-bottom: 16px;
  label {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: $navy;
    margin-bottom: 7px;
  }
}
.inp {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid $line;
  border-radius: 9px;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
  &:focus {
    border-color: $sky;
  }
}
.login__btn {
  width: 100%;
  margin-top: 8px;
  padding: 13px;
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
  background: $navy;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover:not(:disabled) {
    background: $navy-700;
  }
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}
.login__error {
  margin-top: 14px;
  padding: 10px 14px;
  background: rgba(224, 50, 43, 0.08);
  color: $red;
  border-radius: 9px;
  font-size: 13px;
  text-align: center;
}
.login__reset {
  display: block;
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: $sky;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.login__link {
  display: block;
  width: 100%;
  margin-top: 16px;
  background: none;
  border: none;
  color: $sky;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
}
.login__cancel {
  display: block;
  width: 100%;
  margin-top: 10px;
  background: none;
  border: none;
  color: $muted;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: $navy;
    text-decoration: underline;
  }
}
.qr-box {
  background: #f9fbfc;
  border: 1px solid $line;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 18px;
  text-align: center;
  &__state {
    color: $muted;
    font-size: 13px;
  }
  &__error {
    color: $red;
    font-size: 13px;
  }
  &__img {
    border-radius: 6px;
  }
  &__manual {
    margin-top: 10px;
    font-size: 11.5px;
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
