<template>
  <div class="col-12 breadcumbs">
          {{ b1 }}
           / {{ b2 }}
          <p class="inline b3" v-if="b3"> / {{ b3 }}</p>
        </div>
</template>

<script>
export default {

  data() {
    return {};
  },
  props: ["b1","b2","b3"],
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.breadcumbs{
  margin-top: 100px;
  margin-bottom: 50px;
  font-weight: 500;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-style: italic;

  .b3 {
    display: inline;
  }
}
</style>
