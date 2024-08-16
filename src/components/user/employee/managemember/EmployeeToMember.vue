<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
            <v-card class="vcard-bar">
                <div class="gray-bar"></div>
                <v-row class="button-row">
                    <v-col cols="6" md="6" class="left-bar">
                        <v-btn class="custom-btn" size="large"
                            :to="{path: `./member/list`}">회원 목록</v-btn>
                    </v-col>
                    <v-col cols="6" md="6" class="left-bar">
                        <v-btn class="custom-btn" size="large">QnA 관리</v-btn>
                    </v-col>
                </v-row>
            </v-card>
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
    padding: 0 40px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}
.vcard-bar{
    width:50%;
    height: 30%;
    justify-items: left;
}
.custom-btn{
    width: 200px;
    height: 50px;
    font-size: 18px;
    background-color: #c4c4c4;
}

.gray-bar {
    width: 100%;
    height: 60px;
    background-color: #c4c4c4;
    margin-bottom: 35px;
}
.left-bar{
    width: 100%;
    height: 100%;
    text-align: center;
    margin: 0;
}
</style>