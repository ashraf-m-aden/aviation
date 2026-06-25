<template>
  <div>
    <Carousel></Carousel>
    <Partenaire></Partenaire>

    <div class="row mb-5">
      <div class="col-12 col-md-9 news">
        <h4 class="card-header bg-info">Actualités</h4>
        <div class="row" v-if="news.length > 0">
          <div
            class="col-12 col-md-6 mt-3"
            v-for="(item, index) in news"
            :key="index"
          >
            <News :news="item" :dashboard="true"></News>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <h4 class="card-header bg-info">Points fréquents</h4>
        <div class="popular">
          <ul class="list-group">
            <li class="list-group-item">
              <router-link
                class="router"
                to="/Categorie/Textes reglementaires?id=5f53707658ac040039a1a6c0"
              >
                Textes reglementaires</router-link
              >
            </li>
            <li class="list-group-item">
              <router-link class="router" to="/Legislations/Lois">
                Lois</router-link
              >
            </li>
            <li class="list-group-item">
              <router-link class="router" to="/Demande-d'autorisation-de-vol">
                Demande d'autorisation de vol</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <MAP class="mr-auto ml-auto"></MAP>
    </div>
  </div>
</template>

<script>
import MAP from "../components/MapComponent.vue";
import Carousel from "../components/CarouselComponent.vue";
import News from "../components/NewsComponent.vue";
import Partenaire from "../components/PartenaireComponent.vue";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Acceuil",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Autorité de l'Aviation Civile de Djibouti",
      },
    ],
  },
  computed: {
    news() {
      return this.$store.state.media.allNews;
    },
  },
  components: {
    MAP,
    Carousel,
    Partenaire,
    News,
  },
};
</script>

<style lang="scss">
@import "../sass/main.scss";
.map {
  /* Full height */
  height: 100%;
  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.list-group-item {
  cursor: pointer;
  &:hover {
    background:  linear-gradient(
    90deg,
    rgba(0, 212, 255, 1) 40%,
    rgba(25, 0, 255, 0.4430147058823529) 89%);
    color: white ;
    .router {
      color: white ;
    }
  }

  .router {
    text-decoration: none;
    color: black !important;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
