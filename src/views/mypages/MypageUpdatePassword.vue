<template>
  <v-app>
    <v-main>
      <QnaView />
      <v-container class="mypage-container">
        <v-row justify="center">
          <MypageComponent />
          <v-col cols="9" justify="center">
            <v-card-title class="custom-title">
              <h1>비밀번호 변경</h1>
              <h5>고객님의 정보를 언제든지 확인, 변경하실 수 있습니다</h5>
              <v-col>
                <v-card>
                  <v-card-text>
                    <v-row>
                      <!-- 색 뭘루 하지..? -->
                      <v-col cols="2" style="background-color: white">
                        현재 비밀번호
                      </v-col>
                      <!-- 안보여서 임시로 해둠 -->
                      <v-col cols="10" style="background-color: white">
                        <input
                          type="password"
                          v-model="beforePassword"
                          id="beforeInput"
                          placeholder="현재 비밀번호"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2"> 새 비밀번호 </v-col>
                      <v-col cols="10">
                        <input
                          v-model="afterPassword"
                          type="password"
                          placeholder="새 비밀번호"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2"> 새 비밀번호 확인 </v-col>
                      <v-col cols="10">
                        <input
                          v-model="passwordCheck"
                          type="password"
                          placeholder="새 비밀번호 확인"
                          @input="checkPassword"
                        />
                        <p class="messageClass">{{ message }}</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <br />
                <v-btn @click="passwordUpdate()">비번 변경</v-btn>
              </v-col>
            </v-card-title>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import QnaView from "../QnaView.vue";
import MypageComponent from "@/components/MypageComponent.vue";

export default {
  data() {
    return {
      beforePassword: "",
      afterPassword: "",
      passwordCheck: "",
      message: "비밀번호가 일치하지 않습니다.",
    };
  },
  computed: {
    isCorrect() {
      return this.afterPassword === this.passwordCheck;
    },
  },
  methods: {
    async passwordUpdate() {
      try {
        const token = localStorage.getItem("membertoken");
        // {headers: {Authorization: 'Bearer 토큰 값'}}}
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.put(
          `${process.env.VUE_APP_API_BASE_URL}/member/modify`,
          {
            beforePassword: this.beforePassword,
            afterPassword: this.afterPassword,
          },
          { headers }
        );
        console.log("비밀번호가 성공적으로 업데이트되었습니다:", response.data);
      } catch (e) {
        console(e);
      }
    },
    checkPassword() {
      if (this.isCorrect) {
        this.message = "비밀번호가 일치합니다.";
      } else {
        this.message = "비밀번호가 일치하지 않습니다.";
      }
    },
  },
  components: {
    QnaView,
    MypageComponent,
  },
};
</script>

<style scoped>
.custom-title {
  font-family: "Playfair Display", serif;
  color: #787878;
  font-size: 20px;
}

.custom-title h1{
  font-family: "Playfair Display", serif;
  border-bottom: 4px solid;
  color: black;
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

.sidebar {
  border-radius: 10px;
  padding-top: 10px;
  width: 250px;
  height: 80vh;
  background-color: #ded6f4;
  padding: 20px;
  justify-self: center;
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
