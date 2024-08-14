<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title"> Member Room Reservation Info </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-row>
                                        <v-col cols="12" md="2">
                                            <div class="data-label">Email</div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="email" style="padding-top: 20px;"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="2" class="search">
                                            <v-btn @click="searchMember()">검색</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <br>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-data-table class="elevation-1">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center;">Id</th>
                                                <th style="text-align: center;">Check In Date</th>
                                                <th style="text-align: center;">Check Out Time</th>
                                                <th style="text-align: center;">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center" v-for="room in roomReservations" :key="room.id">
                                                <td>{{ room.roomReservationId }}</td>
                                                <td>{{ room.reservationCheckin }}</td>
                                                <td>{{ room.reservationCheckout }}</td>
                                                <td>
                                                    <v-btn>Detail</v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-data-table>
                                </v-col>
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
            email: "",
            roomReservations: [],
        };
    },
    methods: {
        async searchMember() {
            try {
                const token = localStorage.getItem('employeetoken');
                // {headers: {Authorization: 'Bearer 토큰 값'}}}
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/list_reserve`, {
                    params: {
                        email: this.email
                    },
                    headers: {
                        ...headers,
                        'Content-Type': 'text/plain' // 사실 GET 요청에서는 Content-Type을 설정할 필요가 없습니다.
                    }
                });
                this.roomReservations = response.data.result.roomReservations;
                console.log(this.roomReservations)
            } catch (e) {
                alert(e)
            }
        },
        formatDate(dateString) {
            const dateOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            };
            const datePart = new Date(dateString).toLocaleDateString(
                undefined,
                dateOptions
            );
            return datePart;
        },
        formatTime(dateString) {
            const timeOptions = {
                hour: "2-digit",
                minute: "2-digit",
            };
            const timePart = new Date(dateString).toLocaleTimeString(
                undefined,
                timeOptions
            );
            return timePart;
        },
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
    overflow: hidden;
}

.custom-title {
    padding-left: 9%;
    font-family: "playfire Display", serif;
    color: #787878;
    text-align: left;
    border-bottom: 3px solid;
}

.confirmation-card {
    margin-top: 15px;
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Playfair Display", serif;
    box-shadow: none;
    height: 90%;
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

.search {
    padding-top: 40px;
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
    padding-top: 40px;
    padding-left: 20px;
}
</style>