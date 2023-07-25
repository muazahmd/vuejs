import { createWebHistory, createRouter } from "vue-router";
import UserPage from "./components/User.vue";
const routes = [
  {
    name: "UserPage",
    path: "/",
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
