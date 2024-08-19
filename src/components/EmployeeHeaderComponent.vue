<template>
  <!-- 네비게이션바 -->
  <v-app-bar app dark>
    <v-container>
      <!-- 행의 자식 요소들을 모두 중앙정렬  -->
      <v-row align="center">
        <!-- 콜 전체를 왼쪽정 렬되게 해줌 -->
        <v-col class="d-flex justify-start">
          <v-btn @click="openMemberDialog">Member</v-btn>
          <v-btn v-if="department === 'Office'" :to="{ path: `/employee/${dept}` }"> {{ manage }}</v-btn>
          <v-btn v-else @click="openManageDialog"> {{ manage }}</v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn class="flint-hotel-title" :to="{ path: '/employee' }">FLINT HOTEL</v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn @click="openReservationModal()">Dining({{ newDiningReservationCount }})</v-btn>
          <v-btn :to="{ path: '/employee/room' }">Room</v-btn>
          <v-btn v-if="!isLogin" :to="{ path: '/employee/login' }"> Login </v-btn>
          <v-btn v-else-if="isLogin" @click="Logout()"> Logout </v-btn>
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
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;"
                  @click="memberListBtn">Member List</v-btn>
              </v-col>
              <v-col cols="6" md="6" class="d-flex justify-center">
                <v-btn class="custom-btn" size="large" style="color: black; background-color: #E5E5E5;
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;"
                  @click="qnaManageBtn">QnA Manage</v-btn>
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
              <v-col cols="12" md="8" class="d-flex justify-center">
                <v-btn class="custom-btn" size="large" v-if="isDining" @click="navigateToMenu" style="color: black; background-color: #E5E5E5; 
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;">Menu
                  Manage</v-btn>
                <v-btn class="custom-btn" size="large" v-if="isRoom" @click="navigateToMenu" style="color: black; background-color: #E5E5E5; 
                  padding-top:10px; padding-bottom:30px; width: 100%; max-width: 160px; border: none;">Room
                  Price</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- 다이닝 예약 알림 모달창 -->
      <v-dialog v-model="diningDialogSSE" max-width="600px">
        <v-card style="font-family: Playfair Display, serif; padding-left:15px;
        padding-top:15px;">
          <v-card-title class="headline">New Reservations</v-card-title>
          <v-card-text>
            <div v-if="newDiningReservationCount === 0" style="font-family: Noto Serif KR, serif;">
              새로운 예약이 없습니다.
            </div>
            <div v-else>
              <ul>
                <li v-for="reservation in diningRecentReservations" :key="reservation.id"
                  style="font-family: Noto Serif KR, serif;" @click="goToDiningReservationDetail(reservation.id)">
                  [{{ reservation.id }}] : Reserve-Date {{ reservation.reserveDate }}&nbsp;{{ reservation.reserveTime }}
                </li>
              </ul>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeReservationModal">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app-bar>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default {
  data() {
    return {
      department: "",
      manage: "",
      dialogMember: false,
      dialogManage: false,
      isLogin: false,
      router: useRouter(),
      dept: "",
      diningDialogSSE: false,
      newDiningReservationCount: 0,
      diningRecentReservations: []
    }
  },
  mounted() {
    if (localStorage.getItem("employeetoken")) {
      const payload = jwtDecode(localStorage.getItem('employeetoken'));
      this.department = payload.department;
      this.dept = this.department.toLowerCase();
      if (this.dept.includes("dining") || this.dept.includes("lounge")) {
        this.dept = "dining/menu"
      }

      this.manage = payload.department + " " + "Manage";
      console.log(this.department)
    }
  },
  created() {
    if (localStorage.getItem('employeetoken')) {
      const token = localStorage.getItem("employeetoken");
      const payload = jwtDecode(localStorage.getItem('employeetoken'));
      this.department = payload.department;

      if (token) {
        this.isLogin = true;
        let email = '';
        switch (this.department) {
          case 'KorDining':
            email = 'flint_kor@gmail.com';
            break;
          case 'ChiDining':
            email = 'flint_chi@gmail.com';
            break;
          case 'JpaDining':
            email = 'flint_jpa@gmail.com';
            break;
          case 'Lounge':
            email = 'flint_lou@gmail.com';
            break;
          default:
            console.warn('No mathed department')
            return;
        }
        try {
          let sse = new EventSourcePolyfill(
            `${process.env.VUE_APP_API_BASE_URL}/dining/subscribe`,
            { headers: { Authorization: `Bearer ${token}`, 'X-User-Email': email } }
          );

          sse.addEventListener('connect', (event) => {
            console.log("Connected:", event);
          });

          sse.addEventListener('reserved', (event) => {
            console.log("Reservation received:", event.data);
          });
          sse.onerror = (error) => {
            console.error(error);
          };
        } catch (error) {
          console.log(error)
        }
      }
    }
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
    openReservationModal() {
      this.diningDialogSSE = true;
    },
    closeReservationModal() {
      this.diningDialogSSE = false;
      this.$router.push(`/employee/dining`);
    },
    goToDiningReservationDetail(reservationId) {
      // detail 조회를 위해 선택한 예약만 제거 (조회한 예약id와 같지 "않은" 것만 남겨두기)

      this.diningRecentReservations = this.diningRecentReservations.filter(reservation => reservation.id !== reservationId);
      // 남은 개수 갱신
      this.newDiningReservationCount = this.diningRecentReservations.length;
      this.diningDialogSSE = false;
      this.$router.push(`/employee/dining/${reservationId}`);
    },
    Logout() {
      this.isLogin = false;
      localStorage.removeItem('employeetoken');
      this.$router.push(`/admin`);
    }
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