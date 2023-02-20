<template>
  <div class="container-fluid">
    <v-app class="app mt-5" app>
      <HeaderComp class="header" v-if="lang == 'french'"></HeaderComp>
      <HeaderEng class="header" v-else></HeaderEng>
      <router-view />

      <FooterComp class="mt-5" v-if="lang == 'french'"></FooterComp>
      <FooterEng class="mt-5" v-else></FooterEng>
    </v-app>
  </div>
</template>
<script>
import HeaderComp from "./components/HeaderComponent.vue";
import HeaderEng from "./components/HeaderEng.vue";
import FooterComp from "./components/FooterComponent.vue";
import FooterEng from "./components/FooterEng.vue";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Aviation Civile de Djibouti",
    titleTemplate: "%s | Autorité de l'Aviation Civile de Djibouti | AACD",

    bodyAttrs: {
      class: ["dark-mode", "mobile"],
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        "http-equiv": "Content-Type",
        content: "text/html; charset=utf-8",
      },
      {
        vmid: "description",
        name: "description",
        content:
          "Autorité de l'Aviation Civile de Djibouti, aviation civile de djibouti, djibouti civil aviation, djibouti aviation, djibouti regulation aviation",
      },
      {
        vmid: "keywords",
        name: "keywords",
        content:
          "Autorité de l'Aviation Civile de Djibouti, aviation civile de djibouti, djibouti civil aviation",
      },
    ],
  },
  components: {
    HeaderComp,
    HeaderEng,
    FooterComp,
    FooterEng,
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
  },
  mounted() {
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getNews");
    this.$store.dispatch("setDocuments");
    this.$store.dispatch("setPublicDocuments");
    this.$store.dispatch("fetchCategory");
    this.$store.dispatch("fetchSubCategoryOne");
    this.$store.dispatch("fetchSubCategoryTwo");
    this.$store.dispatch("getUser");
    //  $('html').css('overflow', 'hidden');
  },
};
</script>
<style lang="scss">
.container {
  background-color: white;
}
</style>
