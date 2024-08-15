<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title">Modify Reservation Detail</v-card-title>
                        <br>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <!-- 왼쪽 열 -->
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Room Type</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="roomType"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Check In</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="checkin"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Check out</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="checkout"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Adult</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="adultCnt" 
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Child</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="childCnt"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    
                                </v-col>
                                <!-- 오른쪽 열 -->
                                <v-col cols="12" md="6">
                                    
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div class="data-label">Parking Option</div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="parkingYN"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div class="data-label">Breakfast Option (Adult)</div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="adultBfCnt" 
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div class="data-label">Breakfast Option (Child)</div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="childBfCnt"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="2">
                                            <div class="data-label">Request</div>
                                        </v-col>
                                        <v-col cols="12" md="10">
                                            <v-textarea v-model="requestContents"
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row class="justify-end">
                                <v-btn @click="modDetail()" style="color: white; background-color: #7A6C5B; margin-top: 20px;">Submit</v-btn>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import EmployeeView from '@/views/EmployeeView.vue';
import axios from '@/axios';

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
            roomType: "",
            checkin: "",
            checkout: "",
            adultCnt: "",
            childCnt: "",
            adultBfCnt: "",
            childBfCnt: "",
            parkingYN: "",
            requestContents: ""
        };
    },
    created() {
        const reserveId = this.$route.params.id;
        console.log("Id: ", reserveId);
        this.fetchRoomReserveId(reserveId);
    },
    methods: {
        async fetchRoomReserveId(reserveId) {

            try {
                const response = await axios.get(`/employee/room/reserve/${reserveId}`);
                console.log("response: ", response.data);
                const reservationDetail = response.data.infoRoomDetResDto;

                this.roomType = reservationDetail.roomType
                this.checkin = reservationDetail.checkin
                this.checkout = reservationDetail.checkout
                this.parkingYN = reservationDetail.parkingYN
                this.adultCnt = reservationDetail.adultCnt
                this.childCnt = reservationDetail.childCnt
                this.adultBfCnt = reservationDetail.adultBfCnt
                this.childBfCnt = reservationDetail.childBfCnt
                this.requestContents = reservationDetail.requestContents

            } catch(e) {
                if (e.response) {
                    console.error("Error Status:", e.response.status);  
                    console.error("Error Data:", e.response.data); 
                } else {
                    console.error("Error Message:", e.message);
                }
            
            }
        },
        async modDetail() {
            try {
                const reserveId = this.$route.params.id;
                const params = {
                    roomType: this.roomType,
                    checkin: this.checkin,
                    checkout: this.checkout,
                    parkingYN: this.parkingYN,
                    adultCnt: this.adultCnt,
                    childCnt: this.childCnt,
                    adultBfCnt: this.adultBfCnt,
                    childBfCnt: this.childBfCnt,
                    requestContents: this.requestContents
                }
                const response = await axios.post(`/employee/room/modify/${reserveId}`, params);
                console.log(response);

                this.$router.push(`/employee/room/${reserveId}`);
            } catch(e) {
                if (e.response) {
                    console.error("Error Status:", e.response.status);  
                    console.error("Error Data:", e.response.data); 
                } else {
                    console.error("Error Message:", e.message);
                }
            }
        }
    }
};
</script>

<style scoped>
.content-container {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 80%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto;
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
    overflow-y: auto;
}

.confirmation-card {
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    height: auto;
    border: none;
    box-shadow: none;
}

.confirmation-title {
    font-size: 20px;
    font-weight: bold;
    color: #787878;
    text-align: left;
    border-bottom: 3px solid #787878;
    font-family: "Noto Serif KR", serif;
}

.section-title {
    font-size: 17px;
    font-weight: bold;
    color: #787878;
    padding-left: 17px;
    padding-bottom: 20px;
    font-family: "Noto Serif KR", serif;
}

.v-radio-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex-direction: row;
}

.v-radio {
    margin-right: 10px;
}

.v-card-title {
    padding: 0;
    margin: 0;
}

.data-label {
    font-size: 14px;
    font-weight: bold;
    color: #787878;
    display: flex;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
}
.leftbtn {
    margin-right: 2px;
  }
</style>