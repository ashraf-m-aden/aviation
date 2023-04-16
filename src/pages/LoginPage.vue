<template>
  <div class="row justify-content-center mt-5">
    <div class="col-sm-12 col-md-5 card p-5 border-info mt-5 mb-5">
      <h4 class="mr-auto ml-auto mb-5">Connection</h4>
      <div class="form-group">
        <div class="form-group">
          <label class="form-check-label small font-italic font-weight-bold"
            >Votre addresse email</label
          >
          <input
            id="email"
            v-model="email"
            type="text"
            class="form-control"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label class="form-check-label small font-italic font-weight-bold"
            >Votre mot de passe</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="mot de passe"
          />
        </div>
        <div class="form-group d-flex">
          <button
            v-if="!loading"
            class="btn btn-group btn-outline-success"
            @click="submit()"
          >
            Connection
          </button>
          <button class="btn btn-group btn-outline-success" v-if="loading">
            Loading...
          </button>
        </div>
      </div>
      <span
        class="text-danger bg-white rounded-pill text-center"
        v-if="error"
        >{{ errorMessage }}</span
      >
    </div>
  </div>
</template>

<script>
import authService from "../services/auth.service";
export default {
  metaInfo() {
    // if no subcomponents specify a metaInfo.title, this title will be used
    return {
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
        {
          name: "googlebot",
          content: "noindex",
        },
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
      this.loading = true;
      this.error = false;
      var email = this.email;
      var password = this.password;
      try {
        const data = await authService.signIn(email, password);

        this.$store.dispatch("login", data.user);
        localStorage.setItem("id", data.user.uid);
        this.$store.dispatch(
          "successNotif",
          "Bienvenue, " + data.user.displayName
        );

        this.$router.push({
          path: "/",
        });
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.errorMessage = error;
        console.log(error);
        this.$store.dispatch("warningNotif", error);
      }
    },
  },
};
</script>
