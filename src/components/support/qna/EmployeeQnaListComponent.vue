<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title"> QnA List </v-card-title>
                        <v-card-text>
                            <v-row class="justify-end searchrow">
                                <v-col cols="12" md="6">
                                    <v-row>
                                        <v-col cols="12" md="2" class="emailcol">
                                            <div class="data-label">Email</div>
                                        </v-col>
                                        <v-col cols="12" md="7">
                                            <v-text-field class="tf" v-model="email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3" class="search">
                                            <v-btn @click="searchMember()" style="color: white;"
                                                color="#7A6C5B">Search</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <br>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-data-table
                                        class="elevation-1"
                                        :header="headers"
                                        :items="qnaList"
                                        item-key="id"
                                    >
                                    
                                    <template v-slot:header>
                                    </template>
                                        <template v-slot:body="{ items }">
                                         
                                                <tr v-for="q in items" :key="q.id" >
                                                    <td>{{ q.id }}</td>
                                                    <td>{{ q.title }}</td>
                                                    <td>{{ q.memberEmail }}</td>
                                                    <td>{{ formatDate(q.writeTime) }}</td>
                                                    <td>
                                                        <v-btn @click="diningDetail(q.id)"
                                                        style="background-color:white; color:#7A6C5B; border: 1px solid #7A6C5B;">Detail</v-btn>
                                                    </td>
                                                </tr>
                                        </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import EmployeeView from '@/views/EmployeeView.vue';
import axios from '@/axios';

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
            email: "",
            qnaList: [],
            headers: [
                { text: 'Id', value: 'id' },
                { text: 'Title', value: 'title' },
                { text: 'Email', value: 'MemberEmail' },
                { text: 'Write Time', value: 'writeTime' },
                { text: 'Detail', value: 'detail' }
            ],
            pageSize: 10,
            currentPage: 0,
            isLoading: false,
            isLastPage: false
        };
    },
    methods: {
        async searchMember() {
        this.qnaList = []; 
        this.currentPage = 0; 
        this.isLastPage = false; 

        try {
            const params = {
                size: this.pageSize,
                page: this.currentPage
            };

            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/qna/list`, { params });
            this.qnaList = response.data.result.content.filter(qna => qna.memberEmail === this.email);

            this.currentPage++;

            if (this.qnaList.length === 0) {
                this.isLastPage = true;
            }
        } catch (e) {
            console.error(e.message);
        }
    },
    async diningDetail(id) {
            this.$router.push({
                path: `/employee/qna/detail/${id}`
            });
    },
        async loadQnA() {
            try {
                if (this.isLoading || this.isLastPage) return;

                this.isLoading = true;

                const params = {
                    size: this.pageSize,
                    page: this.currentPage
                };

                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/qna/list`, { params });
                const additionalData = response.data.result.content || [];

                if (additionalData.length === 0) {
                    this.isLastPage = true;
                }

                this.qnaList = [...this.qnaList, ...additionalData];
                this.currentPage++;
                this.isLoading = false;

            } catch (e) {
                console.error(e.message);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
        
        // 날짜를 yyyy-mm-dd 형식으로 포맷팅
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
        
      
        },
    },
    created() {
        this.loadQnA(); // 컴포넌트 생성 시 초기 데이터 로딩
    }
};
</script>


<style scoped>
.content-container {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 80%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
}

.confirmation-card {
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    height: auto;
    box-shadow: none;
}

.confirmation-title {
    font-size: 20px;
    font-weight: bold;
    color: #787878;
    text-align: left;
    border-bottom: 3px solid #787878;
    font-family: "Noto Serif KR", serif;
}

.section-title {
    font-size: 17px;
    font-weight: bold;
    color: #787878;
    padding-left: 17px;
    padding-bottom: 20px;
    font-family: "Noto Serif KR", serif;
}
.tf {
    margin-right: -20px;
    padding-top: 20px;
}
.search {
    padding-top: 40px;
}
.searchrow {
    margin-right: -20px;
    margin-bottom: -40px;
}

.v-radio-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex-direction: row;
}

.v-radio {
    margin-right: 10px;
}

.v-card-title {
    padding: 0;
    margin: 0;
}

.data-label {
    font-size: 14px;
    font-weight: bold;
    color: #787878;
    display: flex;
    height: 100%;
    padding-top: 40px;
    padding-left: 20px;
}
.emailcol {
    margin-right: -20px;
}
</style>