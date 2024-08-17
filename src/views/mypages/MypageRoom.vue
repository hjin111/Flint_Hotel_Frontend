<template>
  <v-app>
    <v-main>
      <QnaView />
      <v-container class="reserve-container">
        <v-row justify="center">
          <MypageComponent />
          <v-col cols="9" justify="center">
            <v-card-title class="custom-title">
              <h1>예약확인 취소</h1>
              <p>객실 예약 내역을 확인하실 수 있습니다.</p>
              <v-col>
                <v-card>
                  <v-card-title class="custom-title">Room</v-card-title>
                  <v-card-text>
                    <v-data-table>
                      <thead>
                        <tr>
                          <th style="text-align: center;">예약번호</th>
                          <th style="text-align: center;">호텔</th>
                          <th style="text-align: center;">객실</th>
                          <th style="text-align: center;">체크인/<br />체크아웃</th>
                          <th style="text-align: center;">예약상태</th>
                          <th style="text-align: center;">상세정보</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="room in roomList" :key="room.no">
                          <td style="text-align: center;">{{ room.no }}</td>
                          <td style="text-align: center;">Seoul</td>
                          <td style="text-align: center;">{{ room.roomType }}</td>
                          <td style="text-align: center;">
                            {{ room.checkInDate }}/<br />
                            {{ room.checkOutDate }}
                          </td>
                          <td style="text-align: center;">
                            {{
                              reserveState(room.checkInDate, room.checkOutDate)
                            }}
                          </td>
                          <td style="text-align: center;">
                            <v-btn>상세보기</v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MypageComponent from "@/components/MypageComponent.vue";
import axios from "axios";
import QnaView from "../QnaView.vue";

export default {
  data() {
    return {
      roomList: [],
    };
  },
  async created() {
    try {
      // url 만 바꾸는 코드.. 근대 이게 맞나? 싶긴하다.
      history.pushState(null, null, "/mypage/room");
      const token = localStorage.getItem("membertoken");
      // {headers: {Authorization: 'Beare r 토큰 값'}}}
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/reserve/room/list`,
        { headers }
      );
      this.roomList = response.data.content;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    reserveState(checkIn, checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const today = new Date();
      if (checkInDate > today) {
        return "Y";
      } else if (checkInDate < today && checkOutDate > today) {
        return "X";
      } else if (checkOutDate < today) {
        return "N";
      }
    },
  },
  components: {
    MypageComponent,
    QnaView,
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
  overflow: hidden;
  /* Prevents overall page scrolling */
}

.background-image {
  background-image: url("@/assets/image.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.custom-title {
  font-family: "Playfair Display", serif;
  color: #787878;
  font-size: 20px;
}

.custom-title h1,
ul li {
  font-family: "Playfair Display", serif;
  border-bottom: 4px solid;
  color: black;
}

.reserve-container {
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
  flex-direction: row;
  /* Ensures radio buttons are inline */
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
  /* Ensures it takes up full column height for alignment */
  padding-top: 20px;
  padding-left: 20px;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}

.container {
  display: flex;
}

.sidebar {
  border-radius: 10px;
  padding-top: 10px;
  width: 250px;
  height: 80vh;
  background-color: #ded6f4;
  padding: 20px;
  justify-self: center;
}

.sidebar h2 {
  margin-top: 0;
  font-size: 1.5em;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar li h3 {
  margin: 0;
  font-size: 1.2em;
}

.sidebar li ul {
  padding-left: 20px;
  margin: 5px 0 0 0;
}

.sidebar li ul li {
  margin: 5px 0;
  font-size: 1em;
}

.sidebar h3 {
  border-bottom: 1px solid black;
}

.v-btn {
  margin: 0;
  font-family: "Playfair Display", serif;
  background-color: #ded6f4;
  border: none !important;
  box-shadow: none !important;
}

.v-btn:hover,
.v-btn:active {
  background: #ded6f4;
}

.v-btn:visited {
  background: #ded6f4;
}

.custom-size {
  width: 200px;
  height: 60px;
  justify-content: left;
}

.sidebar > a {
  text-decoration: none;
  color: black;
}

.user-profile {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-profile h1 {
  border-bottom: 4px solid black;
}
</style>
