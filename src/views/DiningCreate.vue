<template>
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-card>
            <v-card-title class="text-center text-h5" style="font-family: 'Playfair Display', serif; font-weight: 600;">
              DINING RESERVATION
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="diningReservation">
                <v-table style="font-family: 'Playfair Display', serif;">
                  <thead>
                    <tr>
                      <th class="text-center">SELECT</th>
                      <th class="text-center">ADULT</th>
                      <th class="text-center">CHILD</th>
                      <th class="text-center">
                        <v-btn @click="showCalendar">show Calendar</v-btn>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="button-group" style="padding-top: 10px;">
                        <v-btn @click="selectDining(1)">Korea</v-btn>
                        <v-btn @click="selectDining(2)">China</v-btn>
                        <v-btn @click="selectDining(3)">Japan</v-btn>
                        <v-btn @click="selectDining(4)">Lounge</v-btn>
                      </td>
                      <td style="padding-left: 60px; padding-top: 10px;">
                        <v-text-field type="number" v-model="adult" style="width: 70px;"></v-text-field>
                      </td>
                      <td style="padding-left: 55px; padding-top: 10px;">
                        <v-text-field type="number" v-model="child" style="width: 70px;"></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
  
                <v-card class="weatherview" style="margin-top: 10px; display: none;">
                  <v-card-text>
                    <v-row>
                        <v-col cols="5" style="padding-left: 50px">
                            <v-calendar
                                v-model:date="selectedDate"
                                :attributes="calendarAttributes"
                                is-range
                                is-month-picker
                                :style="{ width: '380px', height: '270px' }"
                                @dayclick="handleDateChange">
                            </v-calendar>
                          </v-col>
                      <v-col cols="6" class="d-flex flex-column">
                        <v-text-field
                          label="시간입력"
                          type="text"
                          required
                          dense
                          class="mb-2"
                          v-model="timeInput"
                        ></v-text-field>
                        <v-text-field
                          label="요청사항"
                          type="text"
                          required
                          v-model="comment"
                          style="height: 90px;"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row style="padding-left: 50px; padding-top: 10px; padding-bottom: 10px;">
                      <v-btn type="submit" class="text-center custom-btn">Reservation</v-btn>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedDate: null,
        timeInput: '',
        calendarAttributes: [], 
        adult: null,
        child: null,
        dining_id: null,
        comment: '',
      };
    },
    methods: {
      selectDining(id) {
        this.dining_id = id;
      },
      showCalendar() {
        const elements = document.getElementsByClassName('weatherview');
        elements[0].style.display = 'block';
      },
      handleDateChange(date) {
      console.log("Date received:", date);
      this.selectedDate = date;
      console.log("Selected Date:", this.selectedDate);
    },
      async diningReservation() {
        try {
          // 날짜와 시간을 합쳐서 reservationDateTime을 생성
          const reservationDateTime = `${this.selectedDate.id}`+"T"+`${this.timeInput}`;
  
          const reservationData = {
            adult: this.adult,
            child: this.child,
            dining_id: this.dining_id,
            reservationDateTime: reservationDateTime, // 합쳐진 날짜와 시간을 서버 전송
            comment: this.comment,
          };
  
          console.log(reservationData);
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/dining/create`, reservationData);
          
          alert('예약이 완료되었습니다.');
        } catch (error) {
          alert('예약에 실패했습니다.');
        }
      },
    },
  };
  </script>
  
  <style>
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .custom-btn {
    width: 980px; 
    height: 30px; 
  }
  </style>