<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title"> Dining Reservation Info </v-card-title>
                        <v-card-text>
                            <v-row class="justify-end searchrow">
                                <v-col cols="12" md="6">
                                    <v-row>
                                        <v-col cols="12" md="2" class="emailcol">
                                            <div class="data-label">Email</div>
                                        </v-col>
                                        <v-col cols="12" md="7">
                                            <v-text-field class="tf" v-model="email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3" class="search">
                                            <v-btn @click="searchMember()" style="color: white;" color="#7A6C5B">Search</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-data-table class="elevation-1">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center;">Id</th>
                                                <th style="text-align: center;">Reserve Date</th>
                                                <th style="text-align: center;">Reserve Time</th>
                                                <th style="text-align: center;">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center" v-for="dining in diningReservations"
                                                :key="dining.id">
                                                <td>{{ dining.diningReservationId }}</td>
                                                <td>{{ formatDate(dining.reservationDateTime) }}</td>
                                                <td>{{ formatTime(dining.reservationDateTime) }}</td>
                                                <td>
                                                    <v-btn @click="diningDetail(dining.diningReservationId)">Detail</v-btn>
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
            diningReservations: [],
            diningDate: "",
            diningTime: "",
            diningReserve:[],
        };
    },
    methods: {
        async diningDetail(diningReservationId){

            this.$router.push({
                 path: `/employee/dining/detail/${diningReservationId}`
            });
        },
        async searchMember() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/dining/reserve`, {
                    params: {
                        email: this.email
                    },
                    headers: {
                        'Content-Type': 'text/plain' // 사실 GET 요청에서는 Content-Type을 설정할 필요가 없습니다.
                    }
                });
                console.log(response.data.result)
                this.diningReservations = response.data.result;
                console.log(this.diningReservations)
            } catch (e) {
                alert("입력값이 없습니다")
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
    overflow: scroll;
}

.custom-title {
    padding-left: 9%;
    font-family: "Noto Serif KR", serif;
    color: #787878;
    text-align: left;
    border-bottom: 3px solid;
}

.confirmation-card {
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    height: 90%;
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
.tf {
    margin-right: -20px;
    padding-top:20px;
}
.search {
    padding-top: 40px;
}
.searchrow {
    margin-right: -20px;
    margin-bottom: -40px;
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
}
.emailcol {
    margin-right: -20px;
}
</style>