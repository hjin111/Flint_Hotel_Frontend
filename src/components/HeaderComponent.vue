<template>
      <v-app-bar app color="transparent" flat class="login-nav">
        <v-container>
          <v-row justify="end">
            <v-btn text style="font-size: 13px; color:#FFFFFF" v-if="!isLogin">LOGIN</v-btn>
            <v-btn text style="font-size: 13px; color:#FFFFFF" v-if="!isLogin">JOIN</v-btn>
            <v-btn text style="font-size: 13px; color:#FFFFFF" v-if="isLogin">MYPAGE</v-btn>
            <v-btn text style="font-size: 13px; color:#FFFFFF" v-if="isLogin">LOGOUT</v-btn>
            <v-btn text style="font-size: 13px; color:#FFFFFF">INQUIRY</v-btn>
          </v-row>
        </v-container>
      </v-app-bar>
  
      <v-app-bar app color="transparent" flat class="top-nav">
        <v-container>
          <v-row justify="center" class="button-row" style="padding-right: 30px;">
            <v-btn text style="color:#FFFFFF">INTRODUCE</v-btn>
            <v-btn text style="color:#FFFFFF">RESERVATION</v-btn>
            <v-btn text style="font-size: 40px; color:#FFFFFF">FLINT HOTEL</v-btn>
            <v-btn text style="color:#FFFFFF">DINING</v-btn>
            <v-btn text style="color:#FFFFFF">ROOM</v-btn>
          </v-row>
        </v-container>
      </v-app-bar>

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
  
  <style>  
  .login-nav {
    z-index: 10;
  }
  
  .top-nav {
    z-index: 10;
  }
  
  .button-row {
    gap: 70px;
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
  