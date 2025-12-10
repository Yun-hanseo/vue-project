import { createRouter, createWebHistory } from "vue-router";

// ✔ 실제 존재하는 파일만 import
import HomeComponent from "@/components/Home/Home.vue";
import AuthContainer from "@/components/login/AuthContainer.vue";

const routes = [
    {
        path: "/signin",
        name: "signin",
        component: AuthContainer,
    },
    {
        path: "/",
        name: "home",
        component: HomeComponent,
    },
];

// Router 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

//로그인 여부 확인 미들웨어
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("auth") === "true";

    if (!isLoggedIn && to.path !== "/signin") {
        next("/signin");
    } else {
        next();
    }
});

export default router;