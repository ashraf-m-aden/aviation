<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">Organisation</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>A propos de nous</span>
          <span> / Organisation</span>
        </div>
        <div class="col-md-4 sideMenu">
          <Menu :apropo="apropo"></Menu>
        </div>
        <div class="col-12 col-md-8 justify">
          <h1 class="h3 title">Organisation</h1>
          <p>
            L'Autorité de l'Aviation Civile est dirigée par un Directeur Général
            qui a sous son autorité un Directeur General Adjoint, un Service et
            Trois Directions :
          </p>
          <ul>
            <li>Le Directeur General Adjoint</li>
            <li>Le Service des Affaires Juridiques</li>
            <li>La Direction Administrative et Financière</li>
            <li>La Direction Normes et Sécurité des vols</li>
            <li>La Direction de la Navigation Aérienne</li>
          </ul>
          <img src="../../assets/orga.png" class="orga" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "../../components/SideMenuSub.vue";
export default {   

  components: {
    Menu,
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Organisation",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Organisation de l'Autorité de l'Aviation Civile de Djibouti",
      },
    ],
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
      apropo: true,
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
  },
  methods: {
    fetchBreadCrumb() {
      this.$store.state.category.subCategoryOne.forEach((subOne) => {
        if (subOne._id === "5f537098522dae004424ab1a") {
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
          return element._id === "5f537098522dae004424ab1a";
        }
      );
      this.$store.state.category.subCategoryOne.forEach((sub) => {
        if (sub.idParent == subOne[0].idParent) {
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
.justify {
  text-align: justify;
}
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

p {
  margin-bottom: 1.5rem;
}
ul {
  list-style: square;
  line-height: 1.7;
  margin-bottom: 2rem;
}
li {
  margin-left: 3rem;
}
.orga {
  width: 100%;
}
</style>
