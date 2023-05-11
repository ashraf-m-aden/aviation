<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">Politique de Formation</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>A propos de nous</span>
          <span> / Politique de formation</span>
        </div>
        <div class="col-md-4 sideMenu">
          <SideMenuS2 :apropo="apropo"></SideMenuS2>
        </div>
        <div class="col-12 col-md-8 justify">
          <h1 class="h3 title">POLITIQUE ET ENGAGEMENT DU DIRECTEUR GENERAL</h1>

          <p>
            Notre capacité de supervision de la sécurité et de la sureté ne peut
            être effective, efficace et s’améliorer continuellement que grâce à
            l’établissement des conditions optimums de connaissances et
            d’expériences pour l’ensemble du personnel de l’AAC à travers des
            formations initiales (formations de base), spécialisées, en cours
            d’emploi (FCE /OJT) et la continues (périodiques ou recyclages), et
            qualifications adéquates
          </p>

          <p>
            Ces formations planifiées permettent d’avoir un personnel bien
            formé, disposant d’une part d’un niveau de connaissance normalisées,
            et d’autre part d’un niveau de qualifications et d’expériences le
            plus haut possible. Ces compétences acquises permettent d’élaborer
            et de contrôler efficacement l’application de la réglementation
            nationale en vigueur en matière de sécurité, de sureté, de la
            facilitation et d’environnement dans le domaine de l’aviation
            civile.
          </p>

          <p>A cet effet, Le Directeur Général s’engage à :</p>
          <ul>
            <li>
              mettre en œuvre un plan de formation, assurer sa gestion pour
              toutes les spécialités de manière à répondre aux normes de l’OACI
              et aux évolutions technologiques du secteur de l’aviation civile.
            </li>
            <li>
              promouvoir au sein de l’AAC une culture de compétence et
              d'apprentissage essentielle à l'accomplissement de ses missions et
              attributions en tant qu’Autorité nationale en charge de la
              supervision de la sécurité et de la sûreté de l’aviation civile en
              République de Djibouti.
            </li>
            <li>
              faire de l’AAC une organisation apprenante et d’excellence qui
              investit dans l'apprentissage initial et continu de ses employés.
            </li>
            <li>
              garantir un plan de formation personnalisé à tous les employés de
              l’Autorité.
            </li>
            <li>
              trouver des moyens pour financer la formation. Le cas échéant, des
              démarches auprès des organismes externes sont entreprises pour le
              financement de la formation.
            </li>
            <li>
              à augmenter les dépenses consacrées à la formation et au
              perfectionnement du personnel après l'entrée en vigueur de la
              présente politique.
            </li>
            <li>
              évaluer le maintien des compétences du personnel et des formateurs
              de l’AAC par des contrôles réguliers, des audits externes avec des
              indicateurs quantifiables ;
            </li>
            <li>
              les progrès du développement de l’AAC en une organisation
              apprenante, vouée à l'apprentissage continu, par le biais
              d'objectifs quantifiables.
            </li>
            <li>
              planifier, recruter, former et parrainer les jeunes cadres pour
              assurer une gestion continue, efficace et effective de la relève
              en tenant compte des départs à la retraite ;
            </li>
            <li>
              créer des conditions attractives de travail pour maintenir et
              attirer du personnel qualifié et éviter la fuite des cerveaux ou
              un taux de roulement inacceptable.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuS2 from "../../components/SideMenuSousCategoryTwo";
export default {
  components: {
    SideMenuS2,
  },
  metaInfo() {
    return {
      title() {
        return "Politique de formation";
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "Politique de formation de l'Aviation Civile de Djibouti",
        },
      ],
    };
  },
  data() {
    return {
      searchResults: [],
      idDirectives: "",
      menu: [],
      apropo: true,
      errorSearch: "",
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
</style>
