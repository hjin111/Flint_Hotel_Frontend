import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";
import { memberRouter } from "./memberRouter";
import { employeeRouter } from "./employeeRouter";

import FlintView from '@/views/FlintView.vue';

const routes = [
    {
        path:'/',
        name:'Flint',
        component:FlintView,
        meta: {header: 'HeaderComponent'}
    },

    ...roomReservationRouter, 
    ...qnaRouter,
    ...memberRouter,
    ...employeeRouter

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;