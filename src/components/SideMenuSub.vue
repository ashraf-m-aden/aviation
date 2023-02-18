<template>
  <div class="border-right">
    <ul class="list-group text-left" v-if="!apropo">
      <li class="list-group-item" v-for="(item, index) in menu" :key="index">
        <router-link
          v-if="
            item.name == 'Directives' ||
            item.name == 'Circulaires' ||
            item.name == 'Decisions'
          "
          :to="{ path: '/' + item.name, query: { id: item._id } }"
          class="path"
        >
          {{ item.name }}</router-link
        >
        <router-link
          v-else
          :to="{ path: '/Categorie/' + item.name, query: { id: item._id } }"
          class="path"
        >
          {{ item.name }}</router-link
        >
      </li>
    </ul>

    <ul class="list-group text-left" v-else>
      <li class="list-group-item">
        <router-link :to="{ path: '/Mot du directeur' }" class="path">
          Mot du directeur</router-link
        >
      </li>
      <li class="list-group-item">
        <router-link :to="{ path: '/Presentation' }" class="path">
          Presentation</router-link
        >
      </li>
      <li class="list-group-item">
        <router-link :to="{ path: '/Organisation' }" class="path">
          Organisation</router-link
        >
      </li>
      <li class="list-group-item">
        <router-link :to="{ path: '/Politique de Formation' }" class="path">
          Politique de formation</router-link
        >
      </li>
      <li class="list-group-item">
        <router-link :to="{ path: '/Politique de Supervision' }" class="path">
          Politique de supervision</router-link
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
  props: ["apropo", "menu"],
};
</script>

<style lang="scss" scoped>
.list-group .list-group-item {
  border: none;
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
