<template>
    <div class="main">
        <h1> 다이닝 예약 </h1>
        <v-container class="dining-container">
            <v-row>
                <v-col>
                    <v-card>
                        <!-- <v-card-title class="custom-title">Dining</v-card-title> -->
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
                                    <tr v-for="dl in diningList" :key="dl.no">
                                        <!-- <td>{{ dl.no }}</td> -->
                                        <td>{{ hotelname }}</td>
                                        <td>{{ dl.adultCnt + dl.childCnt }}</td>
                                        <td>{{ formatDate(q.writeTime) }}</td>
                                        <td></td>
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
    data(){
        return{
            diningList: []
        }
    },
    async created(){
        try{
        const token = localStorage.getItem('membertoken');
            // {headers: {Authorization: 'Bearer 토큰 값'}}}
        const headers = {Authorization: `Bearer ${token}`};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/reserve/room/list`, {headers});
        this.diningList = response.data.result;
        }catch(e){
            console(e);
        }
    }
}
</script>

<style>
.dining-container {
    padding: 20px;
}
.main h1{
    border-bottom: 4px solid black;
}
</style>