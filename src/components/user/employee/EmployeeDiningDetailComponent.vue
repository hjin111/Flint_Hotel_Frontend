<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-row>
                <v-col cols="12" class="d-flex justify-center">
                    <v-card class="confirmation-card" style="width:1100px">
                        <v-card-title class="confirmation-title">Dining</v-card-title>
                        <br>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <h3 class="section-title">○ 고객 정보</h3>
                                    <!-- 고객정보 -->
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">First name</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="firstName"
                                                readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3">
                                            <div class="data-label">Last name</div>
                                        </v-col>
                                        <v-col cols="12" md="9">
                                            <v-text-field v-model="lastName" 
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
                                    <h3 class="section-title">○ 예약 정보</h3>
                                    <v-row>
                                        <v-col cols="12" md="5">
                                            <div class="data-label"> Breakfast Option (Adult) </div>
                                        </v-col>
                                        <v-col cols="12" md="7">
                                            <v-text-field  readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="5">
                                            <div class="data-label"> Breakfast Option (Child) </div>
                                        </v-col>
                                        <v-col cols="12" md="7">
                                            <v-text-field  readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="5">
                                            <div class="data-label">Parking Option </div>
                                        </v-col>
                                        <v-col cols="12" md="7">
                                            <v-text-field  readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <div class="data-label">Request</div>
                                        </v-col>
                                        <v-col cols="12" md="8">
                                            <v-text-field  readonly></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                          <!-- 버튼 추가 -->
                          <v-card-actions class="d-flex justify-end">
                            <v-btn style="background-color: #787878; color:#FFFFFF; width: 150px " @click="onModify">Modify</v-btn>
                            <v-btn style="background-color: #787878; color:#FFFFFF; width: 150px " @click="onCancel">Cancel</v-btn>
                        </v-card-actions>              
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import EmployeeView from '@/views/EmployeeView.vue';
//import axios from 'axios';

export default {
    components: {
        EmployeeView
    },
    data() {
        return {
        };
    },
    
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
   
  
    overflow: scroll;
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
    padding-bottom: 10px;
    height: 100%;
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