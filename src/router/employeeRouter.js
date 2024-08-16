import EmployeeBasicComponent from "@/components/user/employee/EmployeeBasicComponent.vue";
import EmployeeInfoComponent from "@/components/user/employee/EmployeeInfoComponent.vue";
import EmployeeModifyPasswordComponent from "@/components/user/employee/EmployeeModifyPasswordComponent.vue";
import EmployeeToMemberDining from "@/components/user/employee/managemember/EmployeeToMemberDining.vue";
import EmployeeLogin from '@/views/employee/EmployeeLogin.vue'
import EmployeeCreate from '@/views/employee/EmployeeCreate.vue'
import DiningMenu from '@/views/employee/dining/ManageMenu.vue'
import EmployeeDiningDetailComponent from "@/components/user/employee/EmployeeDiningDetailComponent.vue";
import EmployeeToMemberRoom from "@/components/user/employee/managemember/EmployeeToMemberRoom.vue";
import EmployeeToMember from "@/components/user/employee/managemember/EmployeeToMember.vue";
import EmployeeToMemberList from "@/components/user/employee/managemember/EmployeeToMemberList.vue";
import EmployeeList from "@/components/user/employee/manageemployee/EmployeeList.vue";
import EmployeeManage from "@/components/user/employee/manageemployee/EmployeeManage.vue";

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
        path: '/employee/dining/detail/:id', 
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
    }
]
