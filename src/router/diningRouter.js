import DiningCreate from '@/components/reserve/dining/DiningReservationComponent.vue';
import DiningReservationSuccessComponent from '@/components/reserve/dining/DiningReservationSuccessComponent.vue';
export const diningRouter = [

    {
        path: '/reserve/dining/create',
        name: 'DiningCreate',
        component: DiningCreate,
        meta: {header: 'HeaderComponent'}
    },
    {
        path: '/reserve/dining/success', 
        name: 'DiningReservationSuccessComponent',
        component: DiningReservationSuccessComponent,
        meta : {header: 'HeaderComponent'}
    }

]