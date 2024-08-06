<template>
    <v-app>
      <v-main>
        <div class="background-image">
          <v-container class="reserve-container">
            <v-row justify="center" align="center">
              <div class="reservation-content">
                <h1 class="text-center">예약이 완료되었습니다.</h1>
                <p class="text-center">감사합니다.</p>
  
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-card class="confirmation-card" style="width:1100px"> <!-- Moved width to style -->
                        <v-card-title class="confirmation-title">예약 확인</v-card-title>
                        <br>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" md="6">
                              <h3 class="section-title">고객 정보</h3>
                              <!-- 고객정보 -->
                              <v-row>
                                <v-col cols="12" md="2">
                                  <div class="data-label">성명</div>
                                </v-col>
                                <v-col cols="12" md="10">
                                  <v-text-field
                                    placeholder="최무리"
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
                                    placeholder="moon@naver.com"
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
                                    placeholder="010 - 1234 - 5678"
                                    outlined
                                    class="input-field"
                                    readonly
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-col>
  
                            <v-col cols="12" md="6">
                              <h3 class="section-title">예약 정보</h3>
                              <!-- 예약정보 -->
                              <v-row>
                                <v-col cols="12" md="2">
                                  <div class="data-label">조식</div>
                                </v-col>
                                <v-col cols="12" md="10">
                                  <v-text-field
                                    placeholder="성인 2 / 어린이 0"
                                    outlined
                                    class="input-field"
                                    readonly
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="2">
                                  <div class="data-label">주차</div>
                                </v-col>
                                <v-col cols="12" md="10">
                                  <v-text-field
                                    placeholder="아니오"
                                    outlined
                                    class="input-field"
                                    readonly
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="2">
                                  <div class="data-label">요청</div>
                                </v-col>
                                <v-col cols="12" md="10">
                                  <v-text-field
                                    placeholder="깨끗한 방 부탁드려요."
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
                  </v-row>
                </v-container>
              </div>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedBreakfast: 'yes', // Default selection
      };
    },
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
    overflow: hidden; /* Prevents overall page scrolling */
  }
  
  .background-image {
    background-image: url('@/assets/image.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .reserve-container {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 90vh;
    max-height: calc(100vh - 20px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto; /* scrolling */
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .reservation-content h1 {
    margin-top: 50px;
    color: #787878;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
  }
  
  .reservation-content p {
    color: #787878;
    font-family: "Noto Serif KR", serif;
  }
  
  .confirmation-card {
    margin-top: 10px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
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
    flex-direction: row; /* Ensures radio buttons are inline */
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
    height: 100%; /* Ensures it takes up full column height for alignment */
    padding-top: 20px;
    padding-left: 20px;
  }
  
  </style>