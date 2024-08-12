<template>
      <v-app-bar app color="transparent" flat class="login-nav">
        <v-container>
          <v-row justify="end">
            <v-btn text style="font-size: 13px; color:#000000" v-if="!isLogin">LOGIN</v-btn>
            <v-btn text style="font-size: 13px; color:#000000" v-if="!isLogin">JOIN</v-btn>
            <v-btn text style="font-size: 13px; color:#000000" v-if="isLogin">MYPAGE</v-btn>
            <v-btn text style="font-size: 13px; color:#000000" v-if="isLogin">LOGOUT</v-btn>
            <v-btn text style="font-size: 13px; color:#000000">INQUIRY</v-btn>
          </v-row>
        </v-container>
      </v-app-bar>
  
      <v-app-bar app color="transparent" flat class="top-nav">
        <v-container>
          <v-row justify="center" class="button-row" style="padding-right:90px;">
            <v-btn text style="color:#000000; font-size: 18px; line-height: 1;">INTRODUCE</v-btn>
            <v-btn text style="color:#000000; font-size: 18px; line-height: 1;">RESERVATION</v-btn>
            <v-btn text style="font-size: 40px; color:#000000; line-height: 1;">FLINT HOTEL</v-btn>
            <v-btn text style="color:#000000;  font-size: 18px; line-height: 1;">DINING</v-btn>
            <v-btn text style="color:#000000;  font-size: 18px; line-height: 1;">ROOM</v-btn>
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
    gap: 60px;
  }
  
  .v-btn {
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-weight: 500;
  }
  
  </style>
  