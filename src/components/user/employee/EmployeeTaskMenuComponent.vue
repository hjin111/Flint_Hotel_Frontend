<template>
    <div class="menu-management">
      <v-btn v-if="isDining" @click="navigateToMenu">Menu 관리</v-btn>
      <v-btn v-if="isRoom" @click="navigateToMenu">객실 가격 관리</v-btn>
    </div>
</template>
  
<script>
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router';

export default {
    name: 'MenuComponent',
    data(){
        return{
            department: "",
            router: useRouter(),
        }
    },
    computed: {
        isDining() {
            return ['KorDining', 'JapDining', 'ChiDining', 'Lounge'].includes(this.department);
        },
        isRoom() {
            return this.department === 'Room';
        }
    },
    methods: {
        navigateToMenu() {
            const path = this.isDining ? '/employee/dining/menu' : '/employee/room/modprice';
            this.router.push(path);
        },
        initializeDepartment() {
            const token = localStorage.getItem('employeetoken')
            if (token) {
                const decodedToken = jwtDecode(token)
                this.department = decodedToken.department
            } else {
                this.router.push('/employee/login')
            }
        }
    },
    created() {
        this.initializeDepartment();
    }
}
</script>
  
<style scoped>
.menu-management {
    max-width: 600px;
    color: white;
    text-align: center;
}
</style>
  