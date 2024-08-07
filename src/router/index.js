import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import {mypageRouter} from "./mypageRouter";

import MemberLoginPage from '@/components/LoginComponent.vue'
import FlintView from '@/views/FlintView.vue';


const routes = [
    {
        path:'/',
        name:'Flint',
        component:FlintView,
        meta: {header: 'HeaderComponent'}
    },
    {
        path: '/member/login',
        name: 'MemberLoginPage',
        component: MemberLoginPage
    },
    ...roomReservationRouter, 
    ...qnaRouter,
    ...mypageRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;