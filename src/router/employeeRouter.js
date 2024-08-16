import EmployeeBasicComponent from "@/components/user/employee/EmployeeBasicComponent.vue";
import EmployeeInfoComponent from "@/components/user/employee/EmployeeInfoComponent.vue";
import EmployeeModifyPasswordComponent from "@/components/user/employee/EmployeeModifyPasswordComponent.vue";
import EmployeeToMemberDining from "@/components/user/employee/managemember/EmployeeToMemberDining.vue";
import EmployeeLogin from '@/views/employee/EmployeeLogin.vue'
import EmployeeCreate from '@/views/employee/EmployeeCreate.vue'
import DiningMenu from '@/views/employee/dining/ManageMenu.vue'
import EmployeeDiningDetailComponent from "@/components/user/employee/EmployeeDiningDetailComponent.vue";
import EmployeeList from "@/components/user/employee/manageemployee/EmployeeList.vue";
import EmployeeManage from "@/components/user/employee/manageemployee/EmployeeManage.vue";
import EmployeeToMemberRoom from "@/components/user/employee/EmployeeToMemberRoom.vue";
import EmployeeToMember from "@/components/user/employee/EmployeeToMember.vue";
import EmployeeToMemberList from "@/components/user/employee/EmployeeToMemberList.vue";
import EmployeeTaskComponent from "@/components/user/employee/EmployeeTaskComponent.vue"
import EmployeeRoomPriceModify from "@/views/employee/room/EmployeeModRoomPrice.vue"
import EmployeeQnaListComponent from "@/components/support/qna/EmployeeQnaListComponent.vue";
import EmployeeQnaDetailComponent from "@/components/support/qna/EmployeeQnaDetailComponent.vue";
import EmployeeQnaCreateComponent from "@/components/support/qna/EmployeeQnaCreateComponent.vue";
import EmployeeQnaModifyComponent from "@/components/support/qna/EmployeeQnaModifyComponent.vue";
import EmployeeToMemberRoomDetail from "@/components/user/employee/EmployeeToMemberRoomDetail.vue";
import EmployeeToMemberRoomModDetail from "@/components/user/employee/EmployeeToMemberRoomModDetail.vue";

export const employeeRouter = [
    {
        path: '/employee/login',
        name: 'EmployeeLogin',
        component: EmployeeLogin,
    },
    {
        path: '/employee/create',
        name: 'EmployeeCreate',
        component: EmployeeCreate,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/dining/menu',
        name: DiningMenu,
        component: DiningMenu,
        meta: {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/admin/basicscreen', 
        name: 'EmployeeBasicComponent',
        component: EmployeeBasicComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee', 
        name: 'EmployeeInfoComponent',
        component: EmployeeInfoComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/employeemodifypassword', 
        name: 'EmployeeModifyPasswordComponent',
        component: EmployeeModifyPasswordComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/dining', 
        name: 'EmployeeToMemberDining',
        component: EmployeeToMemberDining,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/room', 
        name: 'EmployeeToMemberRoom',
        component: EmployeeToMemberRoom,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/room/:id', 
        name: 'EmployeeToMemberRoomDetail',
        component: EmployeeToMemberRoomDetail,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/room/mod/:id', 
        name: 'EmployeeToMemberRoomModDetail',
        component: EmployeeToMemberRoomModDetail,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/member',
        name: 'EmployeeToMember',
        component: EmployeeToMember,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/member/list',
        name: 'EmployeeToMemberList',
        component: EmployeeToMemberList,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/dining/detail/:diningReservationId',
        name: 'EmployeeDiningDetailComponent',
        component: EmployeeDiningDetailComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/office', 
        name: 'EmployeeList',
        component: EmployeeList,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/office/manage', 
        name: 'EmployeeManage',
        component: EmployeeManage,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/task',
        name: 'EmployeeTaskComponent',
        component: EmployeeTaskComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/room/modprice',
        name: 'EmployeeRoomPriceModify',
        component: EmployeeRoomPriceModify,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/qna/list',
        name: 'EmployeeQnaListComponent',
        component: EmployeeQnaListComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/qna/detail/:id',
        name: 'EmployeeQnaDetailComponent',
        component: EmployeeQnaDetailComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/qna/answer/create/:id',
        name: 'EmployeeQnaCreateComponent',
        component: EmployeeQnaCreateComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/employee/qna/answer/update/:id',
        name: 'EmployeeQnaModifyComponent',
        component: EmployeeQnaModifyComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
]
