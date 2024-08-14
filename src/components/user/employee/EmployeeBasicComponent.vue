<template>
    <div>
        <EmployeeView />
        <v-container class="content-container">
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
}
</style>