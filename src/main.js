import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import store from "@/plugins/vuex";
import "@/plugins/highlight";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://127.0.0.1:5500/anki";
axios.defaults.headers.post["Content-Type"] = "application/json";

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount("#app");
