<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">{{ b2 }} </h1>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>{{ b1 }}</span>
          <span> / {{ b2 }}</span>
        </div>
        <div class="col-md-4 sideMenu border">
          <SideMenuS1 :menu="menu" :apropo="false"></SideMenuS1>
        </div>
        <div class="col">
          <div class="row">
            <div
              class="col-12 col-md-4"
              v-for="(item, index) in subCategory"
              :key="index"
            >
              <router-link
                :to="{
                  path: this.$route.path+'/'+item.name,
                query: { id: item._id, category:this.$route.path },
                }"
              >
                <div class="card text-left">
                  <img
                    v-show="b1 == 'Securité'"
                    class="card-img-top"
                    src="../assets/safety.png"
                    alt=""
                  />
                  <img
                    v-show="b1 == 'Sureté'"
                    class="card-img-top"
                    src="../assets/security.png"
                    alt=""
                  />
                  <img
                    v-show="b1 !== 'Securité' && b1 !== 'Sureté'"
                    class="card-img-top"
                    src="../assets/safety_and_security.png"
                    alt=""
                  />
                  <div class="card-body">
                    <h4 class="card-title">{{ item.name }}</h4>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuS1 from "../components/SideMenuSousCategoryOne.vue";
export default {
  components: {
    SideMenuS1,
  },
  metaInfo() {
    const description = this.subOne.description;
    const name = this.subOne.name;
    return {
      title() {
        return name;
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: description,
        },
      ],
    };
  },
  data() {
    return {
      menu: [],
      subOne: {},
      sub: [],
    };
  },
  computed: {
    subCategory() {
      let subtwo = this.$store.state.category.subCategoryTwo;
      if (subtwo.length > 0) {
        let sorted = subtwo.filter((doc) => {
          return (doc.idParent == this.$route.query.id && doc.isPublic);
        });
        return sorted;
      } else {
        let sorted = subtwo.filter((doc) => {
          return (doc.idParent == this.$route.query.id && doc.isPublic);
        });

        return sorted;
      }
    },
    b1() {
      return this.$store.state.category.breadCrumb1;
    },
    b2() {
      if (
        this.$store.state.category.subCategoryOne !== [] &&
        this.$store.state.category.category !== []
      ) {
        this.fetchBreadCrumb();
        this.fetchMenu();
      }
      return this.$store.state.category.breadCrumb2;
    },
  },
  methods: {
    fetchBreadCrumb() {
      this.$store.state.category.subCategoryOne.forEach((subOne) => {
        if (subOne._id === this.$route.query.id) {
          this.subOne = subOne;
          this.$store.dispatch("fetchB2", subOne.name);
          this.$store.state.category.category.forEach((cat) => {
            if (cat._id === subOne.idParent) {
              this.$store.dispatch("fetchB1", cat.name);
            }
          });
        }
      });
    },
    fetchMenu() {
      this.menu = [];
      const subOne = this.$store.state.category.subCategoryOne.filter(
        (element) => {
          return element._id === this.$route.query.id;
        }
      );

      this.$store.state.category.subCategoryOne.forEach((sub) => {
        if (sub.idParent == subOne[0].idParent && sub.isPublic) {
          this.menu.push(sub);
        }
      });
    },
  },

  mounted() {
    this.fetchBreadCrumb();
    this.fetchMenu();
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.title-box {
  position: relative;
  height: 40vh !important;
  background-image: url("../assets/article.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @include respond(big-desk) {
    max-height: 25vh;
  }
  @include respond(tablet-land) {
    max-height: 25vh;
    .sideMenu {
      display: none;
    }
  }

  @include respond(tablet) {
    max-height: 25vh;
  }
  @include respond(phone) {
    max-height: 15vh;
  }
  .title {
    position: absolute;
    bottom: 1vh;
    left: 1vh;
    font-size: 2rem;
    text-transform: uppercase;
    color: white;

    @include respond(big-desk) {
      bottom: 5vh;
      left: 5vh;
    }
    @include respond(tablet-land) {
      max-height: 25vh;
      .sideMenu {
        display: none;
      }
    }

    @include respond(tablet) {
      bottom: 5vh;
      left: 5vh;
      font-size: 1.5rem !important;
    }
    @include respond(phone) {
      font-size: 1rem !important;
    }
  }

  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 50vh;
    min-width: 100%;
  }
}
</style>
