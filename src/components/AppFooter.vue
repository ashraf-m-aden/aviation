<template>
  <div class="container-fluid app-footer">
    <div class="row footer pt-5 pb-5">
      <div class="col-12 col-md-4 text-light d-flex flex-column">
        <a class="navbar-brand img-fluid mb-2" href="#">
          <img src="@/assets/casa.png" alt="logo" class="img-fluid logo" />
        </a>
        <h1>
          <strong class="text-light">{{ $t("brand.full") }}</strong>
        </h1>
        <p>{{ $t("footer.tagline") }}</p>
      </div>

      <div class="col-12 col-md-4 text-light">
        <h2 class="h4">{{ $t("footer.headOffice") }}</h2>
        {{ $t("footer.address") }} <br />
        {{ $t("footer.authority") }}<br />
        <font-awesome-icon :icon="['fas', 'phone']" /> +253 21 335100 <br />
        <font-awesome-icon :icon="['fas', 'fax']" /> +253 21 340169 <br />
        <font-awesome-icon :icon="['fas', 'inbox']" /> 2609 <br />
        <font-awesome-icon :icon="['fas', 'envelope']" /> civilaviation@intnet.dj
      </div>

      <div class="col-12 col-md-4 d-flex flex-column text-light">
        <h4 class="h4">{{ $t("footer.quickLinks") }}</h4>
        <a href="https://www.presidence.dj/" target="_blank" rel="noopener" class="text-light">{{ $t("links.presidency") }}</a>
        <a href="https://primature.gouv.dj/" target="_blank" rel="noopener" class="text-light">{{ $t("links.primature") }}</a>
        <a href="http://www.met.dj/" target="_blank" rel="noopener" class="text-light">{{ $t("links.ministry") }}</a>
        <a href="#" class="text-light">{{ $t("links.airport") }}</a>
        <a href="https://www.air-djibouti.com/" target="_blank" rel="noopener" class="text-light">{{ $t("links.airDjibouti") }}</a>
        <a href="https://www.lanation.dj/" target="_blank" rel="noopener" class="text-light mb-5">{{ $t("links.laNation") }}</a>

        <router-link to="/login" v-show="!isLoggedIn">
          <a class="btn btn-group text-light small btn-secondary">{{ $t("common.login") }}</a>
        </router-link>
      </div>
    </div>

    <div class="row copyright">
      <div class="col-12 text-center medium text-light pb-3">
        {{ $t("footer.copyright", { year: currentYear }) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    // NOTE: les deux anciens footers testaient des champs différents
    // (user.id vs user._id). On normalise ici — vérifie dans ton module
    // store `user.js` quel champ existe réellement et garde le bon.
    isLoggedIn() {
      const u = this.user || {};
      return Boolean(u.id || u._id);
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/main.scss";

.footer {
  background: linear-gradient(90deg, rgba(0, 212, 255, 1) 40%, rgba(25, 0, 255, 0.44) 89%);
}
.copyright {
  background: linear-gradient(90deg, rgba(86, 255, 0, 1) 40%, rgba(0, 138, 255, 0.44) 89%);
}
.logo {
  width: 200px;
  @include respond(tablet-land) {
    width: 100px;
  }
}

/* En arabe, on aligne le pied de page à droite */
:global(html[dir="rtl"]) .app-footer {
  text-align: right;
}
</style>
