import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    alias: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/surat",
    name: "Surat",
    component: () => import("@/views/Page.vue"),
    children: [
      {
        path: "masuk",
        children: [
          {
            path: "elektronik",
          },
          {
            path: "fisik",
          },
        ],
      },
      {
        path: "keluar",
        children: [
          {
            path: "alat-keterangan",
          },
          {
            path: "analisis-risiko",
          },
          {
            path: "berita-acara",
          },
          {
            path: "laporan-penelitian",
          },
          {
            path: "laporan-pengurangan-pph",
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin.vue"),
  },
  {
    path: "/pengaturan",
    name: "Pengaturan",
    component: () => import("@/views/Pengaturan.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function isAuthenticated() {
  if (Vue.$cookies.isKey("session_id")) {
    return true;
  } else {
    return false;
  }
}

router.beforeEach((to, from, next) => {
  if (
    // make sure the user is authenticated
    !isAuthenticated() &&
    // ❗️ Avoid an infinite redirect
    to.name !== "Login"
  ) {
    // redirect the user to the login page
    store.commit(
      "snackbar/showSnackbar",
      {
        msg: "Session Habis",
        color: "info",
      },
      {
        root: true,
      }
    );

    router.push("login");
  } else {
    next();
  }

  // console.log(isAuthenticated());
  // next();
});

export default router;
