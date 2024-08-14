import EmployeeBasicComponent from "@/components/user/employee/EmployeeBasicComponent.vue";
import EmployeeInfoComponent from "@/components/user/employee/EmployeeInfoComponent.vue";
import EmployeeModifyPasswordComponent from "@/components/user/employee/EmployeeModifyPasswordComponent.vue";
import EmployeeSearchMember from "@/components/user/employee/EmployeeSearchMember.vue";
import EmployeeLogin from '@/views/employee/EmployeeLogin.vue'
import EmployeeCreate from '@/views/employee/EmployeeCreate.vue'
import DiningMenu from '@/views/employee/dining/ManageMenu.vue'

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
        path: '/admin/employeeminfo', 
        name: 'EmployeeInfoComponent',
        component: EmployeeInfoComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/admin/employeemodifypassword', 
        name: 'EmployeeModifyPasswordComponent',
        component: EmployeeModifyPasswordComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    },
    {
        path: '/admin/emptosearchmem', 
        name: 'EmployeeSearchMember',
        component: EmployeeSearchMember,
        meta : {header: 'EmployeeHeaderComponent'}
    },
]
