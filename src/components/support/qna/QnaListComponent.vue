<template>
    <!-- <v-app> -->
      <!-- <v-main> -->
        <div class="background-image">
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
        </div>
      <!-- </v-main> -->
    <!-- </v-app>  -->
  </template>
  
  <script>
  import axios from 'axios';
  export default {
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
  .background-image {
      background-image: url('@/assets/flint_qna.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      height: 100vh;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  .qna-container {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 85vh;
    max-height: calc(100vh - 20px);
    top: 55%; 
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto;
  }
  </style>