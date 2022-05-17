import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import i18n from "@/i18n";

const routes = [
  {
    path: "/",
    redirect: { name: "main" },
  },
  {
    path: "/auth",
    name: "authorization",
    component: () => import("../views/auth/AuthView.vue"),
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    redirect: { name: "main" },
    children: [
      {
        path: "main",
        name: "main",
        meta: { title: i18n.global.t("dashboard.title") },
        component: () => import("../views/main/MainView.vue"),
      },
      {
        path: "users",
        component: () => import("../views/users/UsersView.vue"),
        children: [
          {
            path: "",
            name: "users",
            meta: { title: i18n.global.t("user.nav") },
            component: () => import("../views/users/UsersList.vue"),
          },
          {
            path: "roles",
            name: "roles",
            meta: { title: i18n.global.t("role.nav") },
            component: () => import("../views/users/RolesList.vue"),
          },
          {
            path: "roles/edit/:id",
            name: "roleEdit",
            meta: { title: i18n.global.t("role.nav") },
            component: () => import("../views/users/RolesList.vue"),
          },
        ],
      },
      {
        path: "users/add",
        name: "userAdd",
        meta: { title: i18n.global.t("user.add") },
        component: () => import("../views/users/UserAddView.vue"),
      },
      {
        path: "users/edit/:id",
        name: "userEdit",
        redirect: { name: "userInfo" },
        component: () => import("../views/users/UserEditView.vue"),
        children: [
          {
            path: "",
            name: "userInfo",
            component: () => import("../views/users/UserInfo.vue"),
          },
          {
            path: "visits",
            name: "userVisits",
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
