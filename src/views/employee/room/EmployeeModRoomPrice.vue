<template>
    <div>
        <BackGround />
        <v-container class="main-container">
            <v-row justify="center" align="center" class="box-container">
                <v-col cols="12" class="departmentHeader">
                    객실 가격 관리
                </v-col>
                <v-simple-table>
                    <tbody>
                        <tr v-for="r in reversedRoomList" :key="r.id">
                            <td class="name-column-value">{{ r.roomTypeName }}</td>
                            <td class="price-column-value">
                                <v-text-field v-model="r.roomTypePrice" solo dense hide-details type="number"
                                    :readonly="!editMode" />
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <v-col cols="12" class="menuButton">
                    <v-btn color="primary" @click="toggleEditMode">
                        {{ editMode ? '저장' : '수정' }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from '@/axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'
import BackGround from '@/components/user/employee/EmployeeBasicComponent.vue'

export default {
    components: {
        BackGround
    },
    data() {
        return {
            department: '',
            router: useRouter(),
            roomList: [],
            editMode: false,  // 수정 모드 상태 관리
        }
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
            const token = localStorage.getItem('employeetoken')
            if (token) {
                const decodedToken = jwtDecode(token)
                this.department = decodedToken.department

                if (this.department === 'Room') {
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
}
</script>

<style scoped>
.main-container {
    max-width: 1200px;
    padding-top: 360px;
    position: relative;
}

.box-container {
    max-width: 600px;
    border: 1px solid #ccc;
    margin-left: 300px;
    margin-top: 50px;
    padding: 20px;
    background-color: white;
}

.departmentHeader {
    color: white;
    background-color: gray;
    font-size: 20px;
    text-align: center;
    padding: 10px 0;
}

.menuButton {
    text-align: center;
    margin-top: 20px;
}
</style>
