import AdminLayout from "@/layouts/AdminLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import AdminDashboard from "@/pages/admin/AdminDashboard.vue";
import GestionNavigation from "@/components/GestionNavigation.vue";
import DocumentsIntern from "@/gestion/DocumentsIntern.vue";
import StaffDetails from "@/pages/gestion/StaffDetails.vue";
import Docs from "@/gestion/DocumentsPublic.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageResolver from "@/views/PageResolver.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ResetPassword from "@/pages/ResetPassword.vue";
import GestionCategory from "@/gestion/GestionCategory.vue";
import GestionMedia from "@/gestion/GestionMedia.vue";
import SousCategoryOne from "@/pages/SousCategoryOne.vue";
import SousCategoryTwo from "@/pages/SousCategoryTwo.vue";
import AuditInspection from "@/pages/inspection/AuditInspection.vue";

// Vérifie simplement qu'un utilisateur est connecté (agent OU admin)
const authGuard = async (to, from, next) => {
  let user = store.state.user.user;
  if (!user || !user.id) {
    await store.dispatch("getUser");
    user = store.state.user.user;
  }
  if (user && user.id) {
    next();
  } else {
    next("/login");
  }
};

// Vérifie que l'utilisateur connecté est bien administrateur.
// Un agent connecté (non-admin) est renvoyé vers le tableau de bord
// plutôt que vers /login, puisqu'il a bien un compte valide.
const adminGuard = async (to, from, next) => {
  let user = store.state.user.user;
  if (!user || !user.id) {
    await store.dispatch("getUser");
    user = store.state.user.user;
  }
  if (user && user.isAdmin) {
    next();
  } else if (user && user.id) {
    next("/admin");
  } else {
    next("/login");
  }
};

// Tant que l'utilisateur (admin ou agent) n'a pas activé le TOTP, seul
// /admin/profile est accessible — c'est là que l'activation se fait.
const mfaGuard = async (to, from, next) => {
  let user = store.state.user.user;
  if (!user || !user.id) {
    await store.dispatch("getUser");
    user = store.state.user.user;
  }
  if (!user || !user.id) {
    return next("/login");
  }
  if (user.mfaEnabled === true) {
    next();
  } else {
    next("/admin/profile");
  }
};

const routes = [
  // remplace l'ancienne route "/" :
  { path: "/", name: "Home", component: HomePage },

  // espace admin :
  {
    path: "/admin",
    component: AdminLayout,
    beforeEnter: authGuard,
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
        beforeEnter: mfaGuard,
      },
      {
        path: "navigation",
        name: "AdminNavigation",
        component: GestionNavigation,
        beforeEnter: [mfaGuard, adminGuard],
      },
      {
        path: "documents",
        name: "AdminDocuments",
        component: Docs,
        beforeEnter: mfaGuard,
      },
      {
        path: "documents-intern",
        name: "AdminDocIntern",
        component: DocumentsIntern,
        beforeEnter: mfaGuard,
      },
      {
        path: "media",
        name: "AdminMedia",
        component: GestionMedia,
        beforeEnter: mfaGuard,
      },
      {
        path: "staff",
        name: "AdminStaff",
        component: StaffDetails,
        beforeEnter: [mfaGuard, adminGuard],
      },
      {
        path: "categories",
        name: "AdminCategories",
        component: GestionCategory,
        beforeEnter: [mfaGuard, adminGuard],
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/gestion/ProfilePage.vue"),
        // pas de mfaGuard ici : c'est la seule page toujours accessible,
        // c'est là que l'activation du MFA se fait.
      },
    ],
  },

  // redirections des anciennes URLs :
  { path: "/gestionDocs", redirect: "/admin/documents" },
  { path: "/gestionMedia", redirect: "/admin/media" },
  { path: "/docIntern", redirect: "/admin/documents-intern" },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (to.name === "Login" && store.state.user.user.id) {
        next({ alias: ["/admin"], name: "GestionAdmin" });
      } else {
        next();
      }
    },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/Article/:id",
    redirect: (to) => ({ path: "/articles", query: { article: to.params.id } }),
  },
  { path: "/Audit-et-Inspection", name: "Audit", component: AuditInspection },

  { path: "/administration/:name", component: SousCategoryOne },
  {
    path: "/administration/:subCategoryOne/:subCategoryTwo",
    component: SousCategoryTwo,
  },

  // 404 explicite, puis attrape-tout EN DERNIER :
  { path: "/404", name: "404", component: PageNotFound },
  { path: "/:slug(.*)*", name: "dynamic-page", component: PageResolver },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
