<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-card class="vCard">
                <v-card-title class="vCardTitle">객실 가격 관리</v-card-title>
                <v-card-text class="vCardText">
                    <tbody>
                        <tr v-for="r in reversedRoomList" :key="r.id">
                            <td>{{ r.roomTypeName }}</td>
                            <td style="padding-top:10px; padding-left:10px;">
                                <v-text-field
                                    v-model="r.roomTypePrice"
                                    solo
                                    dense
                                    hide-details
                                    type="number"
                                    :readonly="!editMode"
                                />
                            </td>
                        </tr>
                    </tbody>
                    <br>
                    <v-btn class="vBtn" @click="toggleEditMode" 
                    style="margin-left:-20px; color: white; background-color:#7A6C5B"
                    block>
                        {{ editMode ? 'Submit' : 'Modify' }}
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import EmployeeView from '@/views/EmployeeView.vue';
import axios from '@/axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
            department: '',
            router: useRouter(),
            roomList: [],
            editMode: false,  // 수정 모드 상태 관리
        };
    },
    computed: {
        reversedRoomList() {
            return [...this.roomList].reverse();
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        async initialize() {
            console.log("hihi");
            const token = localStorage.getItem('employeetoken')
            if (token) {
                const decodedToken = jwtDecode(token)
                this.department = decodedToken.department

                if(this.department === 'Room'){
                    const response = await axios.get(`/employee/room/roominfo`)
                    this.roomList = response.data.result
                } else {
                    alert("접근 권한이 없습니다.")
                    this.router.push('/employee')
                }
            } else {
                this.router.push('/employee/login');
            }
        },
        toggleEditMode() {
            if (this.editMode) {
                // 저장 모드일 때
                this.savePrices();
            } else {
                // 수정 모드로 전환
                this.editMode = true;
            }
        },
        async savePrices() {
            try {
                const requests = this.roomList.map(room => 
                    axios.patch(`/employee/room/modprice/${room.id}`, { newPrice: room.roomTypePrice })
                );
                await Promise.all(requests);
                alert('가격 수정이 완료되었습니다.');
                this.editMode = false;  // 저장 완료 후 수정 모드 종료
            } catch (error) {
                console.error('가격 수정 중 오류가 발생했습니다:', error);
                alert('가격 수정 중 오류가 발생했습니다.');
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
    padding-top: 3%;
}
.vCard {
    font-family: "Noto Serif KR", serif;
    margin: 0 auto; /* Center horizontally */
    align-items: center; 
    width: 50%;
}
.vCardTitle {
    text-align: center;
    background-color: #DCC8B0;
}
.vCardText {
    text-align: center;
    padding-left: 10%;
}
</style>