<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">Presentation</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <BreadCrumbs
          :b1="'A propos de nous'"
          :b2="'Presentation'"
        ></BreadCrumbs>
        <div class="col-md-4 sideMenu">
          <SideMenuS1 :apropo="apropo"></SideMenuS1>
        </div>
        <div class="col-12 col-md-8 justify">
          <h1 class="h3 title">Presentation</h1>
          <p>
            L'Autorité de l'Aviation Civile (AAC), créée conformément à la Loi
            n°108/AN/10/6èmeL du 10 janvier 2011, est un établissement public
            administratif, rattaché au Ministère de l’Equipement et des
            Transports en République de Djibouti. Elle est chargée de la mise en
            œuvre de la politique aéronautique nationale, notamment de la
            règlementation et de la supervision de l'aviation civile, en matière
            de sécurité, de sûreté, de la protection de l’environnement et
            d'économie. Son objectif est de veiller au développement sûr,
            ordonné et efficient de l'aviation civile en République de Djibouti.
          </p>
          <p>
            Cette création a répondu au souci du gouvernement Djiboutien de
            mettre son aviation civile au standard de l’Organisation de
            l’Aviation Civile Internationale (OACI) qui préconise la cession de
            la gestion de l’aviation civile à des organismes autonomes à l’image
            de ce qui se fait déjà dans plusieurs pays environnants.
          </p>
          À cet effet, l'Autorité de l'Aviation Civile (AAC) est chargée :
          <ul class="one">
            <li class="">
              d’assister le Gouvernement dans la définition et la conduite de la
              politique aéronautique nationale en tenant compte des besoins du
              pays mais aussi des normes et des conventions internationales ;
            </li>
            <li class="">
              d’exécuter la politique de l’Etat en matière d’aviation civile ;
            </li>
            <li class="">
              d’élaborer et de gérer le programme national de sécurité et le
              programme national de sureté de l’aviation civile, en
              collaboration et en coordination avec les parties concernées,
            </li>
            <li class="">
              d'établir la réglementation, en suivre l'exécution et l'évolution
              en élaborant les amendements appropriés; comme responsable du
              contrôle et de la coordination de l'application de la
              réglementation nationale et des conventions internationales
              ratifiées par la République de Djibouti quant à la sécurité
              aérienne et à la sureté de l’aviation civile et de l'efficacité du
              transport aérien ;
            </li>
            <li class="">
              de définir des doctrines concernant le recrutement, la formation
              et l'emploi des personnels techniques, chargés d'assurer la
              régularité et la sécurité du trafic aérien, d'organiser et
              d'assumer la formation aéronautique ;
            </li>
            <li class="">
              d’assurer la supervision et la certification des organes et du
              personnel aéronautique de la navigation aérienne, notamment :
              <ul class="two">
                <li class="">des exploitants aériens,</li>
                <li class="">
                  des organismes de sûreté et de sécurité aérienne,
                </li>
                <li class="">
                  des organismes de gestion des espaces aériens et des
                  aéroports,
                </li>
                <li class="">des organismes de maintenance des avions,</li>
                <li class="">des aéronefs,</li>
                <li class="">
                  des personnels techniques d’entretien et des navigants
                  aériens.
                </li>
              </ul>
            </li>
            <li class="">
              de superviser la fourniture de l'assistance météorologique;
            </li>
            <li class="">
              de superviser la fourniture de service de la navigation aérienne;
            </li>
            <li class="">
              de participer à tous travaux et négociations à caractère
              international concernant l'aviation civile, d'assister et
              conseiller le Gouvernement dans la négociation des accords
              internationaux;
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuS1 from "../../components/SideMenuSousCategoryOne.vue";
import BreadCrumbs from "../../components/BreadCrumbs";

export default {
  components: {
    SideMenuS1,
    BreadCrumbs,
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Présentation",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Présentation Autorité de l'Aviation Civile de Djibouti",
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
p {
  margin-bottom: 2rem;
}
.one {
  list-style: square;
  list-style-type: disc;
}
.two {
  list-style: circle;
  margin-left: 1rem;
}
li {
  margin-left: 3rem;
}
</style>
