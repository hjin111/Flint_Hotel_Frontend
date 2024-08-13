import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import {mypageRouter} from "./mypageRouter";
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
        path: '/member/login',
        name: 'MemberLoginPage',
        component: MemberLoginPage
    },
    {
        path:'/admin',
        name:'Employee',
        component:EmployeeView,
        meta: {header: 'EmployeeHeaderComponent'}
    },
    ...roomReservationRouter, 
    ...qnaRouter,
    ...mypageRouter,
    ...employeeRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;