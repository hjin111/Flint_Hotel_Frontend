<template>
    <v-app>
      <v-main>
        <div class="background-image">
          <v-container class="reserve-contianer">
            <v-row>
              <v-col>
                <v-card>
                  <v-card-title class="text-center custom-title">Room Reservation</v-card-title>
                  <v-card-text>
                    <v-row justify="center" align="center">
          
                      <v-col cols="12" md="2">
                        <div class="date-label">Select hotel</div>
                        <v-select :items="hotels" label="선택하세요." class="mx-2" outlined v-model="selectedHotel" ></v-select>
                      </v-col>
                      <!-- check in -->
                      <v-col cols="12" md="2">
                        <div class="date-label">Check In</div> 
                        <v-menu
                          v-model="menuCheckIn"
                          :close-on-content-click="false"
                          :nudge-bottom="12"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-bind="attrs"
                              v-on="on"
                              class="mx-2"
                              outlined
                              :value="formattedCheckInDate"
                              readonly
                              @click="menuCheckIn = true"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="checkInDate"
                            @input="closeCheckInMenu"
                            no-title
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <!-- check out -->
                      <v-col cols="12" md="2">
                        <div class="date-label">Check Out</div> 
                        <v-menu
                          v-model="menuCheckOut"
                          :close-on-content-click="false"
                          :nudge-bottom="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-bind="attrs"
                              v-on="on"
                              class="mx-2"
                              outlined
                              :value="formattedCheckOutDate"
                              readonly
                              @click="menuCheckOut = true" 
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="checkOutDate"
                            @input="closeCheckOutMenu"
                            no-title
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
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import dayjs from 'dayjs';
  export default {
    name: "RoomReservationComponent",
    data() {
      return {
        menuCheckIn: false,
        menuCheckOut: false,
        hotels: ["Hotel A", "Hotel B", "Hotel C"], 
        selectedHotel: null,
        checkInDate: null,
        checkOutDate: null,
        numAdults: 0, // Separate state for adults
        numChildren: 0, // Separate state for children
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
      searchRooms() {
        // Implement room search logic
        console.log('Searching rooms...');
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
  
  .background-image {
    background-image: url('@/assets/image.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .reserve-contianer {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 90vh; /* Increase the height from 90vh to 95vh */
    max-height: calc(100vh - 20px); /* Adjust max-height for more space */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
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
    margin-left: 6px !important; /* Reduced margin */
    margin-right: 6px !important; /* Reduced margin */
  }
  
  .v-card-text {
    padding: 0 8px; /* Reduced padding */
  }
  </style>