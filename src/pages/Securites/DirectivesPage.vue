<template>
  <div class="container">
    <div class="row">
      <div class="col-12 m-5">
        <span>{{ b1 }}</span>
        <span> / {{ b2 }}</span>
        <span v-show="b3 !== ''"> / {{ b3 }}</span>
      </div>
      <div class="col-md-4 sideMenu">
        <Menu :menu="menu"></Menu>
      </div>
      <div class="col-12 col-md-8">
        <h3>Directives</h3>

        <div class="m-5 p5 d-flex flex-column align-items-center">
          <input
            type="text"
            class="border-danger w-50 search input"
            placeholder="Search"
            v-on:keyup.enter="search"
            v-on:keyup.delete="enleve"
          />
          <div class="card result w-100 mt-2" v-show="searchResults.length > 0">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Titre</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in searchResults" :key="index">
                  <td>{{ item.name }}</td>
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

        <div class="table card">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titre</th>
                <th scope="col">Date de parution</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in sortedDocuments" :key="index">
                <th><img src="../../assets/pdf.png" width="20" alt="" /></th>
                <td>{{ item.name }}</td>
                <td>{{ item.createdAt }}</td>
                <td>
                  <a :href="item.src" target="_blank"
                    ><button>Download</button></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {   

  metaInfo() {
    const category = this.b2;
    return {
      title() {
        return "Directives - " + category;
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "Toutes les directives relatives à: " + category,
        },
      ],
    };
  },

  data() {
    return {
      searchResults: [],
      idDirectives: "",
      menu: [],
      errorSearch: "",
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
        let sorted = this.documents.filter((doc) => {
          return doc.idParent == this.$route.params.id;
        });
        return sorted;
      } else {
        let sorted = this.documents.filter((doc) => {
          return doc.idParent == this.$route.params.id;
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
    fetchBreadCrumb() {
      this.$store.state.category.subCategoryTwo.forEach((subTwo) => {
        if (subTwo._id === this.$route.params.id) {
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
        (element) => element._id === this.$route.params.id
      );
      this.$store.state.category.subCategoryTwo.forEach((sub) => {
        if (sub.idParent === subTwo[0].idParent) {
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

<style lang="css" scoped>
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
