<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title">직원 정보</v-card-title>
                        <br>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <h3 class="section-title">○ 직원 정보</h3>
                                    <!-- 고객정보 -->
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Emp No</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="firstName" outlined class="input-field"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Name</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="lastName" outlined class="input-field"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Email</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="email" outlined class="input-field"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Phone num</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="phoneNumber" outlined class="input-field"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <br><br>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label"> Rank </div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field outlined class="input-field" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label"> Department </div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field outlined class="input-field" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <div class="data-label">Date of Employee</div>
                                        </v-col>
                                        <v-col cols="12" md="8">
                                            <v-text-field outlined class="input-field" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Gender</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field outlined class="input-field" readonly></v-text-field>
                                        </v-col>
                                    </v-row>
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

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
        };
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

.input-field {
    margin-bottom: 10px;
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