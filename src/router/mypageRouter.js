import MypageComponent from "@/components/MypageComponent.vue"
// import vue from 'vue';
// import VueRouter from 'vue-router';
// import MypageDining from "@/views/mypages/MypageDining.vue";
// import MypageRoom from "@/views/mypages/MypageRoom.vue";
// import MypageUpdatePassword from "@/views/mypages/MypageUpdatePassword.vue";

// vue.use(VueRouter)

export const mypageRouter = [
    {
        path: '/mypage', 
        name: 'MypageComponent',
        component: MypageComponent,
        meta : {header: 'HeaderComponent'}
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
    // },
    // {
    //     path: '/mypage/updatepassword',
    //     name: 'MypageUpdatePass',
    //     component: MypageUpdatePassword,
    // },
]

// const router = new VueRouter({
//     mode: 'history',
//     mypageRouter,
// })
  
// export default router