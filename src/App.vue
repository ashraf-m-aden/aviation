<template>
  <div class="container-fluid app">
    <div class="row">
      <div class="col-12">
        <HeaderComp class="header"></HeaderComp>
        <!-- <HeaderEng class="header" v-else></HeaderEng> -->
        <router-view />
        <FooterComp class="mt-5"></FooterComp>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderComp from "./components/NewHeader.vue";
// import HeaderEng from "./components/HeaderEng.vue";
import FooterComp from "./components/FooterComponent.vue";
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
    // HeaderEng,
    FooterComp,
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
/* Hide scrollbar for Chrome, Safari and Opera */
.container-fluid::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.container-fluid {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
} /* Firefox */
</style>
