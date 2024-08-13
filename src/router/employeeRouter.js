import EmployeeBasicComponent from "@/components/user/employee/EmployeeBasicComponent.vue";
import EmployeeInfoComponent from "@/components/user/employee/EmployeeInfoComponent.vue";
import EmployeeModifyPasswordComponent from "@/components/user/employee/EmployeeModifyPasswordComponent.vue";

export const employeeRouter = [
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
]