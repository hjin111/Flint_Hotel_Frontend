<template>
    <div>
    <FlintView />
    <v-container class="reserve-contianer">
        <br>
        <h3 style="text-align:center;">{{ roomType }}</h3>
        <br>
        <v-container class="innerContainer">
            <v-row>
            <v-col>
                <v-container style="text-align:center; margin-left: 30px;">
                    🛏️🛏️🛏️<br>여기는<br>이미지<br>자리임<br>🛏️🛏️🛏️ 
                </v-container>
                <v-card  class="descriptionCard" style="margin-left: 30px;">
                        <v-row>
                            <v-col>
                                <v-card class="info">
                                    <v-card-title style="font-size: 16px; padding-top:20px;">&nbsp;&nbsp;○ 기본정보</v-card-title>
                                    <v-card-text style="padding-top: 15px; padding-left: 30px; padding-right: 30px;">침대가 어쩌고 저쩌고 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩
                                        강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩
                                        강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩
                                        강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩
                                    </v-card-text>
                                </v-card>
                            </v-col> 
                        </v-row>
                    </v-card> 
        
                    <v-card  class="descriptionCard" style="margin-left: 30px; padding-top:10px;">
                        <v-row>
                            <v-col>
                                <v-card class="info">
                                    <v-card-title style="font-size: 16px; padding-top:20px;">&nbsp;&nbsp;○ 편의시설</v-card-title>
                                    <v-card-text style="padding-top: 15px; padding-left: 30px; padding-right: 30px;">TV, 에어컨, 냉장고, 어쩌고 저쩌고가 있어 
                                        강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩
                                        강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩
                                        강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 강낭콩강낭콩 
                                    
                                    </v-card-text>
                                </v-card>
                            </v-col> 
                        </v-row>
                    </v-card>  
            </v-col>

            <!-- 수직선 -->
            <v-col cols="2" class="vertical-line-container">
                <div class="vertical-line"></div>
            </v-col>

            <v-col style="padding-right:30px; width:100%;">
                <!-- 옵션 사항 -->
                <v-card class="optionsCard">
                    <v-card-title style="font-size: 16px; padding-top:20px; padding-bottom:10px;">○ 옵션 사항</v-card-title>
                    <v-card-text style="padding-top: 15px;">
                        <v-row>
                            <v-col cols="5" style="padding-left:10px;">
                                <div>성인 조식/50,000원</div>
                            </v-col>
                            <v-col cols="7" class="d-flex align-center" style="padding-left:20px;">
                                <v-btn icon @click="decrementAdultBreakfast">-</v-btn>
                                <span style="padding: 0 8px;">{{ adultBreakfastCount }}</span>
                                <v-btn icon @click="incrementAdultBreakfast">+</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5" style="padding-left:10px;">
                                <div>어린이 조식/35,000원</div>
                            </v-col>
                            <v-col cols="7" class="d-flex align-center" style="padding-left:20px;">
                                <v-btn icon @click="decrementChildBreakfast">-</v-btn>
                                <span style="padding: 0 8px;">{{ childBreakfastCount }}</span>
                                <v-btn icon @click="incrementChildBreakfast">+</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" style="padding-left:10px;">
                                <div>주차 [{{ parkingYN === 'Y' ? '예' : '아니오' }}]</div>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center">
                                <v-radio-group v-model="parkingYN" row>
                                    <v-radio label="예" value="Y"></v-radio>
                                    <v-radio label="아니오" value="N"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- 요청사항 -->
                    <v-card-title style="font-size: 16px; padding-top:10px;">○ 요청 사항</v-card-title>
                    <v-card-text>
                        <v-textarea v-model="requestContents" outlined rows="2" placeholder="요청 사항을 입력하세요." style="font-size:14px;"></v-textarea>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
        <v-container class="innerContainer">
            <v-row justify="end">
                <v-col cols="auto">
                    <div style="padding-top:15px;">{{ formatPrice(totalPrice) }}원</div>
                </v-col>
                <v-col cols="auto">
                    <v-btn @click="createReservation" class="submit-btn" style="height: 50px; width: 70%;">Submit</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</div>
