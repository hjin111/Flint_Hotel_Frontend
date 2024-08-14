<template>
    <!-- 네비게이션바 -->
    <v-app-bar app dark>
      <v-container>
        <!-- 행의 자식 요소들을 모두 중앙정렬  -->
        <v-row align="center">
            <!-- 콜 전체를 왼쪽정 렬되게 해줌 -->
            <v-col class="d-flex justify-start"> 
                <v-btn :to="{path:'/employee/member'}">Member</v-btn>
                <v-btn :to="{path:'/employee/task'}">Employee</v-btn>
            </v-col>
            <v-col class="text-center">
              <v-btn class="flint-hotel-title" :to="{path:'/employee'}">FLINT HOTEL</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn :to="{path:'/employee/dining'}">Dining</v-btn>
              <v-btn :to="{path:'/employee/room'}">Room</v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-app-bar>    
  </template>
    
  <script>
  export default {
  };
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