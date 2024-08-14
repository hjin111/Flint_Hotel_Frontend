<template>
    <div>
      <FlintView />
      <v-container class="dining-container">
        <v-row>
          <v-col>
            <div class="reservation-content">
                <v-card-title class="text-center text-h5 title" style="font-family: 'Playfair Display', serif; font-weight: 600;margin-top: 10px;
    color:  #7A6C5B;">
                    RESERVATION COMPLETED
                  </v-card-title>
              <h4 class="text-center">Thank you</h4>
            </div>
            <v-col cols="12">
              <br>
              <v-card class="confirmation-card">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <h3 class="section-title">고객 정보</h3>
                      <v-row>
                        <v-col cols="12" md="2">
                          <div class="data-label">성명</div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <v-text-field
                             v-model="name"
                            outlined
                            class="input-field"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="2">
                          <div class="data-label">이메일</div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <v-text-field
                            v-model="email"
                            outlined
                            class="input-field"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="2">
                          <div class="data-label">연락처</div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <v-text-field
                             v-model="phoneNumber"
                            outlined
                            class="input-field"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
      
                    <v-col cols="12" md="6">
                      <h3 class="section-title">예약 정보</h3>
                      <v-row>
                        <v-col cols="12" md="2">
                          <div class="data-label">다이닝</div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <v-text-field
                            v-model="diningName"
                            outlined
                            class="input-field"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="2">
                          <div class="data-label">인원</div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <v-text-field
                             :value="`성인 : ${adult}명    아이 : ${child}명`"
                            outlined
                            class="input-field"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="2">
                          <div class="data-label">날짜&시간</div>
                        </v-col>
                        <v-col cols="12" md="10">
                          <v-text-field
                            :value="`날짜 : ${reservationDate}    시간 : ${reservationTime}`"
                            outlined
                            class="input-field"
                            readonly
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  import FlintView from '@/views/FlintView.vue';
  import axios from '@/axios';
  
  export default {
    components: {
      FlintView
    },
    data() {
    
    const reservationDateTime = this.$route.query.reservationDateTime || '';
    const [date, time] = reservationDateTime.split('T');

      return {
        name: "",
        email: "",
        phoneNumber: "",
        diningId: this.$route.query.diningId,
        adult: this.$route.query.adult,
        child: this.$route.query.child,
        reservationDate: date || '', // 날짜
        reservationTime: time || '' , // 시간
        diningName : ""
      };
    },
    mounted() {
      this.member()
      this.dining()
    },
    methods: {
      async member() {

        const token = localStorage.getItem('membertoken');
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await axios.get(`/member/detail`, {headers});
            console.log(response.data);

            this.name = response.data.firstName + response.data.lastName;
            this.email = response.data.email;
            this.phoneNumber = response.data.phoneNumber;

        } catch(e) {
            console.log(e);
        }
      },
      async dining() {
        try {
        const response = await axios.get(`/dining/${this.diningId}`);
        console.log('Dining response:', response); 
      
        this.diningName = response.data.result; 

      } catch (e) {
        console.log(e); 
      }
      }
    }
  };
  </script>
  
  <style scoped>
  html,
  body,
  #app,
  .v-application--wrap {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  .dining-container {
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
  
  .reservation-content h4 {
    color:  #7A6C5B;
    font-family: 'Playfair Display';
    font-weight: 300;
  }
  
  .confirmation-card {
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #7A6C5B; 
  }
  
  .confirmation-title {
    font-size: 16px;
    font-weight: bold;
    color: #787878;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .section-title {
    font-size: 15px;
    font-weight: bold;
    color: #787878;
    margin-bottom: 8px;
  }
  
  .input-field {
    margin-bottom: 10px;
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
    padding-top: 20px;
    padding-left: 20px;
  }
  </style>
  