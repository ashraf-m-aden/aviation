import store from "../store/index";
import Dashboard from "../pages/DashboardPage.vue";
import Presentation from "../pages/A propos de nous/PresentationPage.vue";
import Organisation from "../pages/A propos de nous/OrganisationPage.vue";
import MduD from "../pages/A propos de nous/MotDuDiirecteur.vue";
import PdeF from "../pages/A propos de nous/PolitiqueDeFormation.vue";
import PdeS from "../pages/A propos de nous/PolitiqueDeSupervision.vue";

import Login from "../pages/LoginPage.vue";
import Docs from "../pages/gestion/GestionDocuments.vue";
import Media from "../pages/gestion/GestionMedia.vue";
import DocIntern from "../pages/gestion/DocumentInternView.vue";
import Contact from "../pages/ContactPage.vue";
// import Securite from "../pages/Header/securité.vue";

import DA from "../pages/eService/DemandeAutorisation.vue";
import FCR from "../pages/eService/FormulaireCompteRendu.vue";
import AuditInspection from "../pages/inspection/AuditInspection.vue";
import SubMenu from "../pages/SubMenu.vue";
import SousCategoryOne from "../pages/SousCategoryOne.vue";
import SousCategoryTwo from "../pages/SousCategoryTwo.vue";
import Article from "../pages/ArticlesPage.vue";
import StaffDetails from "../pages/gestion/StaffDetails.vue";
import AIP from "../pages/aip/PublicationsInformationAéronautique.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

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
      if (to.name === "Login" && store.state.user.user.id) {
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
    beforeEnter: async (to, from, next) => {
      if (to.name === "Docs" && !store.state.user.user.isAdmin) {
        await store.dispatch('getUser');
        if (!store.state.user.user.id) {
          next('/');
        } else { next()}
      } else {
        next();
      }
    },
  },
  {
    path: "/docIntern",
    name: "DocIntern",
    component: DocIntern,
    beforeEnter: async (to, from, next) =>  {
      if (to.name === "DocIntern" && !store.state.user.user.id) {
        await store.dispatch('getUser');
        if (!store.state.user.user.id) {
          next('/');
        } else { next()}
      } else {
        next();
      }
    },
  },
  {
    path: "/gestionMedia",
    name: "Media",
    component: Media,
    beforeEnter:async (to, from, next) => {
      if (to.name === "Media" && !store.state.user.user.isAdmin) {
        await store.dispatch('getUser');
        if (!store.state.user.user.isAdmin) {
          next('/');
        } else { next()}
      } else {
        next();
      }
    },
  },

  {
    path: "/aip",
    name: "Publications d'Information Aéronautique",
    component: AIP,
  },
  {
    path: "/securite/:name",
    component: SousCategoryOne,
  },
  {
    path: "/securite/:subCategoryOne/:subCategoryTwo",
    component: SousCategoryTwo,
  },
  {
    path: "/surete/:name",
    component: SousCategoryOne,
  },
  {
    path: "/surete/:subCategoryOne/:subCategoryTwo",
    component: SousCategoryTwo,
  },
  {
    path: "/administration/:name",
    component: SousCategoryOne,
  },
  {
    path: "/administration/:subCategoryOne/:subCategoryTwo",
    component: SousCategoryTwo,
  },
  {
    path: "/securite/:name",
    component: SubMenu,
  },

  {
    path: "/Presentation",
    name: "Presentation",
    component: Presentation,
  },
  {
    path: "/Mot-du-directeur",
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
    path: "/Politique-de-Formation",
    alias: ["/Oversight policy"],
    name: "PdeF",
    component: PdeF,
  },
  {
    path: "/Politique-de-Supervision",
    alias: ["/Supervion policy"],
    name: "PdeS",
    component: PdeS,
  },

  {
    path: "/Demande-d'autorisation-de-vol",
    name: "Demande d'autorisation de vol",
    alias: ["/Flight permit request"],

    component: DA,
  },
  {
    path: "/Formulaire-de-compte-rendu",
    alias: ["/Occurrence report"],
    name: "Formulaire de compte rendu",
    component: FCR,
  },
  {
    path: "/Audit-et-Inspection",
    name: "Audit et Inspection",
    component: AuditInspection,
  },
  {
    path: "/Categorie/:name",
    name: "SubMenu",
    component: SubMenu,
  },


  {
    path: "/Article/:id",
    name: "Article",
    component: Article,
  },
  { path: "/404", name: "404", component: PageNotFound },
  { path: "/:pathMatch(.*)*", name: "Error", component: PageNotFound },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // if (savedPosition) {
    //   return savedPosition;
    // } else {
    return { top: 0 };
  },
});
// router.beforeEach((to, next)=>{
//   const user = store.state.user.user;
//   if (user.id && to.path == "/login") {
//     next('/');
//   }
// })
export default router;
