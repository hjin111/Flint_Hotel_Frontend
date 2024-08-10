import MemberLoginPage from '@/views/member/MemberLogin.vue' 
import MemberSignUp from '@/views/member/SignUpPage.vue'

export const memberRouter = [
    {
        path: '/member/login',
        name: 'MemberLoginPage',
        component: MemberLoginPage,
    },
    {
        path: '/member/signup',
        name: 'MemberSignUp',
        component: MemberSignUp,
    },
]