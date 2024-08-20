import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import { memberRouter } from "./memberRouter";
import {mypageRouter} from "./mypageRouter";
import {diningRouter} from "./diningRouter";
import { employeeRouter } from "./employeeRouter";
import  MainPage from '@/views/MainPage.vue';
// import FlintView from '@/views/FlintView.vue';
import EmployeeView from '@/views/EmployeeView.vue';

const routes = [
    {
        path:'/',
        name:'MainPage',
        component:MainPage,
        meta: {header: 'HeaderComponent'}
    },
    // {
    //     path:'/',
    //     name:'Flint',
    //     component:FlintView,
    //     meta: {header: 'HeaderComponent'}
    // },
    {
        path:'/admin',
        name:'Employee',
        component:EmployeeView,
        meta: {header: 'EmployeeHeaderComponent'}
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
    ...employeeRouter,
    ...memberRouter,
    ...diningRouter,
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;