</template>
    
    <script>
    import FlintView from '@/views/FlintView.vue';
    import axios from 'axios';
    export default {
      components: {
        FlintView
      },
      data() {
        return {    
          roomType: "",
          adultBreakfastCount: 0,
          childBreakfastCount: 0,
          parkingYN: "N",
          requestContents: "",
          totalPrice: 0,
          basePrice: 0
        };
      },
      created() {
        const room = localStorage.getItem('selectedRoom');
        if (room) {
            const parseRoom = JSON.parse(room);
            this.roomType = parseRoom.roomTypeName;
        }
      },
      mounted() {
        this.getPrice();
      },
      methods: {
        incrementAdultBreakfast() {
            this.adultBreakfastCount++;
            this.updateTotalPrice();
        },
        decrementAdultBreakfast() {
            if (this.adultBreakfastCount > 0) {
                this.adultBreakfastCount--;
                this.updateTotalPrice();
            }
        },
        incrementChildBreakfast() {
            this.childBreakfastCount++;
            this.updateTotalPrice();
        },
        decrementChildBreakfast() {
            if (this.childBreakfastCount > 0) {
                this.childBreakfastCount--;
                this.updateTotalPrice();
            }
        },
        updateTotalPrice() {
            const adultBreakfastTotal = this.adultBreakfastCount * 50000;
            const childBreakfastTotal = this.childBreakfastCount * 35000;
            this.totalPrice = this.basePrice + adultBreakfastTotal + childBreakfastTotal;
        },
        async getPrice() {
            try {
                const token = localStorage.getItem('membertoken');
                const checkInDate = localStorage.getItem('checkInDate');
                const checkOutDate = localStorage.getItem('checkOutDate');
                const adultCnt = localStorage.getItem('numAdults');
                const childCnt = localStorage.getItem('numChildren');

                // 역직렬화해서 roomId 가져오기 
                const selectedRoom = localStorage.getItem('selectedRoom');
                let roomId = null;
                if (selectedRoom) {
                    const parseRoom = JSON.parse(selectedRoom);
                    roomId = parseRoom.roomId;
                    console.log(roomId);
                } else {
                    console.log('no room');
                }

                const headers = { Authorization: `Bearer ${token}` };
                const params = {
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    adultCnt: adultCnt,
                    childCnt: childCnt,
                    roomId: roomId
                };
                console.log("params: ", params);

                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/reserve/room/getPrice`, {params, headers});
            
                console.log(response);
                this.basePrice = response.data;
                this.updateTotalPrice();

            } catch(e) {
                console.log(e);
            }
        },
        formatPrice(price) {
            const truncatedPrice = Math.floor(price / 1000) * 1000;
            return truncatedPrice.toLocaleString();
        },
        async createReservation() {
            const token = localStorage.getItem('membertoken');
            const checkInDate = localStorage.getItem('checkInDate');
            const checkOutDate = localStorage.getItem('checkOutDate');
            const adultCnt = localStorage.getItem('numAdults');
            const childCnt = localStorage.getItem('numChildren');

            // 역직렬화해서 roomId 가져오기 
            const selectedRoom = localStorage.getItem('selectedRoom');
            let roomId = null;
            if (selectedRoom) {
                const parseRoom = JSON.parse(selectedRoom);
                roomId = parseRoom.roomId;
                console.log(roomId);
            } else {
                console.log('no room');
            }

            const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };         
            const data = {
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                adultCnt: adultCnt,
                childCnt: childCnt,
                roomId: roomId,
                adultBreakfastCount: this.adultBreakfastCount,
                childBreakfastCount: this.childBreakfastCount,
                parkingYN: this.parkingYN,
                requestContents: this.requestContents
            };
            console.log(JSON.stringify(data));
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/reserve/room`, data, {headers});
                console.log("예약 성공");
            } catch(e) {
                console.log(e);
            }
            // localstorage에 예약정보 클리어
            localStorage.removeItem('checkInDate');
            localStorage.removeItem('checkOutDate');
            localStorage.removeItem('numAdults');
            localStorage.removeItem('numChildren');
            localStorage.removeItem('selectedRoom');
            this.$router.push('/reserve/room/success');
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
    .reserve-contianer {
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
      flex-direction: column;
      padding-left:40px;
      padding-right:40px;
    }

    .reserve-contianer h3 {
        font-family: "Playfair Display", serif;
        color: #787878;
    }
    .descriptionCard {
        border: none; 
        box-shadow: none;
        width: 100%;
    }
    .info {
        background-color: #F4F4F4;
    }
    .innerContainer {
        font-family: "Noto Serif KR", serif;
        border-top: 3px solid #928E8E; /* 테두리 두께와 색상 설정 */
    }
    .vertical-line-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0;
        margin: 0 auto;
    }
    .vertical-line {
        width: 0.8px;
        height: 95%;
        background-color: #C6CBD5;
    }
    .submit-btn {
        max-width: 200px; 
        border-radius: 5px;
        color: white; 
        background-color: #7A6C5B;
        transition: background-color 0.3s ease; 
    }
    .optionsCard {
        width: 100%; 
        margin-left: -30px; 
        margin-top: 20px;
        padding-left: 10px; 
        padding-right: 10px; 
    }

    .v-col {
        margin-left: 0px; 
        padding-left: 0px; 
    }

</style>