import RoomReservationComponent from "@/components/reserve/room/RoomReservationComponent.vue";
import RoomReservationSuccessComponent from "@/components/reserve/room/RoomReservationSuccessComponent.vue";

export const roomReservationRouter = [
    {
        path: '/reserve/room', // 호출
        name: 'RoomReservationComponent',
        component: RoomReservationComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/reserve/room/success', // 호출
        name: 'RoomReservationSuccessComponent',
        component: RoomReservationSuccessComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    }
]