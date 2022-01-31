import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Dashboard from "../pages/Dashboard.vue";
import Presentation from "../pages/A propos de nous/Presentation.vue";
import Organisation from "../pages/A propos de nous/Organisation.vue";
import MduD from "../pages/A propos de nous/Mot du directeur.vue";
import PdeF from "../pages/A propos de nous/Politique de formation.vue";
import PdeS from "../pages/A propos de nous/Politique de supervision.vue";
import Arretes from "../pages/Publications/Textes reglementaires/Arretes.vue";
import Decrets from "../pages/Publications/Textes reglementaires/Decret.vue";
import Lois from "../pages/Publications/Textes legislatifs/Lois.vue";
import RAD from "../pages/Publications/Textes reglementaires/Reglementation aeronautique de Djibouti.vue";
import AI from "../pages/Publications/Accords/Accords Internationaux.vue";
import AB from "../pages/Publications/Accords/Accords bilaterales.vue";
import DirectiveS from "../pages/Publications/Directives.vue";
import Circulaires from "../pages/Publications/Circulaires.vue";
import Decisions from "../pages/Publications/Decisions.vue";
import Reglements from "../pages/Securites/Reglements.vue";
import Formulaires from "../pages/Securites/Formulaires.vue";
import Guides from "../pages/Securites/Guides.vue";
import Directives from "../pages/Securites/Directives.vue";
import Manuels from "../pages/Securites/Manuels.vue";
import Procedure from "../pages/Securites/Procedures.vue";
import Login from "../pages/Login.vue";
import Docs from "../pages/gestion/GestionDocuments.vue";
import Media from "../pages/gestion/GestionMedia.vue";
import DocIntern from "../pages/gestion/DocumentInternView.vue";
import Contact from "../pages/Contact.vue";
// import Securite from "../pages/Header/securité.vue";
import JurLoi from "../pages/Juridiques/Lois.vue";
import JurDecre from "../pages/Juridiques/Decres.vue";
import JurArre from "../pages/Juridiques/Arretes.vue";
import JurRegle from "../pages/Juridiques/Reglements.vue";
import JurProce from "../pages/Juridiques/Procedures.vue";
import JurDire from "../pages/Juridiques/Directives.vue";
import JurCir from "../pages/Juridiques/Circulaires.vue";
import JurPoli from "../pages/Juridiques/Politiques.vue";
import DA from "../pages/eService/demande_autorisation.vue";
import FCR from "../pages/eService/formulaire_cr.vue";
import AuditInspection from "../pages/inspection/audit_inspection.vue";
import SubMenu from "../pages/SubMenu.vue";
import Article from "../pages/Articles.vue";
import StaffDetails from "../pages/gestion/StaffDetails.vue";
import AIP from "../pages/aip/Publications d'Information Aéronautique.vue";
import PageNotFound from '../pages/PageNotFound.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (to.name === "Login" && localStorage.getItem("token")) {
        next({ alias: ["/"], name: "Dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/staff",
    name: "Staff",
    component: StaffDetails,
    beforeEnter: (to, from, next) => {
      if (to.name === "Staff" && !store.state.user.user.isAdmin) {
        next({ alias: ["/"], name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/gestionDocs",
    name: "Docs",
    component: Docs,
    beforeEnter: (to, from, next) => {
      if (to.name === "Docs" && !store.state.user.user.isAdmin) {
        next({ alias: ["/"], name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/docIntern",
    name: "DocIntern",
    component: DocIntern,
    beforeEnter: (to, from, next) => {
      if (to.name === "DocIntern" && !store.state.user.user._id) {
        next({ alias: ["/"], name: "Login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/gestionMedia",
    name: "Media",
    component: Media,
    beforeEnter: (to, from, next) => {
      if (to.name === "Media" && !store.state.user.user.isAdmin) {
        next({ alias: ["/"], name: "Login" });
      } else {
        next();
      }
    },
  },
  // {
  //   path: "/securite/:id",
  //   name: "Securité",
  //   component: Securite,
  // },
  {
    path: "/aip",
    name: "Publications d'Information Aéronautique",
    component: AIP,
  },
  {
    path: "/Formulaires/:id",
    name: "Formulaires",
    component: Formulaires,
  },
  {
    path: "/Guides/:id",
    name: "Guides",
    component: Guides,
  },
  {
    path: "/Procedures/:id",
    name: "Procedures",
    component: Procedure,
  },
  {
    path: "/Manuels/:id",
    name: "Manuels",
    component: Manuels,
  },
  {
    path: "/Reglements/:id",
    name: "Reglements",
    component: Reglements,
  },
  {
    path: "/Directives",
    alias: ['/Guidelines'],
    name: "DirectiveS",
    component: DirectiveS,
  },
  {
    path: "/Presentation",
    name: "Presentation",
    component: Presentation,
  },
  {
    path: "/Mot du directeur",
    alias: ["/General director's commitment"],
    name: "MduD",
    component: MduD,
  },
  {
    path: "/Organisation",
    alias: ["/Organization"],

    name: "Organisation",
    component: Organisation,
  },
  {
    path: "/Politique de Formation",
    alias: ["/Oversight policy"],
    name: "PdeF",
    component: PdeF,
  },
  {
    path: "/Politique de Supervision",
    alias: ["/Supervion policy"],
    name: "PdeS",
    component: PdeS,
  },
  {
    path: "/Textes reglementaires/Arretes",
    name: "Arretés",
    component: Arretes,
  },
  {
    path: "/Textes reglementaires/Decrets",
    name: "Decrets",
    component: Decrets,
  },
  {
    path: "/Textes reglementaires/Djibouti aeronautical regulations",
    alias: ["/Textes reglementaires/Reglementation aeronautique de Djibouti"],
    name: "Reglementation aéronautique de Djibouti",
    component: RAD,
  },
  {
    path: "/Legislations/Lois",
    name: "Lois",
    component: Lois,
  },
  {
    path: "/Accords/Accords internationaux",
    name: "Accords internationaux",
    component: AI,
  },
  {
    path: "/Accords/Accords bilateraux",
    name: "Accords bilateraux",
    component: AB,
  },
  {
    path: "/Directives/:id",
    alias: ["/Guidelines"],
    name: "Directives",
    component: Directives,
  },
  {
    path: "/Circulaires",
    alias: ["/Circulars"],
    name: "Circulaires",
    component: Circulaires,
  },
  {
    path: "/Decisions",
    name: "Decisions",
    component: Decisions,
  },
  {
    path: "/Demande d'autorisation de vol",
    name: "Demande d'autorisation de vol",
    alias: ["/Flight permit request"],

    component: DA,
  },
  {
    path: "/Formulaire de compte rendu",
    alias: ["/Occurrence report"],
    name: "Formulaire de compte rendu",
    component: FCR,
  },
  {
    path: "/Audit et Inspection",
    name: "Audit et Inspection",
    component: AuditInspection,
  },
  {
    path: "/Categorie/:name",
    name: "SubMenu",
    component: SubMenu,
  },
  {
    path: "/Juridiques/Lois",
    alias: ["/Legal/Law"],
    component: JurLoi,
  },
  {
    path: "/Juridiques/Décrets",
    alias: ["/Legal/Decrees"],
    component: JurDecre,
  },
  {
    path: "/Juridiques/Arrêtés",
    alias: ["/Legal/orders"],
    component: JurArre,
  },
  {
    path: "/Juridiques/Règlements",
    alias: ["/Legal/regulations"],
    component: JurRegle,
  },
  {
    path: "/Juridiques/Procédures",
    alias: ["/Legal/procedures/"],
    component: JurProce,
  },
  {
    path: "/Juridiques/Directives",
    alias: ["/Legal/directives"],
    component: JurDire,
  },
  {
    path: "/Juridiques/Circulaires",
    alias: ["/Legal/circulars"],
    component: JurCir,
  },
  {
    path: "/Juridiques/Politiques",
    alias: ["/Legal/policies"],
    component: JurPoli,
  },
  
  {
    path: "/Article/:id",
    name: "Article",
    component: Article,
  },
  { path: "/404", name:'404', component: PageNotFound },
  { path: "*", name:'Error', component: PageNotFound },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
