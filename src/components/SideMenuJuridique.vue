<template>
  <div class="border-right">
    <ul class="list-group text-left">
      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Lois',
            query: { id: '6035f30ea713263cf8a98c51' },
          }"
          >Lois
        </router-link>
      </li>
      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Décrets',
            query: { id: '6035f317a713263cf8a98c52' },
          }"
          >Décrets
        </router-link>
      </li>
      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Arrêtés',
            query: { id: '6035f32ca713263cf8a98c53' },
          }"
          >Arrêtés
        </router-link>
      </li>
      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Règlements',
            query: { id: '6035f337a713263cf8a98c54' },
          }"
          >Règlements
        </router-link>
      </li>

      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Procédures',
            query: { id: '6035f350a713263cf8a98c57' },
          }"
          >Procédures
        </router-link>
      </li>

      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Directives',
            query: { id: '6035f35da713263cf8a98c59' },
          }"
          >Directives
        </router-link>
      </li>
      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Circulaires',
            query: { id: '6035f362a713263cf8a98c5a' },
          }"
          >Circulaires
        </router-link>
      </li>
      <li class="list-group-item">
        <router-link
          class="path"
          :to="{
            path: '/Juridiques/Politiques',
            query: { id: '6035f347a713263cf8a98c56' },
          }"
          >Politiques
        </router-link>
      </li>

      <!-- End Level two -->
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
