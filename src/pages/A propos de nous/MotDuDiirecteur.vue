<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">Mot du directeur</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>A propos de nous</span>
          <span> / Mot du directeur</span>
        </div>
        <div class="col-md-4 sideMenu">
          <SideMenuS1 :apropo="apropo"></SideMenuS1>
        </div>
        <div class="col-12 col-md-8">
          <v-card
     class="ceo mx-auto">
                <v-img
                  src="../../assets/DG.jpg"
                  class="img-fluid"
                 cover
                >

                </v-img>
                <v-card-title>Daoud Ali Abdou</v-card-title>
                <v-card-subtitle >
                  Directeur de l'Autorité de l'aviation civile de
                    Djibouti
    </v-card-subtitle>

          </v-card>
          <div class="justify">
            <p>
              La barre des 4 milliards de passagers transportés dans le monde a
              été atteinte pour la première fois en 2017, soit 127 passagers qui
              prennent un avion chaque seconde. Face à la croissance
              exponentielle du transport aérien considéré comme le mode de
              transport le plus sûr au monde, les Etats doivent mettre en place
              une législation aéronautique de base et des règlements
              aéronautiques avec des procédures qui en découlent les plus
              exhaustives possible afin d’assurer la sécurité et la sûreté de
              l’aviation civile.
            </p>
            <p>
              A Djibouti, l'Autorité de l'Aviation Civile (AAC) est chargée de
              la mise œuvre de la politique aéronautique nationale, notamment de
              la règlementation et du contrôle de l'aviation civile, en matière
              de sécurité et de sûreté. Son objectif est de veiller à une
              utilisation sûre et ordonnée de l'aviation civile en République de
              Djibouti.
            </p>
            <p>
              C’est dans cette optique que l’AAC a mis en place un système
              national d’aviation civile viable et efficient afin de maintenir
              un haut niveau de sécurité et de sûreté du transport aérien qui
              constitue la préoccupation majeure de cette institution. L’AAC a
              mis en place la règlementation aéronautique nationale et assure la
              surveillance de l’ensemble de l’industrie aéronautique
              (opérateurs, personnels navigants, contrôleurs aériens,
              industriels, etc.).
            </p>
            <p>
              Pour atteindre ses objectifs et ses missions liés à la supervision
              de la sécurité et de la sûreté de l’aviation civile, l’AAC s’est
              dotée de moyens humains et financiers en adéquation avec ses
              activités. Elle s’est dotée aujourd’hui d’un arsenal juridique en
              phase avec les normes et pratiques recommandées de l’Organisation
              de l’Aviation Civile Internationale (OACI). Ainsi, elle est régie
              par le Code de l’Aviation Civile renforcé par la règlementation
              aéronautique de Djibouti (RAD) et des procédures sur lesquelles
              sont réalisées toutes les activités au quotidien.
            </p>
            <p>
              Dans la droite lignée de ses objectifs, l’AAC a donné une priorité
              au recrutement de jeunes cadres et a entrepris un vaste programme
              de formation de son personnel technique avec la définition de
              plans de formation qui permet de savoir le profil, le niveau et
              l’évolution future du personnel de l’AAC et même de prévoir des
              éventuelles nécessités de recrutements.
            </p>
            <p>
              Afin d’assurer de manière continue la supervision de la sécurité
              et de la sûreté, L’AAC a mis en place un calendrier programmé
              d’audit, d’inspections de son industrie mais également fixé un
              nombre important d’inspections inopinées des exploitants nationaux
              et étrangers présents sur notre plateforme pour apprécier si le
              travail est réalisé tel que dicté par la règlementation nationale.
            </p>
            <p>
              Le secteur du transport aérien étant très concurrentiel, l’AAC
              traite aussi de questions d’ordre économique et sociale en
              assurant également des fonctions de régulateur du transport
              aérien. Elle se retrouve ainsi être l’interlocuteur privilégié des
              compagnies aériennes et des aéroports.
            </p>
            <p>
              Ce site web va permettre de faire connaitre nos missions, de
              faciliter l’accès à la règlementation à l’industrie et aux
              particuliers qui souhaitent connaitre les pré-requis pour obtenir
              des privilèges liés à la certification ou à la délivrance des
              licences et même initier les plus jeunes au secteur du transport
              aérien.
            </p>
            <p>Je vous souhaite une bonne navigation sur notre page !</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuS1 from "../../components/SideMenuSousCategoryOne.vue";
export default {
  components: {
    SideMenuS1,
  },
  metaInfo() {
    // if no subcomponents specify a metaInfo.title, this title will be used
    return {
      title: "Mot du directeur",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            " Mot du directeur de l'aviation civile de djibouti, Mr. Daoud Ali Abdou est le directeur par interim de l'Autorité de l'Aviation Civile de Djibouti",
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
@import "../../sass/main.scss";

.justify {
  text-align: justify;
  margin-top: 2rem;
}
@media (min-width: 500px) and (max-width: 769px) {
  .title-box {
    max-height: 25vh;

    .title {
      bottom: 5vh;
      left: 5vh;
      font-size: 1.5rem !important;
    }
  }
  .sideMenu {
    display: none;
  }
}

@media (min-width: 1020px) and (max-width: 1500px) {
  .title-box {
    max-height: 25vh;

    .title {
      bottom: 5vh;
      left: 5vh;
    }
  }
}

@media (max-width: 499px) {
  .title-box {
    max-height: 15vh;

    .title {
      font-size: 1rem !important;
    }
  }
  .ceo {
    max-width: 100% !important;
  }
  .sideMenu {
    display: none;
  }
}

.title-box {
  position: relative;
  height: 40vh;
  background-image: url("../../assets/article.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .title {
    position: absolute;
    bottom: 1vh;
    left: 1vh;
    font-size: 2rem;
    text-transform: uppercase;
    color: white;
  }

  .title-img {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 50vh;
    min-width: 100%;
  }
}

.ceo {
  width: 500px;
}

p {
  margin-bottom: 1rem;
}
</style>
