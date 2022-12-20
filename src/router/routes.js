 const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "",        component: () => import("pages/IndexPage.vue") },
      { path: "details", component: () => import("pages/DetailsPage.vue") },
      { path: "login",   component: () => import("pages/LoginPage.vue") },
      { path: "register",component: () => import("pages/RegisterPage.vue") },
      { path: "profile",component: () => import("pages/ProfilePage.vue") },
      { path: "compteurs",component: () => import("pages/CompteursPage.vue") },
    ],
  },
 // Always leave this as last one,
  // but you can also remove it
  {
    path: "/launchPage",
    component: () => import("pages/LaunchPage.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
