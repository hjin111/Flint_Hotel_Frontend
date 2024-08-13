import QnaListComponent from "@/components/support/qna/QnaListComponent.vue";
import QnaCreateComponent from "@/components/support/qna/QnaCreateComponent.vue";

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
    }
]