
import AdminLayout from "@/layouts/AdminLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import AdminDashboard from "@/pages/admin/AdminDashboard.vue";
import GestionNavigation from "@/components/GestionNavigation.vue";
import DocumentsIntern from "@/gestion/DocumentsIntern.vue";
import StaffDetails from "@/pages/gestion/StaffDetails.vue";
import Docs from "@/gestion/DocumentsPublic.vue";
import Media from "../pages/gestion/GestionMedia.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageResolver from "@/views/PageResolver.vue";
import LoginPage from "@/pages/LoginPage.vue";
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
    { path: "",                 name: "AdminDashboard",  component: AdminDashboard },
    { path: "navigation",       name: "AdminNavigation", component: GestionNavigation },
    { path: "documents",        name: "AdminDocuments",  component: Docs },
    { path: "documents-intern", name: "AdminDocIntern",  component: DocumentsIntern },
    { path: "media",            name: "AdminMedia",      component: Media },
    { path: "staff",            name: "AdminStaff",      component: StaffDetails },
  ],
},

// redirections des anciennes URLs :
{ path: "/gestionDocs",  redirect: "/admin/documents" },
{ path: "/gestionMedia", redirect: "/admin/media" },
{ path: "/docIntern",    redirect: "/admin/documents-intern" },
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
