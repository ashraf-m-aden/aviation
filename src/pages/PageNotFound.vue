<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <div
      class="d-flex flex-column fill-height justify-center align-center text-white"
    >
      <div class="error-content">
        <div class="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h3>404 - Page inexistante</h3>
        <p>
          La page que vous cherchez est soit inexistante soit temporairement
          indisponible.
        </p>
        <a href="/" class="btn btn-primary">Aller à l'acceuil</a>
      </div>
    </div>
  </v-parallax>
</template>
<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "404",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Page non trouvée",
      },
    ],
  },
};
</script>
<style lang="scss" scoped>
@import "../sass/main.scss";
.page {
  background-image: url("../assets/Terminal-Container-Night-View.jpeg");
  width: 100%;
  height: 100vh;
}
</style>
