<template>
  <v-app>
    <v-main>
      <QnaView />
      <v-container class="mypage-container">
        <v-row justify="center">
          <MypageComponent />
          <v-col cols="9" justify="center">
            <v-card-title class="custom-title">
              <h1>탈퇴 요청</h1>
              <v-divider class="custom-divider"></v-divider>
              <v-card-text class="pa-4">
                <div>
                  {{ memberName }}님의 정보를 안전하게 보호하기 위해 비밀번호를 다시
                  한번 확인합니다.
                </div>
              </v-card-text>
              <v-card-text>
                <v-row>
                  <v-col cols="2"> 플린트 아이디 </v-col>
                  <v-col cols="10">
                    {{ memberEmail }}
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"> 비밀번호 </v-col>
                  <v-col cols="10">
                    <input v-model="password" type="password" />
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn @click="memberDelete()">확인</v-btn>
                </v-row>
              </v-card-text>
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MypageComponent from "@/components/MypageComponent.vue";
import QnaView from "../QnaView.vue";
import axios from "axios";

export default {
  components: {
    QnaView,
    MypageComponent,
  },
  date() {
    return {
      password: "",
      memberEmail: "",
      memberName: "",

    };
  },
  created() {
    this.memberEmail = localStorage.getItem("memberEmail")
    this.memberName = localStorage.getItem("memberName");
  },
  methods: {
    async memberDelete() {
      console.log("hi");
      try {
        const token = localStorage.getItem("membertoken");
        const headers = { Authorization: `Bearer ${token}` };
        console.log(this.password)
        await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/member/delete`,
          this.password,
          {
            // password 를 단순한 String 평문으로 Server 에 던저주기 위한 설정.
            headers: {
              ...headers,
              'Content-Type': 'text/plain' // Content-Type을 text/plain으로 설정
            }
          });
        alert("탈퇴 완료되었습니다.")
        localStorage.clear()
        this.$router.push({ name: "Flint" });
      } catch (e) {
        console.log("비어있음");
      }
    }
  },
}
</script>

<style scoped>
.v-card-title {
  color: #5e3701;
  /* 이미지에서 보여지는 색깔 */
}

.custom-divider {
  background-color: rgba(0, 0, 0, 1);
  /* 완전한 black 색상 */
  height: 4px;
  /* v-divider의 두께를 더 두껍게 설정 */
  opacity: 1;
}

.custom-title {
  font-family: "Playfair Display", serif;
  color: #787878;
  font-size: 20px;
}

.mypage-container {
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

.v-card-title {
  padding: 0;
  margin: 0;
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

.mypage-container input {
  border: 1px solid;
}

.input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
