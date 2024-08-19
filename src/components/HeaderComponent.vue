<template>
  <div>
  <v-app-bar
      app
      color="transparent"
      flat
      class="top-nav"
      v-show="!isScrolled"
      :style="{ transition: 'transform 0.3s ease-in-out', transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)' }"
    >
    <v-container>
      <v-row>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-left:auto; margin-right:-20px;" v-if="!isLogin" @click="login()">LOGIN</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="!isLogin" @click="$router.push('/member/signup')">JOIN</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-left:auto; margin-right:-20px;" v-if="isLogin"
          :to="{path:`/mypage`}">MYPAGE</v-btn>
        <!-- 바로 위, 아래 수정 -->
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="isLogin" @click="logout()">LOGOUT</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" @click="$router.push('/mypage/qna/list')">INQUIRY</v-btn>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-app-bar
      app
      color="transparent"
      flat
      class="login-nav"
      v-show="!isScrolled"
      :style="{ transition: 'transform 0.3s ease-in-out', transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)' }"
    >
    <v-container>
      <v-row justify="center" style="padding-right: 30px;">
        <v-btn text style="color:#FFFFFF">INTRODUCE</v-btn>
        <v-btn text style="color:#FFFFFF" @click="openReservationDialog">RESERVATION</v-btn>
        <v-btn text style="font-size: 40px; color:#FFFFFF" @click="$router.push('/')">FLINT HOTEL</v-btn>
        <v-btn text style="color:#FFFFFF">DINING</v-btn>
        <v-btn text style="color:#FFFFFF">ROOM</v-btn>
      </v-row>

      <!-- reservation 클릭 후 > 모달창 -->
      <v-dialog v-model="dialogReservation" max-width="400px">
          <v-card style="border: none;">
            <div style="background-color: #D5DCEA; height: 50px; border-radius: 4px 4px 0 0;"></div>
            <v-card-text class="cardText" style="padding: 24px;">
              <v-row class="button-row" justify="center">
                <v-col cols="6" md="6" class="d-flex justify-center">
                  <v-btn class="custom-btn" size="large" style="color: black; background-color: white; border-color: #D5DCEA; border-width: 3px;
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; box-shadow: none;" @click="RoomReservationBtn">Room</v-btn>
                </v-col>
                <v-col cols="6" md="6" class="d-flex justify-center">
                  <v-btn class="custom-btn" size="large" style="color: black; background-color: white; border-color: #D5DCEA; border-width: 3px;
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; box-shadow: none;" @click="DiningReservationBtn">Dining</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
         </v-dialog>

          <!-- 대기열 위치를 보여주는 다이얼로그 -->
        <v-dialog v-model="showQueuePositionDialog" max-width="400px">
          <v-card>
            <v-card-title>대기열 상태</v-card-title>
            <v-card-text>
              <p>현재 대기 순서: {{ currentPosition }}번째 입니다.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="handleDialogClose">닫기</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-container>
  </v-app-bar>
</div>
</template>

<script>
import axios from '@/axios'
import { jwtDecode } from 'jwt-decode'

export default {
    data(){
        return{
            isLogin : false,
            isScrolled: false, 
            dialogReservation: false,
            showQueuePositionDialog: false, // 대기열 모달을 위한 변수
            currentPosition: null, // 현재 대기열 위치를 저장하는 변수
            requestId: null,
            eventSource: null, // SSE 연결을 관리하는 변수
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        this.checkLoginStatus() // 여기 추가
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        this.closeSSEConnection() // 컴포넌트가 파괴될 때 SSE 연결 종료
    },
    methods: {
      handleScroll() {
        this.isScrolled = window.scrollY > 50;
      },
      checkLoginStatus() {
        const token = localStorage.getItem('membertoken');
        if(token){
            this.isLogin = true // 토큰이 존재하면 로그인 상태로 설정
        }
      },
      logout() {
        localStorage.removeItem('membertoken') // 토큰 제거
        this.isLogin = false // 로그아웃 상태로 설정
        this.$router.push("/")
      },
      login() {
        this.$router.push("/member/login")
      },
      openReservationDialog() {
        this.dialogReservation = true;
      },
      async RoomReservationBtn() {
        const token = localStorage.getItem('membertoken')
          if(token){
            try {
              const decodedToken = jwtDecode(token)
              const email = decodedToken.sub
              const response = await axios.post('/submit', null, { params: { email: email } })
              if (response.data && response.data.status_code === 200) {
                const { requestId, position } = response.data.result
                this.requestId = requestId
                this.currentPosition = position
                // 대기열 위치가 50 미만일 경우 예약 페이지로 이동
                if (this.currentPosition < 50) {
                  this.dialogReservation = false  // 예약 모달을 닫고
                  this.showQueuePositionDialog = false // 대기열 모달 닫기
                  this.closeSSEConnection() // SSE 연결 종료
                  this.$router.push(`/reserve/room`)
                } else {
                  // 대기열 위치가 50 이상일 경우 대기열 모달을 열고 SSE 연결 시작
                  this.dialogReservation = false  // 예약 모달을 닫고
                  this.showQueuePositionDialog = true  // 대기열 모달 열기
                  this.startQueueCheck()  // 대기열 위치 체크 시작
                }
              } else {
                alert(`요청 처리에 실패했습니다. 메시지: ${response.data.status_message}`)
              }
            } catch (error) {
              console.error('Error while submitting request:', error)
              alert('요청 처리 중 오류가 발생했습니다.')
            }
          } else{
              this.$router.push(`/member/login`)
          }
      },
      DiningReservationBtn() {
        this.$router.push(`/reserve/dining/create`);
        this.dialogReservation = false;
      },
      handleDialogClose() {
        this.closeSSEConnection() // SSE 연결 종료
        if (this.requestId) {
          axios.delete(`/leave/${this.requestId}`)
          .then(response => {
              if (response.status === 204) {
                  this.requestId = ""
                  console.log('Successfully left the queue.')
                  this.showQueuePositionDialog = false
              } else {
                  console.error('Unexpected response status:', response.status)
                  alert('대기열에서 나가는 중 오류가 발생했습니다.')
              }
          })
          .catch(error => {
              console.error('Error while leaving the queue:', error)
              alert('대기열에서 나가는 중 오류가 발생했습니다.')
          })
        }
      }
  }
};
</script>

<style>  
  .login-nav {
  z-index: 10;
  margin-top:-25px;
  }
  .top-nav {
  z-index: 10;
  margin-top:-10px;
  }
  .v-btn {
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 1;
    color: #FFFFFF;
  }

</style>