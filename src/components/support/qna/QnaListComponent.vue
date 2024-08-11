<template>
    <QnaView />
    <v-container class="qna-container">
        <v-row>
            <v-col>
                <v-card class="qna-card">
                    <v-card-title class="custom-title">QnA</v-card-title>
                    <v-card-text>
                        <v-data-table
                            :items="qnaList"
                            :headers="tableHeaders"
                            class="elevation-1">
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{ item.no }}</td>
                                    <td>{{ item.title }}</td>
                                    <td>{{ item.memberEmail }}</td>
                                    <td>{{ formatDate(item.writeTime) }}</td>
                                    <td>
                                        <v-btn style="color: white;" color="#C7BDC7">Modify</v-btn>
                                    </td>
                                </tr>
                            </template>
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
            qnaList: [],
            tableHeaders: [
                {title:'No', key:'no', align:'start'},
                {title:'Title', key:'title', align:'start'},
                {title:'Email', key:'memberEmail', align:'start'},
                {title: 'Write time', key: 'writeTime', align: 'start'},
                {title:'Modify', align:'start'}
            ],
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
                this.qnaList = response.data; // setting 
            } catch(e) {
                console.log('Error: ', e);
            }
        },
        formatDate(dateString) {
            if (!dateString) return '';

            const [datePart, timePart] = dateString.split('T');
            return `${datePart} ${timePart}`;
        },  
    }
    
  }
  </script>
  
  <style scoped>
  .custom-title {
    font-family: "Playfair Display", serif;
    color: #787878;
    font-size:20px;
    border-bottom: 3px solid #787878;
    text-align: center;
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
  .qna-card {
    padding: 20px;
  }
  </style>