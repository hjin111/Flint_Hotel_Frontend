import QnaListComponent from "@/components/support/qna/QnaListComponent.vue";

export const qnaRouter = [
    {
        path: '/mypage/qna/list', 
        name: 'QnaListComponent',
        component: QnaListComponent,
        meta : {header: 'EmployeeHeaderComponent'}
    }
]