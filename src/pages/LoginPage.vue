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
      <p class="login__sub">Connectez-vous pour accéder à l'administration.</p>

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

      <p v-if="error" class="login__error">{{ errorMessage }}</p>

      <router-link to="/reset-password" class="login__reset">
        Réinitialiser mon mot de passe
      </router-link>
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
      password: "",
      errorMessage: "",
      error: false,
      loading: false,
    };
  },
  methods: {
    async submit() {
      if (!this.email || !this.password) return;
      this.loading = true;
      this.error = false;
      try {
        const data = await authService.signIn(this.email, this.password);
        localStorage.setItem("id", data.user.uid);
        this.$router.push({ path: "/admin" });
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message || "Identifiants invalides.";
        this.$store.dispatch("warningNotif", this.errorMessage);
      }
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
</style>
