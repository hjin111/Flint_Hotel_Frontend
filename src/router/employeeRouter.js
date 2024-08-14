import EmployeeBasicComponent from "@/components/user/employee/EmployeeBasicComponent.vue";

export const employeeRouter = [
    {
        path: '/admin/basicscreen', 
        name: 'EmployeeBasicComponent',
        component: EmployeeBasicComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    }
]