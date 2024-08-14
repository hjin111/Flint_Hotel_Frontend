<template>
  <div>
  <FlintView />
  <v-container class="reserve-contianer">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center custom-title">Room Reservation</v-card-title>
          <v-card-text>
            <v-row justify="center" align="center">
  
              <v-col cols="12" md="2">
                <div class="date-label">Select hotel</div>
                <v-select :items="hotels" label="선택하세요." class="mx-2" outlined v-model="selectedLocation" ></v-select>
              </v-col>
              <!-- check in -->
              <v-col cols="12" md="2">
                <div class="date-label">Check In</div> 
                <v-menu v-model="menuCheckIn">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      :value="formattedCheckInDate"
                      readonly
                      @click="menuCheckIn = true"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="checkInDate"
                    @input="closeCheckInMenu"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- check out -->
              <v-col cols="12" md="2">
                <div class="date-label">Check Out</div> 
                <v-menu v-model="menuCheckOut">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      :value="formattedCheckOutDate"
                      readonly
                      @click="menuCheckOut = true" 
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="checkOutDate"
                    @input="closeCheckOutMenu"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="2">
                <div class="date-label">Adult</div> 
                  <v-text-field type="number" outlined class="mx-2" v-model="numAdults" min="1" ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <div class="date-label">Child</div> 
                  <v-text-field type="number" outlined class="mx-2" v-model="numChildren" min="1" ></v-text-field>
              </v-col>
              <v-col cols="12" md="2" class="d-flex align-center justify-center">
                <v-btn class="custom-search-btn mx-2" style="height: 50px; width: 70%;" @click="searchRooms">Search</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- 객실 목록 -->
        <v-row v-if="showRoom">
          <v-col>
            <v-card>
              <v-card-text>
                <v-table>
                  <thead>
                    <tr>
                      <th>Room Image</th>
                      <th>Room Name</th>
                      <th>Room Base Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(room, index) in roomList" :key="index">
                      <td>이미지</td>
                      <td>{{ room.roomTypeName }}</td>
                      <td>{{ room.roomPrice.toLocaleString() }}원 ~</td>
                      <td>
                        <v-btn @click="selectRoom(index)" style="color: white;" color="#CFB18E">Select</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row> 
      </v-col>
    </v-row>
  </v-container>
</div>
</template>
  
  <script>
  import FlintView from '@/views/FlintView.vue';
  import dayjs from 'dayjs';
  import axios from 'axios';

  export default {
    components: {
      FlintView // flintView 가져와 사용 
    },
    name: "RoomReservationComponent",
    data() {
      return {
        hotels: ["Seoul"], 
        selectedLocation: null,

        checkInDate: null,
        checkOutDate: null,
        menuCheckIn: false,
        menuCheckOut: false,

        numAdults: 0, 
        numChildren: 0,
        roomList:[],
        showRoom: false
      };
    },
    computed: {
      formattedCheckInDate() {
        return this.checkInDate ? dayjs(this.checkInDate).format('YYYY-MM-DD') : '';
      },
      formattedCheckOutDate() {
        return this.checkOutDate ? dayjs(this.checkOutDate).format('YYYY-MM-DD') : '';
      },
    },
    methods: {
      closeCheckInMenu() {
        this.menuCheckIn = false;
      },
      closeCheckOutMenu() {
        this.menuCheckOut = false;
      },
      async searchRooms() {
        const params = {
          checkInDate: this.formattedCheckInDate,
          checkOutDate: this.formattedCheckOutDate,
        };

        try {
          console.log('start');
          const token = localStorage.getItem('membertoken');
          const headers = {Authorization: `Bearer ${token}`};

          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/reserve/room/remain`, {params, headers});
          console.log(response);
          this.roomList = response.data;

          this.showRoom = true;
        } catch (error) {
          console.error('Error: ', error);
        }
      },
      selectRoom(index) {
        const selectedRoom = this.roomList[index];

        // 체크인/아웃 날짜, 성인/아이 수, 선택한 방정보 localstorage에 저장 
        localStorage.setItem('checkInDate', this.formattedCheckInDate);
        localStorage.setItem('checkOutDate', this.formattedCheckOutDate);
        localStorage.setItem('numAdults', this.numAdults);
        localStorage.setItem('numChildren', this.numChildren);

        // 선택한 방 정보 -> 직렬화해서 localstorage에 넣기 
        localStorage.setItem('selectedRoom', JSON.stringify({
          roomId: selectedRoom.roomId,
          roomTypeName: selectedRoom.roomTypeName,
          roomPrice: selectedRoom.roomPrice
        }));

        this.$router.push('/reserve/room/description');
        
      }
    }
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
    }
    
    .reserve-contianer {
      background-color: white;
      position: absolute;
      width: 90%;
      max-width: 1200px;
      height: 80%;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      overflow-y: auto;
    }
    
    .custom-title {
      font-family: "Playfair Display", serif;
      color: #787878;
      font-size:18px;
    }
    
    .custom-search-btn {
      max-width: 200px; 
      border-radius: 5px;
      color: white; 
      background-color: #7A6C5B;
      transition: background-color 0.3s ease; 
    }
    .date-label {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 4px;
      color: #787878;
      margin-left: 8px;
      display: block; 
      text-align: left; 
    }
    .mx-2 {
      margin-left: 6px !important;
      margin-right: 6px !important;
    }

    .v-card-text {
      padding: 0 8px; /* Reduced padding */
    }
  </style>