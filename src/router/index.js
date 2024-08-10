import { createRouter, createWebHistory } from "vue-router";
import { roomReservationRouter } from "./roomReservationRouter";
import { qnaRouter } from "./qnaRouter";

import FlintView from '@/views/FlintView.vue';
import { userRouter } from "./userRouter";

const routes = [
    {
        path:'/',
        name:'Flint',
        component:FlintView,
        meta: {header: 'HeaderComponent'}
    },
    ...userRouter,
    ...roomReservationRouter, 
    ...qnaRouter

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;