<template>
  <section class="reset">
    <div class="reset__card">
      <div class="reset__brand">
        <img src="@/assets/casa.png" alt="AAC" />
        <svg
          class="reset__wings"
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

      <h1 class="reset__title">Mot de passe oublié</h1>
      <p class="reset__sub">
        Saisissez votre adresse e-mail : nous vous enverrons un lien pour
        réinitialiser votre mot de passe.
      </p>

      <!-- Confirmation après envoi -->
      <div v-if="sent" class="reset__done">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span
          >Un e-mail de réinitialisation a été envoyé à <b>{{ email }}</b
          >. Pensez à vérifier vos spams.</span
        >
      </div>

      <template v-else>
        <div class="fld">
          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="inp"
            placeholder="agent@aac.dj"
            @keyup.enter="submit"
          />
        </div>

        <button
          class="reset__btn"
          :disabled="!email || loading"
          @click="submit"
        >
          {{ loading ? "Envoi…" : "Envoyer le lien de réinitialisation" }}
        </button>

        <p v-if="error" class="reset__error">{{ errorMessage }}</p>
      </template>

      <router-link to="/login" class="reset__back"
        >← Retour à la connexion</router-link
      >
    </div>
  </section>
</template>

<script>
import authService from "../services/auth.service";
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
      errorMessage: "",
      error: false,
      loading: false,
      sent: false,
    };
  },
  methods: {
    async submit() {
      if (!this.email) return;
      this.loading = true;
      this.error = false;
      try {
        await authService.resetPassword(this.email);
        this.sent = true;
        this.$store.dispatch(
          "successNotif",
          "L'e-mail de réinitialisation a été envoyé.",
        );
      } catch (error) {
        this.error = true;
        this.errorMessage =
          error.message ||
          "Impossible d'envoyer l'e-mail. Vérifiez l'adresse saisie.";
        this.$store.dispatch("warningNotif", this.errorMessage);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$navy: #0a2b4e;
$navy-700: #103a66;
$sky: #1b9dd9;
$green: #4a9e3f;
$muted: #5b6b78;
$red: #e0322b;
$line: #dde6ec;

.reset {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 48px 20px;
  background: radial-gradient(120% 120% at 80% -10%, #eef6fb 0%, #f4f7f9 60%);
}
.reset__card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 1px solid $line;
  border-top: 4px solid $navy;
  border-radius: 16px;
  padding: 36px 34px;
  box-shadow: 0 18px 44px rgba(10, 43, 78, 0.1);
}
.reset__brand {
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
.reset__title {
  font-family: "Spectral", Georgia, serif;
  font-size: 25px;
  font-weight: 800;
  color: $navy;
  margin-bottom: 6px;
}
.reset__sub {
  font-size: 13.5px;
  color: $muted;
  line-height: 1.55;
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
.reset__btn {
  width: 100%;
  margin-top: 4px;
  padding: 13px;
  font: inherit;
  font-size: 14px;
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
.reset__error {
  margin-top: 14px;
  padding: 10px 14px;
  background: rgba(224, 50, 43, 0.08);
  color: $red;
  border-radius: 9px;
  font-size: 13px;
  text-align: center;
}
.reset__done {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(74, 158, 63, 0.1);
  color: #2f6e28;
  border-radius: 10px;
  font-size: 13.5px;
  line-height: 1.5;
  margin-bottom: 8px;
  svg {
    flex: none;
    margin-top: 1px;
    color: $green;
  }
}
.reset__back {
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
</style>
