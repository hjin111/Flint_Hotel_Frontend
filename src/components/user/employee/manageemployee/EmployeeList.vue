<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title"> Employee List </v-card-title>
                        <v-card-text>
                            <v-row>
                                <!-- <v-col cols="12" md="7">
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">검색(부서)</div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field v-model="email" style="padding-top: 20px;"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="2" class="search">
                                            <v-btn @click="searchMember()">검색</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col> -->
                                <v-col cols="12" class="justify-end">
                                    <v-row style="padding-top: 30px;">
                                        <v-col>
                                            <v-btn>직원 등록</v-btn>
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
                                                <th style="text-align: center;">Employee Number</th>
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
                                                <td>{{ employee.id }}</td>
                                                <td>{{ employee.empNo }}</td>
                                                <td>{{ employee.name }}</td>
                                                <td>{{ employee.department }}</td>
                                                <td>
                                                    <v-btn
                                                        :to="{ path: './office/manage', query: { id: employee.id } }">Detail</v-btn>
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
            employeeList: [],
            selectedDepartment: "",
            departments: [
                { id: 1, name: 'Office' },
                { id: 2, name: 'KorDining' },
                { id: 3, name: 'ChiDining' },
                { id: 4, name: 'JapDining' },
                { id: 5, name: 'Lounge' },
                { id: 6, name: 'Room' },
            ]
        };
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/employeelist`);
        this.employeeList = response.data.result
        console.log(this.employeeList)
    },
    computed: {
        filteredDepartment() {
            console.log(this.selectedDepartment)
            if (!this.selectedDepartment) {
                return this.employeeList
            }
            return this.employeeList.filter(employee => employee.department === this.selectedDepartment);
        },
    },
    methods: {
        onDepartmentChange(event) {
            this.selectedDepartment = event.target.value;
        },
        employeeId() {
            // $route.query를 통해 쿼리 파라미터에 접근
            console.log(this.$router.query.id);
            return this.$route.query.id;
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

.elevation-1td {
    min-width: 150px;
    /* 각 테이블 셀의 최소 너비 */
    min-height: 50px;
    /* 각 테이블 셀의 최소 높이 */
    text-align: center;
    /* 텍스트 가운데 정렬 */
}
</style>