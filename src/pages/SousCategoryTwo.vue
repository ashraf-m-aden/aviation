<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">{{ b3 }}</h1>
          </div>
        </div>
      </div>

      <div class="row">
        <BreadCrumbs :b1="b1" :b2="b2" :b3="b3"></BreadCrumbs>
        <div class="col-md-4 sideMenu">
          <SideMenuS2 :menu="menu"></SideMenuS2>
        </div>
        <div class="col-12 col-md-8">
          <div class="m-5 p5 d-flex flex-column align-items-center">
            <!-- <input
              type="text"
              class="form-control  search "
              placeholder="Search"
              v-on:keyup.enter="search"
              v-on:keyup.delete="enleve"
            /> -->
            <v-text-field
              label="Rechercher"
              class=" search"
              v-on:keyup.enter="search"
              v-on:keyup.delete="enleve" :loading="loading"
            ></v-text-field>
            <div
              class="card result mt-2 table"
              v-show="searchResults.length > 0"
            >
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Resutats de la recherche</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <tr v-for="(item, index) in searchResults" :key="index">
                    <td>
                      <li>
                        <a :href="item.src" target="_blank">{{ item.name }}</a>
                      </li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span
              class="border-bottom border-danger"
              v-show="errorSearch !== ''"
              >{{ errorSearch }}</span
            >
          </div>

          <div class="table">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Titre</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sortedDocuments" :key="index">
                  <td>
                    <li>
                      <a :href="item.src" target="_blank">{{ item.name }}</a>
                    </li>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuS2 from "../components/SideMenuSousCategoryTwo";
import BreadCrumbs from "../components/BreadCrumbs";
export default {
  metaInfo() {
    const subTwo = this.subTwo;
    return {
      title() {
        return subTwo.name;
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: subTwo.description,
        },
      ],
    };
  },
  components: {
    SideMenuS2,
    BreadCrumbs,
  },
  data() {
    return {
      searchResults: [],
      idDirectives: "",
      menu: [],
      errorSearch: "",
      subTwo: {},
      loading : false,
      arrayForNautique: [
        "5f3aa6cb34512340cc2b8252",
        "5f3aa8fe34512340cc2b825e",
        "5f3aa91c34512340cc2b8264",
        "5f3aa94334512340cc2b826a",
        "5f3aa95b34512340cc2b8270",
        "5f585d9eb1398d47641a5ecd",
        "5f58f66747a3152af4d2e319",
        "5f58f77f47a3152af4d2e31e",
        "5f585a81b1398d47641a5ec8",
        "5f5b37ab638e43228cf0a56e",
        "5f5b409c638e43228cf0a573",
        "d2Bnp1Jr4f6Xy807zogw",
        "n33qsnbVKKsWQ2LcDIdX",
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.sortedDocuments.length / this.itemsPerPage);
    },
    b1() {
      return this.$store.state.category.breadCrumb1;
    },
    b2() {
      return this.$store.state.category.breadCrumb2;
    },
    b3() {
      if (this.$store.state.category.subCategoryTwo !== []) {
        this.fetchBreadCrumb();
        this.fetchMenu();
      }
      return this.$store.state.category.breadCrumb3;
    },
    documents() {
      let docs = this.$store.state.documents.publicDocuments.filter((docs) => {
        return !docs.isIntern;
      });
      return docs;
    },
    sortedDocuments() {
      if (this.documents.length > 0) {
        if (this.b3 === "Reglementation aéronautique de Djibouti") {
          // cette partie est reservé uniquement pour regrouper tous les documents de reglements dans cette section
          let sorted = this.documents.filter((doc) => {
            return this.arrayForNautique.includes(doc.idParent);
          });
          return sorted;
        } else {
          // c'est pour le reste
          let sorted = this.documents.filter((doc) => {
            return doc.idParent === this.$route.query.id;
          });
          return sorted;
        }
      } else {
        if (this.b3 === "Reglementation aéronautique de Djibouti") {
          // cette partie est reservé uniquement pour regrouper tous les documents de reglements dans cette section
          let sorted = this.documents.filter((doc) => {
            return this.arrayForNautique.includes(doc.idParent);
          });
          return sorted;
        } else {
          // c'est pour le reste
          let sorted = this.documents.filter((doc) => {
            return doc.idParent === this.$route.query.id;
          });
          return sorted;
        }
      }
    },
  },
  methods: {
    search(event) {
      this.loading = true;

      this.searchResults = [];
      const nameFile = event.target.value.toLowerCase().trim();
      if (nameFile !== "") {
        this.sortedDocuments.forEach((doc) => {
          const docName = doc.name.toLowerCase().trim();
          if (docName.includes(nameFile)) {
            this.searchResults.push(doc);
          }
        });
        if (this.searchResults.length < 1) {
          this.errorSearch = "Pas de resultat pour '" + nameFile + "'";
        }
      }

    },
    enleve() {
      this.searchResults = [];
      this.errorSearch = "";
      this.loading = false;

    },
    fetchBreadCrumb() {
      this.$store.state.category.subCategoryTwo.forEach((subTwo) => {
        if (subTwo._id === this.$route.query.id) {
          this.subTwo = subTwo;
          this.$store.dispatch("fetchB3", subTwo.name);
          this.$store.state.category.subCategoryOne.forEach((subOne) => {
            if (subOne._id === subTwo.idParent) {
              this.$store.dispatch("fetchB2", subOne.name);
              this.$store.state.category.category.forEach((cat) => {
                if (cat._id === subOne.idParent) {
                  this.$store.dispatch("fetchB1", cat.name);
                }
              });
            }
          });
        }
      });
    },
    fetchMenu() {
      this.menu = [];
      const subTwo = this.$store.state.category.subCategoryTwo.filter(
        (element) => element._id === this.$route.query.id
      );
      this.$store.state.category.subCategoryTwo.forEach((sub) => {
        if (sub.idParent === subTwo[0].idParent && sub.isPublic) {
          this.menu.push(sub);
        }
      });
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
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

.container-fluid {
  margin-bottom: 300px;
}
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
.search {
  width: 100%;
}
.table-footer {
  border-top: solid 1px grey;
  padding-top: 2rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.table {
  max-height: 500px;
  overflow-y: scroll;
}
</style>
