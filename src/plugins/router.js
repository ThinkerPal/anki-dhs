import Vue from "vue";
import VueRouter from "vue-router";
import EditDeck from "@/views/editdeck.vue";
import Decks from "@/views/decks.vue";
import Test from "@/views/ankicard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Decks",
    component: Decks
  },
  {
    path: "/test/:deckid",
    name: "Test",
    component: Test
  },
  {
    path: "/editdeck/:deckid",
    name: "EditDeck",
    component: EditDeck
  },
];

export default new VueRouter({
  routes,
});
