<template>
    <div class="main">
        <h1> 예약확인 취소 </h1>
        <p>온라인 예약에 한해 조회 가능합니다.</p>
        <v-container class="dining-container">
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title class="custom-title">Dining</v-card-title>
                        <v-card-text>
                            <v-data-table>
                                <thead>
                                    <tr>
                                        <!-- <th>예약번호</th> -->
                                        <th>호텔</th>
                                        <th>레스토랑</th>
                                        <th>예약인원</th>
                                        <th>예약일</th>
                                        <th>예약상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="dining in diningList" :key="dining.no">
                                        <!-- <td></td> -->
                                        <td> Seoul </td>
                                        <td> {{ dining.diningName }}</td>
                                        <td> {{ dining.adult + dining.child }}</td>
                                        <td> {{ formatDate(dining.reservationDateTime) }}<br>
                                            {{ formatTime(dining.reservationDateTime) }}</td>
                                        <td> {{ reserveState(dining.reservationDateTime) }} </td>
                                    </tr>
                                </tbody>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            diningList: [],
        }
    },
    async created() {
        try {
            history.pushState(null, null, '/mypage/dining');
            const token = localStorage.getItem('membertoken');
            // {headers: {Authorization: 'Bearer 토큰 값'}}}
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/reserve/dining/userList`, { headers });
            this.diningList = response.data.result;
        } catch (e) {
            console(e);
        }
    },
    methods: {
        formatDate(dateString) {
            const dateOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            };
            const datePart = new Date(dateString).toLocaleDateString(undefined, dateOptions);
            return datePart;
        },
        formatTime(dateString) {
            const timeOptions = {
                hour: "2-digit",
                minute: "2-digit",
            };
            const timePart = new Date(dateString).toLocaleTimeString(undefined, timeOptions);
            return timePart;
        },
        reserveState(reserveTime) {
            const today = new Date();
            reserveTime = new Date(reserveTime);
            if (today > reserveTime) {
                return "Y";
            } else {
                return "N";
            }
        }
    },
}
</script>

<style>
.dining-container {
    padding: 20px;
}

.main h1 {
    border-bottom: 4px solid black;
}

.main p {
    font-size: 12px;
}
</style>