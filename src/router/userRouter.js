import MemberLoginPage from '@/views/member/MemberLogin.vue' 
import EmployeeLogin from '@/views/employee/EmployeeLogin.vue'
import MemberSignUp from '@/views/member/SignUpPage.vue'

export const userRouter = [
    {
        path: '/member/login',
        name: 'MemberLoginPage',
        component: MemberLoginPage,
    },
    {
        path: '/employee/login',
        name: 'EmployeeLogin',
        component: EmployeeLogin,
    },
    {
        path: '/member/signup',
        name: 'MemberSignUp',
        component: MemberSignUp,
    }
]
