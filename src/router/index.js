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

const adminGuard = async (to, from, next) => {
  console.log("adminGuard", store.state.user.user);
  if (!store.state.user.user.isAdmin) {
    await store.dispatch("getUser");
    store.state.user.user.isAdmin ? next() : next("/login");
  } else next();
};
const routes = [
  // remplace l'ancienne route "/" :
  { path: "/", name: "Home", component: HomePage },

  // espace admin :
  {
    path: "/admin",
    component: AdminLayout,
    beforeEnter: adminGuard,
    children: [
      { path: "", name: "AdminDashboard", component: AdminDashboard },
      {
        path: "navigation",
        name: "AdminNavigation",
        component: GestionNavigation,
      },
      { path: "documents", name: "AdminDocuments", component: Docs },
      {
        path: "documents-intern",
        name: "AdminDocIntern",
        component: DocumentsIntern,
      },
      { path: "media", name: "AdminMedia", component: GestionMedia },
      { path: "staff", name: "AdminStaff", component: StaffDetails },
      {
        path: "categories",
        name: "AdminCategories",
        component: GestionCategory,
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
