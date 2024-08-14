<template>
    <QnaView />
    <v-container class="qna-container">
        <v-row>
            <v-col>
                <v-card class="qna-card">
                    <v-card-title class="custom-title">QnA</v-card-title>
                    <v-card-text>
                        <v-row class="justify-end btnrow">
                            <v-btn @click="$router.push('/mypage/qna/create')" style="color: white;" color="#7A6C5B">Write</v-btn>
                        </v-row>
                        <v-data-table
                            :items="qnaList"
                            :headers="tableHeaders"
                            class="elevation-1">
                            <template v-slot:item="{ item }">
                                <tr class="datatr">
                                    <td>{{ item.no }}</td>
                                    <td>
                                        <router-link :to="{ name: 'QnaDetailComponent', params: {id: item.id}}">
                                            {{ item.title }}
                                        </router-link>
                                    </td>
                                    <td>{{ item.memberEmail }}</td>
                                    <td>{{ formatDate(item.writeTime) }}</td>
                                    <!-- <td>
                                        <v-btn style="color: white;" color="#C7BDC7">Modify</v-btn>
                                    </td> -->
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
                {title:'No', key:'no', align:'center'},
                {title:'Title', key:'title', align:'center'},
                {title:'Email', key:'memberEmail', align:'center'},
                {title: 'Write time', key: 'writeTime', align: 'center'},
                // {title:'Modify', align:'center'}
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
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto;
  }
  .qna-card {
    padding: 20px;
    /* font-family: "Playfair Display", serif; */
    font-family: "Noto Serif KR", serif;
  }
  .datatr {
    text-align: center;
  }
  .btnrow {
    margin-top:10px;
    margin-bottom:5px;
  }
  </style>