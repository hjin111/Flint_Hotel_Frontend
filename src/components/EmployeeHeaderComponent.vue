<template>
    <!-- 네비게이션바 -->
    <v-app-bar app dark>
      <v-container>
        <!-- 행의 자식 요소들을 모두 중앙정렬  -->
        <v-row align="center">
            <!-- 콜 전체를 왼쪽정 렬되게 해줌 -->
            <v-col class="d-flex justify-start"> 
                <v-btn @click="openMemberDialog">Member</v-btn>
                <v-btn v-if="department === 'Office' " 
                      :to="{path:'/employee/office'}"> {{ manage }}</v-btn>
                <v-btn v-if="department === 'Room' " 
                      @click="openManageDialog"> {{ manage }}</v-btn> 
                <v-btn v-if="department === 'KorDining' || department === 'JapDining' || department === 'ChiDining' || department === 'Lounge' " 
                      @click="openManageDialog"> {{ manage }}</v-btn> 
            </v-col>
            <v-col class="text-center">
              <v-btn class="flint-hotel-title" :to="{path:'/employee'}">FLINT HOTEL</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn :to="{path:'/employee/dining'}">Dining</v-btn>
              <v-btn :to="{path:'/employee/room'}">Room({{ newReservationCount }})</v-btn>
            </v-col>
        </v-row>

        <!-- member 클릭 > 모달창 -->
         <v-dialog v-model="dialogMember" max-width="400px">
          <v-card style="border: none;">
            <div style="background-color: #828282; height: 50px; border-radius: 4px 4px 0 0;"></div>
            <v-card-text class="cardText" style="padding: 24px;">
              <v-row class="button-row" justify="center">
                <v-col cols="6" md="6" class="d-flex justify-center">
                  <v-btn class="custom-btn" size="large" style="color: black; background-color: #E5E5E5; 
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;" @click="memberListBtn">Member List</v-btn>
                </v-col>
                <v-col cols="6" md="6" class="d-flex justify-center">
                  <v-btn class="custom-btn" size="large" style="color: black; background-color: #E5E5E5;
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;" @click="qnaManageBtn">QnA Manage</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
         </v-dialog>

         <!-- Room Manage 클릭 > 모달창 -->
         <v-dialog v-model="dialogManage" max-width="400px">
          <v-card style="border: none;">
            <div style="background-color: #828282; height: 50px; border-radius: 4px 4px 0 0;"></div>
            <v-card-text class="cardText" style="padding: 24px;">
              <v-row class="button-row" justify="center">
                <v-col  cols="12" md="8" class="d-flex justify-center">
                  <v-btn class="custom-btn" size="large" 
                  v-if="isDining" @click="navigateToMenu"
                  style="color: black; background-color: #E5E5E5; 
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;">Menu Manage</v-btn>
                  <v-btn class="custom-btn" size="large" 
                  v-if="isRoom" @click="navigateToMenu"
                  style="color: black; background-color: #E5E5E5; 
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;">Room Price</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
         </v-dialog>
      </v-container>
    </v-app-bar>    
  </template>
    
  <script>
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
// sse
import { EventSourcePolyfill } from 'event-source-polyfill';

  export default {
    data(){
      return{
        department:"",
        manage: "",
        dialogMember: false,
        dialogManage: false,
        isLogin : false,
        router: useRouter(),
        employeeDepartment: null,
        newReservationCount: 0
      }
    },
    created() {
      const token = localStorage.getItem("employeetoken");
      if (token) {
        // 토큰이 있으면 정상 
        this.isLogin = true
        const decodedToken = jwtDecode(token)

        this.employeeDepartment = decodedToken.department // department 꺼내담기 
        console.log("부서 : ", this.employeeDepartment);
      }
      if (this.employeeDepartment === 'Room') {
        let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`,  {headers: {Authorization: `Bearer ${token}`}});
        sse.addEventListener('connect', (event) => {
          console.log(event);
        })

        // 객실 예약이 들어오는 것 listen 
        sse.addEventListener('booked', (event) => {
          console.log('새로운 객실 예약이 들어왔습니다. :', event.data);
          this.newReservationCount += 1; 
        });
      }
    },
    mounted() {
      const payload = jwtDecode(localStorage.getItem('employeetoken'));
      this.department = payload.department;
      this.manage = payload.department + " " + "Manage";
      console.log(this.department)
    },
    computed: {
        isDining() {
            return ['KorDining', 'JapDining', 'ChiDining', 'Lounge'].includes(this.department);
        },
        isRoom() {
            return this.department === 'Room';
        }
    },
    methods: {
      openMemberDialog() {
        this.dialogMember = true;
      },
      memberListBtn() {
        this.$router.push(`/employee/member/list`);
        this.dialogMember = false;
      },
      qnaManageBtn() {
        this.$router.push(`/employee/qna/list`);
        this.dialogMember = false;
      },
      openManageDialog() {
        console.log("hi");
        this.dialogManage = true;
      },
      navigateToMenu() {
            const path = this.isDining ? '/employee/dining/menu' : '/employee/room/modprice';
            this.$router.push(path);
            console.log("hihi");
            this.dialogManage = false;
      },
    }
  };
  </script>
  
  <style>
.flint-hotel-title {
  font-size: 24px;
  font-family: "Playfair Display", serif;
}

.v-btn {
  margin: 0 30px;
  font-family: "Noto Serif KR", serif;
}


</style>