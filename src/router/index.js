import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import MemberLoginPage from '@/components/common/LoginComponent.vue'

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
    ...qnaRouter

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;