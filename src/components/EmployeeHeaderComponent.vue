<template>
  <!-- 네비게이션바 -->
  <v-app-bar app dark>
    <v-container>
      <!-- 행의 자식 요소들을 모두 중앙정렬  -->
      <v-row align="center">
        <!-- 콜 전체를 왼쪽정 렬되게 해줌 -->
        <v-col class="d-flex justify-start">
          <v-btn :to="{ path: '/employee/member/list' }">Member</v-btn>
          <v-btn :to="{ path: `/employee/${dept}` }"> {{ manage }}</v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn class="flint-hotel-title" :to="{ path: '/employee' }">FLINT HOTEL</v-btn>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn :to="{ path: '/employee/dining' }">Dining</v-btn>
          <v-btn :to="{ path: '/employee/room' }">Room</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { jwtDecode } from 'jwt-decode';
import { EventSourcePolyfill } from 'event-source-polyfill'

export default {
  data() {
    return {
      department: "",
      manage: "",
      dept:"",
    }
  },
  mounted() {
    const payload = jwtDecode(localStorage.getItem('employeetoken'));
    this.department = payload.department;
    this.dept = this.department.toLowerCase();
    if(this.dept.includes("dining") || this.dept.includes("lounge")){
      this.dept =  "dining/menu"
    }
    this.manage = payload.department + " " + "Manage";
    console.log(this.department)
  },
  created() {
    const token = localStorage.getItem("employeetoken");
    const payload = jwtDecode(localStorage.getItem('employeetoken'));
    this.department = payload.department;

    if (token) {
      let email = '';

      switch (this.department) {
        case 'KorDining':
          email = 'flint_Kor@gmail.com';
          break;
        case 'ChiDining':
          email = 'flint_Chi@gmail.com';
          break;
        case 'JpaDining':
          email = 'flint_Jpa@gmail.com';
          break;
        case 'Lounge':
          email = 'flint_Lou@gmail.com';
          break;
        default:
          console.warn('No mathed department')
          return;
      }

      try {
        let sse = new EventSourcePolyfill(
          `${process.env.VUE_APP_API_BASE_URL}/dining/subscribe`, // 정확한 URL
          { headers: { Authorization: `Bearer ${token}`, 'X-User-Email': email } } // 이메일을 헤더에 추가
        );

        sse.addEventListener('connect', (event) => {
          console.log("Connected:", event);
        });

        sse.addEventListener('reserved', (event) => {
          console.log("Reservation received:", event.data);
        });
        sse.onerror = (error) => {
          if (error.error.message.includes('No activity within')) {
            // 이 오류 메시지를 무시하고, 다른 오류만 로그에 출력
            return;
          }
          console.error(error);
        };
      }catch(error){
        console.log(error)
      }
    }
  }
}
</script>

<style>
.flint-hotel-title {
  font-size: 24px;
  font-family: "Playfair Display", serif;
}

.v-btn {
  margin: 0 30px;
  font-family: "Playfair Display", serif;
}
</style>