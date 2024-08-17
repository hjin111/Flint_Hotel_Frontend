<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title">직원 정보</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <br>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Emp No</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="empNo"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Name</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="name"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Email</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="email"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Phone num</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="phoneNumber"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <br>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label"> Rank </div>
                                        </v-col>
                                        <v-select
                                        v-model="rank"
                                        :items="ranks"
                                        >
                                        </v-select>
                                        
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label"> Department </div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="department" 
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <div class="data-label">Date of Employee</div>
                                        </v-col>
                                        <v-col cols="12" md="8">
                                            <v-text-field v-model="empDate" 
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Gender</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="gender"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-row>
                                            <v-btn @click="modifyRank()"> 직급 변경</v-btn>
                                            <v-btn @click="confirmDelEmployee()">퇴사 처리</v-btn>
                                        </v-row>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="showConfirmDialog" max-width="400px">
            <v-card>
                <v-card-title class="headline">퇴사 처리 확인</v-card-title>
                <v-card-text>{{ modalMessage }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="handleConfirm">Yes</v-btn>
                    <v-btn color="red darken-1" text @click="closeDialog">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EmployeeView from '@/views/EmployeeView.vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
            name: "",
            empNo: "",
            email: "",
            phoneNumber: "",
            rank: "",
            department: "",
            empDate:"",
            gender:"",
            showConfirmDialog: false,
            ranks: ['사원', '대리', '과장', '부장', '이사', '사장'],
            modData: [],
            router: useRouter(),
            targetId: "",
            employeeRank: "",
            selectedEmployee: null,
            employee: "",
            employeeId: "",
        };
    },
    async created() {
        const employeeId = this.$route.query.id;
        console.log(this.employeeId)
        const response = await axios.get(`/employee/detail/${employeeId}`);
        const employeeDetail = response.data.result;
        console.log(employeeDetail);
        this.empNo = employeeDetail.employeeNumber
        this.name = employeeDetail.firstName + " " + employeeDetail.lastName
        this.email = employeeDetail.email
        this.phoneNumber = employeeDetail.phoneNumber
        this.rank = employeeDetail.employeeRank
        this.department = employeeDetail.department
        this.empDate = employeeDetail.dateOfEmployment
        this.gender = employeeDetail.gender
        this.targetId = employeeId; 
    },
    methods:{
        async modifyRank(){
            this.modData = {
                targetId: this.targetId,
                employeeRank: this.rank
            }
            console.log(this.modData)
            try{
                const response = await axios.put(`/employee/mod_rank`, this.modData)
                alert(response.data.status_message)
                window.location.reload()
            } catch(e){
                console.log(e)
            }
        },
        confirmDelEmployee() {
            this.modalMessage = `${this.name}님을 퇴사 처리 하시겠습니까?`
            this.showConfirmDialog = true
        },
        async handleConfirm() {
            try {
                const response = await axios.patch(`/employee/delaccount`, { employeeId: this.targetId })
                if (response.status === 200) {
                    console.log(response.data)
                    alert(response.data.status_message)
                    return this.router.push('/employee/office')
                }
            } catch (error) {
                alert('퇴사 처리 중 오류가 발생했습니다: ' + error.response?.data.message)
            }
        },
        closeDialog() {
            this.showConfirmDialog = false
            this.selectedEmployee = null
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
    flex-direction: column;
    padding-left: 40px;
    padding-right: 40px;
    overflow-y: hidden;
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
    height: 90%;
    overflow-y: auto;
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
</style>