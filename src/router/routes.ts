import type {RouteRecordRaw} from "vue-router";
import MainView from "@/views/MainView.vue";

export const menuRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: MainView
    },
    {
        path: '/second',
        name: 'second',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/SecondView.vue')
    },
    {
        path: '/third',
        name: 'third',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/ThirdView.vue')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
    },
];