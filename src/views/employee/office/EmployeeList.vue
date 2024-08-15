<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title">직원 목록</v-card-title>
                        <br>
                        <v-card-text>
                            <!-- 검색 바 추가 -->
                            <v-row class="d-flex justify-content-between align-items-center search-bar">
                                <v-col cols="2">
                                    <v-select
                                        v-model="searchType"
                                        :items="searchOptions"
                                        item-title="text"
                                        item-value="value"
                                        dense
                                        hide-details
                                        class="search-type"
                                    >
                                    </v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="searchValue"
                                        label="검색어 입력"
                                        dense
                                        hide-details
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn @click="searchEmployees" color="grey" elevation="0" outlined>검색</v-btn>
                                </v-col>
                            </v-row>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-data-table :items="filteredEmployees" class="elevation-1">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center;">First Name</th>
                                                <th style="text-align: center;">Last Name</th>
                                                <th style="text-align: center;">Employee Number</th>
                                                <th style="text-align: center;">Email</th>
                                                <th style="text-align: center;">Department</th>
                                                <th style="text-align: center;">Actions</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center" v-for="m in filteredEmployees" :key="m.id">
                                                <td>{{ m.firstName }}</td>
                                                <td>{{ m.lastName }}</td>
                                                <td>{{ m.employeeNumber }}</td>
                                                <td>{{ m.email }}</td>
                                                <td>{{ m.department }}</td>
                                                <td>
                                                    <v-btn @click="confirmDelEmployee(m)">퇴사 처리</v-btn>
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

        <!-- 퇴사 처리 확인 모달 -->
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
import EmployeeView from '@/views/EmployeeView.vue'
import axios from '@/axios'
import { useRouter } from 'vue-router'

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
            employee: [],
            filteredEmployees: [],  // 필터링된 결과를 저장
            searchType: '',
            searchValue: '',
            searchOptions: [
                { text: '선택', value: '' },
                { text: '직원 번호', value: 'employeeNumber' },
                { text: '부서', value: 'department' },
                { text: '이메일', value: 'email' },
            ],
            showConfirmDialog: false, 
            selectedEmployee: null,  
            modalMessage: '',  
            router: useRouter(),
        }
    },
    async created() {
        this.fetchEmployees()
    },
    methods: {
        async fetchEmployees() {
            const response = await axios.get(`/employee/list`)
            this.employee = response.data.result
            this.filteredEmployees = this.employee.filter(emp => emp.delYN === 'N')
        },
        searchEmployees() {
            if (!this.searchType || !this.searchValue) {
                this.filteredEmployees = this.employee.filter(emp => emp.delYN === 'N')
                return
            }

            this.filteredEmployees = this.employee.filter((emp) => {
                const field = emp[this.searchType] ? emp[this.searchType].toString().toLowerCase() : ''
                return emp.delYN === 'N' && field.includes(this.searchValue.toLowerCase())
            });
        },
        confirmDelEmployee(employee) {
            this.selectedEmployee = employee
            this.modalMessage = `${employee.firstName} ${employee.lastName}님을 퇴사 처리 하시겠습니까?`
            this.showConfirmDialog = true
        },
        async handleConfirm() {
            if (this.selectedEmployee) {
                try {
                    const response = await axios.patch(`/employee/delaccount`, { employeeId: this.selectedEmployee.id })
                    if (response.status === 200) {
                        alert(response.data.status_message)
                        this.fetchEmployees()
                    }
                } catch (error) {
                    alert('퇴사 처리 중 오류가 발생했습니다: ' + error.response.data.message)
                }
            }
            this.closeDialog()
        },
        closeDialog() {
            this.showConfirmDialog = false
            this.selectedEmployee = null
        }
    }
}
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
.confirmation-card {
    margin-top: 15px;
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Playfair Display", serif;
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

.v-card-title {
    padding: 0;
    margin: 0;
}

.search-bar {
    margin-bottom: 20px;
}

.search-type{
    max-width: 150px;
}
</style>
