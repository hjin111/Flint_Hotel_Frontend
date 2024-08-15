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
                                                    <v-btn @click="viewDetails(m.id)">상세 조회</v-btn>
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
            this.filteredEmployees = this.employee  
        },
        searchEmployees() {
            if (!this.searchType || !this.searchValue) {
                this.filteredEmployees = this.employee
                return
            }

            this.filteredEmployees = this.employee.filter((emp) => {
                const field = emp[this.searchType] ? emp[this.searchType].toString().toLowerCase() : ''
                return field.includes(this.searchValue.toLowerCase())
            })
        },
        viewDetails(id) {
            this.$router.push(`/employee/detail/${id}`)
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
