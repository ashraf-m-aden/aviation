<template>
  <div class="page"></div>
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
