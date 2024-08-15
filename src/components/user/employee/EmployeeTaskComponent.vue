<template>
    <BackGround />
    <v-container class="main-container">
      <v-row justify="center" align="center" class="box-container">
        <v-col cols="12" class="departmentHeader">
          {{ department }} 관리자
        </v-col>
        <v-col cols="12" class="menuButton">
          <MenuComponent />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
  import { jwtDecode } from 'jwt-decode'
  import { useRouter } from 'vue-router';
  import BackGround from '@/components/user/employee/EmployeeBasicComponent.vue';
  import MenuComponent from '@/components/user/employee/EmployeeTaskMenuComponent.vue';
  
export default {
    components: {
      MenuComponent,
      BackGround
    },
    data() {
        return {
        department: '', 
        router: useRouter(),
        }
    },
    mounted() {
        // department 값 설정
        this.initializeDepartment()
    },
    methods: {
        initializeDepartment() {
            const token = localStorage.getItem('employeetoken')
            if (token) {
                const decodedToken = jwtDecode(token)
                this.department = decodedToken.department
            } else {
                this.router.push('/employee/login')
            }
        }
    }
}
</script>
  
<style scoped>
.main-container {
    max-width: 1200px;
    padding-top: 360px; 
    position: relative;
}
.box-container {
    max-width: 600px;
    border: 1px solid #ccc; 
    margin-left: 300px;
    margin-top: 50px;
}
.departmentHeader {
    color: white;
    background-color: gray;
    font-size: 20px;
    max-width: 600px;
}

.menuButton{
    text-align: center;  
}
</style>
