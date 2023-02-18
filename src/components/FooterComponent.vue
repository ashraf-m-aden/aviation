<template>
  <div class="container-fluid">
    <div class="row bg-info pt-5 pb-5">
      <div class="col-12 col-md-4 text-light d-flex flex-column">
        <a class="navbar-brand img-fluid mb-2" href="#">
          <img src="../assets/casa.png" alt="logo" class="img-fluid logo" />
        </a>
        <h1>
          <strong class="text-light"
            >Autorité de l'aviation civile de Djibouti</strong
          >
        </h1>
        <p>
          Réglementation et supervision de la sécurité et de la sûreté de
          l'aviation.
        </p>
      </div>
      <div class="col-12 col-md-4 text-light">
        <h2 class="h4">Siège social</h2>
        Aéroport international de Djibouti (Ambouli) <br />
        Autorité de l'aviation civile<br />
        <font-awesome-icon :icon="['fas', 'phone']" />
        +253 21 335100 <br />
        <font-awesome-icon :icon="['fas', 'fax']" />
        +253 21 340169 <br />
        <font-awesome-icon :icon="['fas', 'inbox']" />
        2609 <br />
        <font-awesome-icon :icon="['fas', 'envelope']" />
        civilaviation@intnet.dj
      </div>
      <div class="col-12 col-md-4 d-flex flex-column text-light">
        <h4 class="h4">Liens rapides</h4>
        <a href="https://www.presidence.dj/" target="_blank" class="text-light"
          >Presidence de la République</a
        >
        <a href="https://primature.gouv.dj/" target="_blank" class="text-light"
          >Primature</a
        >
        <a href="http://www.met.dj/" target="_blank" class="text-light"
          >Ministere de l'equipements et des transports</a
        >
        <a href="#" class="text-light">Aeroport de Djibouti</a>
        <a href="#" class="text-light"> Air Djibouti </a>
        <a href="#" class="text-light mb-5"> La nation </a>

        <router-link to="/login" v-show="!user._id">
          <a class="btn btn-group text-light small btn-secondary">Sign In</a>
        </router-link>
      </div>
    </div>
    <div class="row bg-success">
      <div class="col-12 text-center medium text-light pb-3">
        Autorité de l'Aviation Civile de Djibouti © 2023
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style lang="css" scoped>
@media (min-width: 770px) {
  .logo {
    width: 200px;
  }
}

@media (max-width: 769px) {
  .logo {
    width: 100px;
  }
}
</style>
