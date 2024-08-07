<template>
  <v-app>
    <v-main>
      <div class="background-image">
        <v-container class="reserve-container">
          <v-row justify="center">
            <v-col cols="3" align-self="center">
              <v-row class="sidebar">
                <a href="/mypage"><h2>마이페이지</h2></a>
                <ul>
                  <br />
                  <h3>예약 확인/취소</h3>
                  <ul>
                    <li>
                      <v-btn
                        class="custom-size"
                        @click="setDining"
                        >다이닝</v-btn>
                    </li>
                    <li>
                      <v-btn
                        class="custom-size"
                        @click="setRoom"
                        >객실</v-btn>
                    </li>
                  </ul>
                  <br />
                  <h3>쿠폰</h3>
                  <ul>
                    <li><v-btn class="custom-size">쿠폰함</v-btn></li>
                    <li><v-btn class="custom-size">프로모션 숙박권</v-btn></li>
                  </ul>
                  <br />
                  <h3>내정보</h3>
                  <ul>
                    <li><v-btn class="custom-size"
                      @click="setProfile"
                      >프로필 수정</v-btn></li>
                    <li><v-btn class="custom-size"
                      @click="updatePassword"
                      >비밀번호 변경</v-btn></li>
                    <li><v-btn class="custom-size"
                      @click="inquiryList"
                      >문의 내역</v-btn></li>
                    <li><v-btn class="custom-size"
                      @click="deactivation"
                      >회원 탈퇴</v-btn></li>
                  </ul>
                </ul>
              </v-row>
            </v-col>
            <v-col cols="9" justify="center">
              <div v-if="namepath == 'Mypage'" class="user-profile">
                <h1>사용자 정보</h1><br>
                <div>
                  <h2>{{ memberDetail.lastName + " " +memberDetail.firstName }} 님 안녕하세요.</h2>
                  <ul>
                    <li> 아이디 : {{ memberDetail.email }}</li>
                    <li> 국적 : {{ memberDetail.nation }}</li>
                    <li> 전화번호 : {{ memberDetail.phoneNumber }}</li>
                  </ul>
                </div>
              </div>
              <div v-if="namepath == 'MypageDining'">
                <MypageDining></MypageDining>
              </div>
              <div v-else-if="namepath == 'MypageRoom'">
                <MypageRoom></MypageRoom>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import MypageDining from "@/views/mypages/MypageDining.vue"
import MypageRoom from "@/views/mypages/MypageRoom.vue"
export default {
  components:{
    MypageDining,
    MypageRoom
  },
  data() {
    return {
      selectedBreakfast: "yes", // Default selection
      urlpath: "",
      namepath: "Mypage",
      memberDetail:[],
    };
  },
  async created(){
    try{
      const token = localStorage.getItem('membertoken');
        // {headers: {Authorization: 'Bearer 토큰 값'}}}
      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/detail`, {headers});
      this.memberDetail = response.data.result
      console.log(this.memberDetail)
    }catch(e){
      console("비어있음")
    }
  },
  methods: {
    setDining() {
      this.urlpath = "/mypage/dining";
      this.namepath = "MypageDining";
    },
    setRoom() {
      this.urlpath = "/mypage/room";
      this.namepath = "MypageRoom";
    },
    setProfile(){
      this.urlpath = "/mypage/profile";
    },
    updatePassword(){
      this.urlpath = "/mypage/updatepassword";
    },
    inquiryList(){
      this.urlpath = "/mypage/inquiryList";
    },
    deactivation(){
      this.urlpath = "/mypage/deactivation";
    },
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

.reserve-container {
  background-color: white;
  position: absolute;
  width: 90%;
  max-width: 1200px;
  height: 85vh;
  max-height: calc(100vh - 20px);
  top: 53%;
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
.v-btn:active{
  background: #ded6f4;
}
.v-btn:visited{
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
.user-profile h1{
  border-bottom: 4px solid black;;
}

</style>
