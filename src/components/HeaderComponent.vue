<template>
    <!-- <div class="page-container"> -->
      <v-app-bar app color="transparent" flat class="login-nav">
        <v-container>
          <v-row justify="end">
            <v-btn text style="font-size: 13px" v-if="!isLogin">LOGIN</v-btn>
            <v-btn text style="font-size: 13px" v-if="!isLogin">JOIN</v-btn>
            <v-btn text style="font-size: 13px" v-if="isLogin">MYPAGE</v-btn>
            <v-btn text style="font-size: 13px" v-if="isLogin">LOGOUT</v-btn>
            <v-btn text style="font-size: 13px">INQUIRY</v-btn>
          </v-row>
        </v-container>
      </v-app-bar>
  
      <v-app-bar app color="transparent" flat class="top-nav">
        <v-container>
          <v-row justify="center" class="button-row" style="padding-right: 60px;">
            <v-btn text>INTRODUCE</v-btn>
            <v-btn text>RESERVATION</v-btn>
            <v-btn text style="font-size: 40px;">FLINT HOTEL</v-btn>
            <v-btn text>DINING</v-btn>
            <v-btn text>ROOM</v-btn>
          </v-row>
        </v-container>
      </v-app-bar>
  
      <!-- <div class="image-container">
        <img src="@/assets/image.png" alt="background image">
      </div> -->
    <!-- </div> -->
  </template>
  
  <script>
  export default {
    data(){
        return{
            isLogin : false
        }
        
    }
  };
  </script>
  
  <style scoped>
  .page-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .login-nav {
    position: absolute;
    top: 10px; /* 로그인 네비게이션의 위치 */
    right: 0;
    z-index: 10;
  }
  
  .top-nav {
    position: absolute;
    top: 0px; /* 상단 네비게이션의 위치 */
    width: 93%;
    z-index: 10;
  }
  
  .button-row {
    gap: 45px;
  }
  
  .v-btn {
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 1;
    color:black;
  }
  
  .image-container {
    width: 100%;
    height: 100%;
  }
  
  .image-container img {
    width: 1519.2px;
    height: 740px;
    position: relative;
  }
  </style>
  