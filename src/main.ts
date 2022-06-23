import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/plugins/dayjs";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.$cookies.config("7d", "", "", true, "none");

Vue.config.productionTip = false;

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://siasep-be.herokuapp.com",
});

Vue.use(VueAxios, instance);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
