<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title"> Employee List </v-card-title>
                        
                        <v-card-text class="cardText">
                            <!-- 검색 바 추가 -->
                            <v-row class="searchrow d-flex justify-space-between">
                                <v-col cols="12" md="4" class="d-flex justify-start" style="margin-left:-30px;">
                                    <v-btn @click="createEmployee" color="#7A6C5B" elevation="0" outlined>Add Employee</v-btn>
                                </v-col>

                                <v-col  cols="12" md="2" class="emailcol" style="margin-top:-7px;">
                                    <v-select v-model="searchType" :items="searchOptions" item-title="text"
                                        item-value="value" dense hide-details class="d-flex justfiy-end formCustom">
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="4" class="emailcol">
                                    <v-text-field v-model="searchValue" class="modSearch" label="검색어 입력" dense hide-details>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-btn @click="searchEmployees" style="background-color:#DCC8B0; color:white;" elevation="0" outlined>Search</v-btn>
                                </v-col>
                            </v-row>
                            <br>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-data-table class="elevation-1">
                                        <thead>
                                            <tr>
                                                <!-- <th style="text-align: center;">Id</th> -->
                                                <th style="text-align: center;">Employee Number</th>
                                                <th style="text-align: center;">Email</th>
                                                <th style="text-align: center;">Name</th>
                                                <th style="text-align: center;">
                                                    <select id="departmentSelect" @change="onDepartmentChange"
                                                        style="width: 100%; text-align: center;">
                                                        <option value="">Department</option>
                                                        <option v-for="department in departments" :key="department.id"
                                                            :value="department.name">
                                                            {{ department.name }}
                                                        </option>
                                                    </select>
                                                </th>
                                                <th style="text-align: center;">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center" v-for="employee in filteredDepartment"
                                                :key="employee.id">
                                                <!-- <td>{{ employee.id }}</td> -->
                                                <td>{{ employee.employeeNumber }}</td>
                                                <td>{{ employee.email }}</td>
                                                <td>{{ employee.firstName + " " + employee.lastName }}</td>
                                                <td>{{ employee.department }}</td>
                                                <v-btn style="background-color:white; color:#7A6C5B; border: 1px solid #7A6C5B; margin-top:4px;"
                                                    :to="{ path: './office/manage', query: { id: employee.id } }">Detail
                                                </v-btn>
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
            selectedEmployee: null,
            modalMessage: '',
            router: useRouter(),
            departments: [
                { id: 1, name: 'Office' },
                { id: 2, name: 'KorDining' },
                { id: 3, name: 'ChiDining' },
                { id: 4, name: 'JapDining' },
                { id: 5, name: 'Lounge' },
                { id: 6, name: 'Room' },
            ],
            selectedDepartment: "",
        }
    },
    computed:{
        filteredDepartment() {
            console.log(this.selectedDepartment)
            if (!this.selectedDepartment) {
                return this.filteredEmployees
            }
            return this.filteredEmployees.filter(employee => employee.department === this.selectedDepartment);
        },
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/list`);
        this.employeeList = response.data.result
        console.log(this.employeeList)
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
        onDepartmentChange(event) {
            this.selectedDepartment = event.target.value;
        },
        employeeId() {
            // $route.query를 통해 쿼리 파라미터에 접근
            console.log(this.$router.query.id);
            return this.$route.query.id;
        },
        createEmployee(){
            this.router.push('/employee/create')
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
}

.confirmation-card {
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    height: auto;
    box-shadow: none;
}

.search-type {
    max-width: 133px;
    font-size: 0.5rem;
    line-height: 1.25rem;
}
.confirmation-title {
    font-size: 20px;
    font-weight: bold;
    color: #787878;
    text-align: left;
    border-bottom: 3px solid #787878;
    font-family: "Noto Serif KR", serif;
}
.cardText {
    margin-top:20px;
}
.formCustom {
    margin-left: 20%;
    margin-bottom: 8px;
}
.modSearch {
    margin-top: -10px;
}
.tableCustom {
    padding-left: 2%;
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
    padding-top: 20px;
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
    justify-content: space-between;
    gap: -10px;
    /* 버튼 사이의 간격 */
    border-bottom: 1px solid #e0e0e0;
    height: 100%;
    padding-top: 40px;
}

.emailcol {
    margin-right: -20px;
}
</style>