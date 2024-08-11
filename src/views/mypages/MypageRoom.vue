<template>
    <div class="main">
        <h1> 예약확인 취소 </h1>
        <p>객실 예약 내역을 확인하실 수 있습니다.</p>
        <v-container class="dining-container">
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title class="custom-title">Room</v-card-title>
                        <v-card-text>
                            <v-data-table>
                                <thead>
                                    <tr>
                                        <th>예약번호</th>
                                        <th>호텔</th>
                                        <th>객실</th>
                                        <th>체크인/<br>체크아웃</th>
                                        <th>예약상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="room in roomList" :key="room.no">
                                        <td>{{ room.no }}</td>
                                        <td> Seoul </td>
                                        <td>{{ room.roomType }}</td>
                                        <td>{{ room.checkInDate }}/<br>
                                            {{ room.checkOutDate }}</td>
                                        <td> {{ reserveState(room.checkInDate, room.checkOutDate) }}</td>
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
            roomList: []
        }
    },
    async created() {
        try {
            // url 만 바꾸는 코드.. 근대 이게 맞나? 싶긴하다. 
            history.pushState(null, null, '/mypage/room');
            const token = localStorage.getItem('membertoken');
            // {headers: {Authorization: 'Bearer 토큰 값'}}}
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/reserve/room/list`, { headers });
            this.roomList = response.data.content;
        } catch (e) {
            console(e);
        }
    },
    methods: {
        reserveState(checkIn, checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const today = new Date();
            if (checkInDate > today) {
                return "Y";
            } else if (checkInDate < today && checkOutDate > today) {
                return "X";
            } else if (checkOutDate < today) {
                return "N";
            }
        }
    }
}
</script>

<style>
.dining-container {
    padding: 20px;
}

.main h1 {
    border-bottom: 4px solid black;
}

.main h5 {
    border-bottom: 1px solid;
}

.main p {
    font-size: 12px;
}
</style>