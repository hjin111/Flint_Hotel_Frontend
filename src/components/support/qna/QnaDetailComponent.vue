<template>
    <div>
    <QnaView />
    <v-container class="qna-container">
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="qna-card">
                    <v-card-title class="custom-title">QnA 조회</v-card-title>
                    <br>
                    <v-card-text>
                        <v-form>
                            <!-- 서비스 선택 -->
                            <v-row>
                                <v-col cols="12" md="2" class="custom-col-service">
                                    <v-input>
                                        Service
                                    </v-input>
                                </v-col>
                                <v-col cols="12" md="10">
                                    <v-text-field
                                        v-model="service"
                                        outlined
                                        readOnly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <!-- title -->
                            <v-row>
                                <v-col cols="12" md="2" class="custom-col-title">
                                    <v-input>
                                        Title
                                    </v-input>
                                </v-col>
                                <v-col cols="12" md="10">
                                    <v-text-field
                                        v-model="title"
                                        outlined
                                        readOnly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <!-- content -->
                            <v-row>
                                <v-col cols="12" md="2" class="custom-col-content">
                                    <v-input>
                                        Content
                                    </v-input>
                                </v-col>
                                <v-col cols="12" md="10">
                                    <v-textarea
                                        v-model="contents"
                                        outlined
                                        readOnly
                                    ></v-textarea>
                                </v-col>
                            </v-row> 
                        </v-form>
                        <v-row class="justify-end">
                            <v-btn class="leftbtn" style="color: white;" color="#7A6C5B"
                            @click="$router.push({ name: 'QnaModComponent', params: { id: this.$route.params.id } })"
                            >Modify</v-btn>
                            <v-btn style="color: white;" color="#CFB18E">Delete</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
     </v-container> 
    </div>
  </template>
  
  <script>
  import QnaView from '@/views/QnaView.vue';
  import axios from '@/axios';
  export default {
    components: {
        QnaView
    },
    data() {
        return {
            service: "",
            title: "",
            contents: ""
        }
    },
    created() {
        const qnaId = this.$route.params.id;
        this.fetchQnaDetail(qnaId);
    },
    methods: {
        async fetchQnaDetail(qnaId) {
            try {
                const response = await axios.get(`/mypage/qna/detail/${qnaId}`);
                console.log(response.data);

                this.service = response.data.result.service;
                this.title = response.data.result.title;
                this.contents = response.data.result.contents;

            } catch(e) {
                if (e.response) {
                    console.error("Error Status:", e.response.status);  
                    console.error("Error Data:", e.response.data);  
                } else {
                    console.error("Error Message:", e.message);
                }
            }
        }
        
    }
    
  }
  </script>
  
  <style scoped>
  .custom-title {
    font-family: "Playfair Display", serif;
    /* font-family: "Noto Serif KR", serif; */
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
    height: 82%;
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto;

    padding-left:14%;
    padding-top: 10px;
  }
  .qna-card {
    width:80%;
    padding: 20px;
  }
  .custom-col-service {
    padding-left: 50px;
    padding-top: 30px;
    color: #787878;
  }
  .custom-col-title {
    padding-left: 70px;
    padding-top: 30px;
    color: #787878;
  }
  .custom-col-content {
    padding-left: 50px;
    padding-top: 70px;
    color: #787878;
  }
  .leftbtn {
    margin-right: -8px;
  }
  </style>