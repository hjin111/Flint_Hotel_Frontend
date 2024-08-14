<template>
  <div>
  <v-app-bar
      app
      color="transparent"
      flat
      class="login-nav"
      v-show="!isScrolled"
      :style="{ transition: 'transform 0.3s ease-in-out', transform: isScrolled ? 'translateY(-100%)' : 'translateY(0)' }"
    >
    <v-container>
      <v-row>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-left:auto; margin-right:-20px;" v-if="!isLogin" @click="login()">LOGIN</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="!isLogin">JOIN</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-left:auto; margin-right:-20px;" v-if="isLogin">MYPAGE</v-btn>
        <!-- 바로 위, 아래 수정 -->
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="isLogin" @click="logout()">LOGOUT</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;">INQUIRY</v-btn>
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
        <v-btn text style="color:#FFFFFF">RESERVATION</v-btn>
        <v-btn text style="font-size: 40px; color:#FFFFFF">FLINT HOTEL</v-btn>
        <v-btn text style="color:#FFFFFF">DINING</v-btn>
        <v-btn text style="color:#FFFFFF">ROOM</v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</div>
</template>

<script>
export default {
    data(){
        return{
            isLogin : false,
            isScrolled: false, 
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        this.checkLoginStatus() // 여기 추가
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
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
    }
  }
};
</script>

<style>  
  .login-nav {
  z-index: 10;
  }
  .top-nav {
  z-index: 10;
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