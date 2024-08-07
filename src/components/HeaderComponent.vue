<template>
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
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-left:auto; margin-right:-20px;" v-if="!isLogin">LOGIN</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="!isLogin">JOIN</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="isLogin">MYPAGE</v-btn>
        <v-btn text style="font-size: 13px; color:#FFFFFF; margin-right:-20px;" v-if="isLogin">LOGOUT</v-btn>
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
      },
      beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      },
      methods: {
        handleScroll() {
          this.isScrolled = window.scrollY > 50;
        },
      },
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