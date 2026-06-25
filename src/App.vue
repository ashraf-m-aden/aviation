<template>
  <div class="container-fluid app">
    <div class="row">
      <div class="col-12">
        <NotificationComponent></NotificationComponent>
        <AppHeader v-if="!isAdminArea" class="header"></AppHeader>
        <router-view />
        <AppFooter v-if="!isAdminArea" class="mt-5"></AppFooter>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import NotificationComponent from "./components/NotificationComponent.vue";

export default {
  metaInfo: {
    title: "Aviation Civile de Djibouti",
    titleTemplate: "%s | Autorité de l'Aviation Civile de Djibouti | AACD",
    bodyAttrs: {
      class: ["dark-mode", "mobile"],
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
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
    AppHeader,
    AppFooter,
    NotificationComponent,
  },
  computed: {
    isAdminArea() {
      return this.$route.path.startsWith("/admin");
    },
  },
  created() {
    this.$store.dispatch("fetchPublicNavigation");
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
  },
};
</script>

<style lang="scss">
.container {
  background-color: white;
}
.container-fluid::-webkit-scrollbar {
  display: none;
}
.container-fluid {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
