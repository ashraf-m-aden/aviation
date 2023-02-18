<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-md-4"
        v-for="(item, index) in subCategory"
        :key="index"
      >
        <router-link
          :to="{
            name: 'Directives',
            params: { id: item._id },
          }"
        >
          <div class="card text-left">
            <img class="card-img-top" src="../../assets/safety.png" alt="" />
            <div class="card-body">
              <h4 class="card-title">{{ item.name }}</h4>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {   

  data() {
    return {
      sub: [],
    };
  },
  computed: {
    subCategory() {
      let subtwo = this.$store.state.category.subCategoryTwo;
      if (subtwo.length > 0) {
        let sorted = subtwo.filter((doc) => {
          return doc.idParent == this.$route.params.id;
        });
        return sorted;
      } else {
        let sorted = subtwo.filter((doc) => {
          return doc.idParent == this.$route.params.id;
        });
        return sorted;
      }
    },
  },
  methods: {
    fetchSub() {},
  },
  mounted() {
    this.sub = this.subCategory.filter((sub) => {
      return (sub.idParent = this.$route.params.id);
    });
  },
};
</script>

<style lang="scss" scoped>
.card-img-top {
  width: 10rem;
}
</style>
