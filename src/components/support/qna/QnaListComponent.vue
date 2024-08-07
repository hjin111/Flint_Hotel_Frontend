<template>
    <QnaView />
    <v-container class="qna-container">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="custom-title">QnA</v-card-title>
                    <v-card-text>
                        <v-data-table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Title</th>
                                    <th>Writer</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="q in qnaList" :key="q.no">
                                    <td>{{ q.no }}</td>
                                    <td>{{ q.title }}</td>
                                    <td>{{ q.memberEmail }}</td>
                                    <td>{{ formatDate(q.writeTime) }}</td>
                                </tr>
                            </tbody>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
     </v-container> 
  </template>
  
  <script>
  import QnaView from '@/views/QnaView.vue';
import axios from 'axios';
  export default {
    components: {
        QnaView
    },
    data() {
        return {
            qnaList: []
        }
    },
    created() {
        this.loadList();
    },
    methods: {
        async loadList() {
            try {
                const token = localStorage.getItem('membertoken');
                // {headers: {Authorization: 'Bearer 토큰 값'}}}
                const headers = {Authorization: `Bearer ${token}`};
                console.log(headers);
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/mypage/qna/list`, {headers});

                console.log('Response: ', response.data);
                this.qnaList = response.data.content; // setting 
            } catch(e) {
                console.log('Error: ', e);
            }
        },
        formatDate(dateString) {
            const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },  
    }
    
  }
  </script>
  
  <style scoped>
  .custom-title {
    font-family: "Playfair Display", serif;
    color: #787878;
    font-size:20px;
  }
  .qna-container {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 80%;
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto;
  }
  </style>