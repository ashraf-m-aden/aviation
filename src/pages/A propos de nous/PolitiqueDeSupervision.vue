<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-box">
            <h1 class="title">Politique de supervision</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <span>A propos de nous</span>
          <span> / Politique de supervision</span>
        </div>
        <div class="col-md-4 sideMenu">
          <SideMenuS1 :apropo="apropo"></SideMenuS1>
        </div>
        <div class="col-12 col-md-8 justify">
          <h1 class="h3 title">POLITIQUE DE SUPERVISION</h1>

          <p>
            L’AAC de par ses attributions est garante de la supervision de la
            sécurité et de la sûreté de l'aviation civile. A ce titre et
            conformément aux normes et pratiques recommandées de l'Organisation
            de l'Aviation Civile internationale (OACI), elle se doit de
            surveiller les fournisseurs de services et toute l'industrie
            aéronautique afin de s'assurer que les conditions de délivrance des
            autorisations, licences, certificats et agréments sont maintenues
            dans le respect des règlements aéronautiques en vigueur.
          </p>
          <p>
            La présente politique de surveillance a pour objet de guider les
            activités de surveillance de l' AAC et ce, en application du Code de
            l'Aviation Civile et les autres textes règlementaires relatifs à la
            supervision de la sécurité et de la sûreté de l'aviation civile.
          </p>
          <p>
            La politique de surveillance continue prend également en compte les
            documents de l'OACI ci-après :
          </p>
          <ul>
            <li>Doc 9734 (Manuel de supervision de la sécurité);</li>
            <li>Doc 10047 (Manuel de supervision de la sûreté).</li>
          </ul>
          <p>
            La surveillance continue constitue un des éléments cruciaux du
            système de supervision de la sécurité et de la sûreté institués par
            l'OACI et est intégrée dans les programmes nationaux de sécurité et
            de sûreté de l’aviation civile. Elle présente les fonctions et
            responsabilités des Directions de l’AAC en charge du maintien d'une
            exigence acceptable d'exploitation et de pratiques opérationnelles
            sûres et sécurisées.
          </p>

          <p>
            Elle sert en outre à évaluer le progrès sur l'amélioration continue
            du niveau de la sécurité et de la sûreté implémenté par les
            détenteurs de Certificat, de Licence ou d'Agrément ainsi que sur
            l'efficacité des mesures prises.
          </p>
          <p>
            La politique de surveillance continue est mise en couvre pour
            s'assurer de façon proactive, que les entités chargées de la
            sécurité et de la sûreté continuent de satisfaire aux exigences
            établies et opèrent à un niveau de sécurité et de sûreté acceptable
            par l'AAC.
          </p>

          <p>
            La politique de surveillance continue s'applique à tout le personnel
            de l'AAC engagé dans la conduite ou la gestion des activités de
            surveillance continue relative à la sécurité et à la sureté de
            l'aviation civile à l'égard de l'industrie de l'aviation.
          </p>

          <p>
            Les entités ci-après, sans s'y limiter sont assujetties à la
            surveillance des Directions techniques de l'AAC:
          </p>
          <ul>
            <li>
              Exploitants d'aéronefs nationaux et étrangers desservant les
              plateformes
            </li>
            <li>Exploitants d'aéronefs effectuant des vols commerciaux ;</li>
            <li>
              Exploitants d'aéronefs effectuant des vols d’aviation générale ;
            </li>
            <li>Exploitants d'aérodromes;</li>
            <li>
              Organismes de maintenance et organismes de maintien de la
              navigabilité ;
            </li>
            <li>Organismes de formation aéronautique;</li>
            <li>Centre d'expertise médicale du personnel aéronautique ;</li>
            <li>
              Personnel aéronautique détenteur de licence, qualification,
              certificat ou d'autorisation
            </li>
            <li>Prestataires de services de sureté de l'aviation civile ;</li>
            <li>
              Toutes les entités impliquées dans la chaine de transport des
              marchandises dangereuses.
            </li>
            <li>Opérateurs postaux ;</li>
            <li>Services de fret ;</li>
            <li>
              Transitaires et expéditeurs intervenant sur les plates-formes
              aéroportuaires ;
            </li>
            <li>Prestataires de Services de navigation aérienne ;</li>
            <li>Prestataires de services d'assistance en escale ;</li>
            <li>Prestataires de services carburant et huiles ;</li>
            <li>Prestataires de services de commissariat (catering)</li>
          </ul>
          <p>
            La surveillance continue consiste à évaluer systématiquement la
            capacité et la volonté de l'exploitant à se conformer de manière
            pérenne aux dispositions législatives et réglementaires applicables.
          </p>
          <p>
            La surveillance continue des exploitants est menée de façon ordonnée
            et normalisée pour permettre aux inspecteurs de procéder aux
            vérifications nécessaires. A cette fin, chaque type
            d'inspection/audit comporte des objectifs spécifiques et est
            généralement réalisé, à chaque fois, de la même façon, conformément
            aux instructions et indications.
          </p>
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
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Politique de supervision",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Politique de supervisison de l'Aviation Civile de Djibouti",
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
