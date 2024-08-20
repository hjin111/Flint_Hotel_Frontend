<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title">Member List</v-card-title>
                        <br>
                        <v-card-text>
                            <v-row class="justify-center">
                                <v-col cols="12">
                                    <v-data-table class="elevation-1">
                                        <thead>
                                            <tr>
                                                <th style="text-align: center;">Id</th>
                                                <th style="text-align: center;">Name</th>
                                                <th style="text-align: center;">Email</th>
                                                <th style="text-align: center;">Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center" v-for="m in member"
                                                :key="m.id">
                                                <td>{{ m.id }}</td>
                                                <td>{{ m.name }}</td>
                                                <td>
                                                    <router-link :to="{ name: 'EmployeeToMemberDetail', params: {id: m.id}}">
                                                        {{ m.email }}
                                                    </router-link>
                                                </td>
                                                <td>{{ m.phoneNumber }}</td>
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
    data(){
        return{
            member:[],
        }
    },
    async created() {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/employee/memberlist`);
        this.member = response.data.result
        console.log(this.member)
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
    overflow-y: auto;
}
.confirmation-card {
    padding: 20px;
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    height: auto;
    border: none;
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
</style>