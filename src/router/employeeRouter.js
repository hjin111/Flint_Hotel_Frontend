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
    }
]
