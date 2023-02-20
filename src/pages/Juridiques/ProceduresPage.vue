<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">Procédures</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>Administration et Affaires Juridiques</span>
          <span> / Procédures</span>
        </div>
        <div class="col-md-4 sideMenu">
          <Menu :menu="menu"></Menu>
        </div>
        <div class="col-12 col-md-8">
          <div class="m-5 p5 d-flex flex-column align-items-center">
            <input
              type="text"
              class="form-control border-danger w-100 search input"
              placeholder="Search"
              v-on:keyup.enter="search"
              v-on:keyup.delete="enleve"
            />
            <div class="card result mt-2" v-show="searchResults.length > 0">
              <table class="table table-striped">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">Titre</th>
                  </tr>
                </thead>
                <tbody>
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
import Menu from "../../components/SideMenuJuridique.vue";
export default {
  metaInfo() {
    return {
      title() {
        return "Procédures";
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "Toutes les procédures relatives aux affaires juridiques ",
        },
      ],
    };
  },
  components: {
    Menu,
  },
  data() {
    return {
      searchResults: [],
      idDirectives: "",
      menu: [],
      errorSearch: "",
      subTwo: {},
      sortDesc: false,
      page: 1,
      sortBy: "name",
      itemsPerPage: 6,
      itemsPerPageArray: [4, 8, 12],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.sortedDocuments.length / this.itemsPerPage);
    },
    b2() {
      return this.$store.state.category.breadCrumb2;
    },
    documents() {
      let docs = this.$store.state.documents.publicDocuments.filter((docs) => {
        return !docs.isIntern;
      });
      return docs;
    },
    sortedDocuments() {
      if (this.documents.length > 0) {
        let sorted = this.documents.filter((doc) => {
          return doc.idParent === this.$route.query.id;
        });
        return sorted;
      } else {
        let sorted = this.documents.filter((doc) => {
          return doc.idParent === this.$route.query.id;
        });
        return sorted;
      }
    },
  },
  methods: {
    search(event) {
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
    },
    fetchMenu() {
      this.menu = [];
      const subOne = this.$store.state.category.subCategoryOne.filter(
        (element) => element._id === this.$route.query.id
      );
      this.$store.state.category.subCategoryOne.forEach((sub) => {
        if (sub.idParent === subOne[0].idParent) {
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
    this.fetchMenu();
  },
};
</script>

<style lang="scss" scoped>
@import "../../sass/main.scss";
.title-box {
  position: relative;
  height: 40vh !important;
  background-image: url("../../assets/article.jpeg");
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
  border-radius: 100px;
  /* mozilla */
  -moz-border-radius: 100px;
  /* webkit */
  -webkit-border-radius: 100px;
}
.table-footer {
  border-top: solid 1px grey;
  padding-top: 2rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
