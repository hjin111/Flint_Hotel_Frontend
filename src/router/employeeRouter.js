import EmployeeLogin from '@/views/employee/EmployeeLogin.vue'
import EmployeeCreate from '@/views/employee/EmployeeCreate.vue'

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
]
