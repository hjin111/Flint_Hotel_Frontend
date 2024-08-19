// import MypageComponent from "@/components/MypageComponent.vue"
import MypageDining from "@/views/mypages/MypageDining.vue";
import MypageRoom from "@/views/mypages/MypageRoom.vue";
import MypageUpdatePassword from "@/views/mypages/MypageUpdatePassword.vue";
import MypageDelMember from "@/views/mypages/MypageDelMember.vue";
import MypageMain from "@/views/mypages/MypageMain.vue";
import MypageRoomDetail from "@/views/mypages/MypageRoomDetail.vue";
import MypageDiningDetail from "@/views/mypages/MypageDiningDetail.vue";

export const mypageRouter = [
    // {
    //     path: '/mypage', 
    //     name: 'MypageComponent',
    //     component: MypageComponent,
    //     meta : {header: 'HeaderComponent'}
    // },
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
    {
        path: '/mypage/delmember',
        name: 'MypageDelMember',
        component: MypageDelMember,
        meta : {header: 'HeaderComponent'}
    },  
    {
        path: '/mypage',
        name: 'MypageMain',
        component: MypageMain,
        meta : {header: 'HeaderComponent'}
    },  
    {
        path: '/mypage/room/detail/:id',
        name: 'MypageRoomDetail',
        component: MypageRoomDetail,
        meta : {header: 'HeaderComponent'}
    }, 
    {
        path: '/mypage/dining/detail/:id',
        name: 'MypageDiningDetail',
        component: MypageDiningDetail,
        meta : {header: 'HeaderComponent'}
    },
]