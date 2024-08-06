import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import MemberLoginPage from '@/components/LoginComponent.vue'

import FlintView from '@/views/FlintView.vue';

const routes = [
    {
        path:'/',
        name:'Flint',
        component:FlintView,
        meta: {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/member/login',
        name: 'MemberLoginPage',
        component: MemberLoginPage,
        meta: {header: 'EmployeeHeaderComponent'}
    },
    ...roomReservationRouter, 
    ...qnaRouter

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;