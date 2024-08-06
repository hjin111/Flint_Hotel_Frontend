<template>
    <v-app>
      <v-main>
        <div class="background-image">
          <v-container class="qna-container">
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title class="custom-title">QnA</v-card-title>
                        <v-card-text>
                            <v-data-table
                            :headers="tableHeaders"
                            :items="qnaList"
                            >
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
         </v-container>   
        </div>
      </v-main>
    </v-app> 
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
        return {
            tableHeaders: [
                {title:'No', key:'no', align:'start'},
                {title:'Title', key:'title', align:'start'},
                {title:'Email', key:'memberEmail', align:'start'},
                {title:'작성일', key:'writeTime', align:'start'}
            ],
            qnaList: []
        }
    },
    async created() {
        const token = localStorage.getItem('token');
        // {headers: {Authorization: 'Bearer 토큰 값'}}}
        const headers = {Authorization: `Bearer ${token}`};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/mypage/qna/list`, {headers});
        
        this.qnaList = response.data.content; // setting 
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
    height: 90vh;
    max-height: calc(100vh - 20px);
    top: 50%; /* Adjusted from 50% to 55% to move it slightly down */
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
  }
  </style>