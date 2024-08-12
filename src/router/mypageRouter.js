import MypageComponent from "@/components/MypageComponent.vue"
import MypageDining from "@/views/mypages/MypageDining.vue";
import MypageRoom from "@/views/mypages/MypageRoom.vue";
import MypageUpdatePassword from "@/views/mypages/MypageUpdatePassword.vue";


export const mypageRouter = [
    {
        path: '/mypage', 
        name: 'MypageComponent',
        component: MypageComponent,
        meta : {header: 'HeaderComponent'}
    },
    {
        path: '/mypage/dining',
        name: 'MypageDining',
        component: MypageDining,
        meta : {header: 'HeaderComponent'}
    },
    {
        path: '/mypage/room',
        name: 'MypageRoom',
        component: MypageRoom,
        meta : {header: 'HeaderComponent'}
    },
    {
        path: '/mypage/updatepassword',
        name: 'MypageUpdatePass',
        component: MypageUpdatePassword,
        meta : {header: 'HeaderComponent'}
    },
]