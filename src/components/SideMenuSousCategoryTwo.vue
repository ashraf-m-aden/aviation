<template>
  <div class="border-right">
    <ul class="list-group">
      <li class="list-group-item" v-for="(item, index) in menu" :key="index">
        <router-link v-if="this.$route.query.category=='eservice'"
        :to="{ path: '/'+this.$route.query.category+'/'+ item.name, query: { category:this.$route.query.category } }"
          class="path"
        >
          {{ item.name }}</router-link
        >
        <router-link v-else
        :to="{ path: this.$route.query.category+'/'+ item.name, query: { id: item._id, category:this.$route.query.category } }"
          class="path"
        >
          {{ item.name }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  data() {
    return {};
  },
  props: ["menu"],
};
</script>

<style lang="scss" scoped>
.list-group .list-group-item {
  border: none;
  &:hover{
 text-transform: capitalize;
  }
}

.card {
  height: 100%;
}

.path {
  display: block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  color: black !important;
  text-decoration-style: none;
  border-radius: 10%;

  // &:hover {
  //   background-image: linear-gradient(
  //     to right bottom,
  //     rgb(4, 133, 184),
  //     rgb(4, 184, 73)
  //   );
  //   color: transparent;
  //   transition: all 0.3s;
  //   font-size: 1.2rem;
  //   color: white !important;
  // }
}
</style>
