<template>
  <div class="row mt-5">
    <div class="col-12 col-md-4">
      <div class="contact">
        <h2 class="h4">Siège sociale</h2>
        Aéroport international de Djibouti (Ambouli) <br />
        Autorité de l'aviation civile<br />
        <font-awesome-icon :icon="['fas', 'phone']" />
        +253 21 335100 <br />
        <font-awesome-icon :icon="['fas', 'fax']" />
        +253 21 340169 <br />
        <font-awesome-icon :icon="['fas', 'inbox']" />
        2609 <br />
        <font-awesome-icon :icon="['fas', 'envelope']" />
        civilaviaton@intnet.dj
      </div>
    </div>
    <div class="col-12 col-md-8 map">
      <Map></Map>
    </div>
  </div>
</template>

<script>
import Map from "../components/MapComponent.vue";
export default {   

  components: {
    Map,
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.contact {
  padding: 2rem;
}
.map {
  padding: 2rem;
}
</style>
