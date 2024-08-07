import MypageComponent from "@/components/MypageComponent.vue"
// import MypageDining from "@/views/mypages/MypageDining";
// import MypageRoom from "@/views/mypages/MypageRoom";

export const mypageRouter = [
    {
        path: '/mypage', 
        name: 'MypageComponent',
        component: MypageComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    // {
    //     path: '/mypage/dining',
    //     name: 'MypageDining',
    //     component: MypageDining,
    //     meta : {header: 'EmployeeHeaderComponent'}
    // },
    // {
    //     path: '/mypage/room',
    //     name: 'MypageRoom',
    //     component: MypageRoom,
    //     meta : {header: 'EmployeeHeaderComponent'}
    // }
]