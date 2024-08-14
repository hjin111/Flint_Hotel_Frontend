import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import { employeeRouter } from "./employeeRouter";
import MemberLoginPage from '@/components/LoginComponent.vue'

import FlintView from '@/views/FlintView.vue';
import EmployeeView from '@/views/EmployeeView.vue';

const routes = [
    {
        path:'/',
        name:'Flint',
        component:FlintView,
        meta: {header: 'HeaderComponent'}
    },
    {
        path:'/admin',
        name:'Employee',
        component:EmployeeView,
        meta: {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/member/login',
        name: 'MemberLoginPage',
        component: MemberLoginPage
    },
    ...roomReservationRouter, 
    ...qnaRouter,
    ...employeeRouter

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;