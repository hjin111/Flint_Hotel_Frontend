import QnaListComponent from "@/components/support/qna/QnaListComponent.vue";
import QnaCreateComponent from "@/components/support/qna/QnaCreateComponent.vue";
import QnaDetailComponent from "@/components/support/qna/QnaDetailComponent.vue";
import QnaModComponent from "@/components/support/qna/QnaModComponent.vue";

export const qnaRouter = [
    {
        path: '/mypage/qna/list', 
        name: 'QnaListComponent',
        component: QnaListComponent,
        meta : {header: 'HeaderComponent'}
    },
    {
        path: '/mypage/qna/create', 
        name: 'QnaCreateComponent',
        component: QnaCreateComponent,
        meta : {header: 'HeaderComponent'}
    },
    {
        path: '/mypage/qna/detail/:id', 
        name: 'QnaDetailComponent',
        component: QnaDetailComponent,
        meta : {header: 'HeaderComponent'}
    },
    {
        path: '/mypage/qna/update/:id', 
        name: 'QnaModComponent',
        component: QnaModComponent,
        meta : {header: 'HeaderComponent'}
    }
]