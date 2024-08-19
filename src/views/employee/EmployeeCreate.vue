<template>
    <v-app>
      <!-- 회원가입 폼 -->
      <v-main class="main-background">
        <v-container class="join-now-container">
          <v-row>
            <v-col cols="12">
              <h1 class="join-now-title">Employee Create</h1>
              <p class="welcome-text">직원 생성 페이지입니다.</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-form @submit.prevent="employeeCreate">
                <v-text-field 
                  label="EMAIL *" 
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field 
                  label="PASSWORD *" 
                  v-model="password"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field 
                  label="FIRST NAME *" 
                  v-model="firstName"
                  required
                ></v-text-field>
                <v-text-field 
                  label="LAST NAME *" 
                  v-model="lastName"
                  required
                ></v-text-field>
              </v-form>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                label="BIRTHDAY" 
                v-model="birthday"
                placeholder="YYYY-MM-DD"
                required
              ></v-text-field>
              <v-text-field 
                label="PHONE NUMBER *" 
                v-model="phoneNumber"
                required
              ></v-text-field>
              <v-text-field 
                label="DATE OF EMPLOYMENT *" 
                v-model="dateOfEmployment"
                required
              ></v-text-field>
              <v-select 
                label="GENDER *" 
                v-model="gender"
                :items="genders"
                required
              ></v-select>
              <v-select 
                label="DEPARTMENT *" 
                v-model="department"
                :items="departments"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn @click="employeeCreate" class="create-btn" color="primary">직원 추가</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from '@/axios'
  import { ref } from 'vue'
  
  export default{
      setup(){
          const email = ref('')
          const password = ref('')
          const firstName = ref('')
          const lastName = ref('')
          const birthday = ref('')
          const phoneNumber = ref('')
          const dateOfEmployment = ref('')
          const gender = ref('')
          const department = ref('')
  
          // 선택 가능한 성별 및 부서 리스트
          const genders = ref(['MALE', 'FEMALE'])
          const departments = ref(['Office', 'Room', 'KorDining', 'JapDining', 'ChiDining', 'Lounge'])
          
          const employeeCreate = async () =>{
              if (!email.value || !password.value || !firstName.value || !lastName.value || !birthday.value || 
              !phoneNumber.value || !dateOfEmployment.value || !gender.value || !department.value) {
                  alert("입력하지 않은 사항이 있습니다.")
                  return
              }
              try{
                  const createData = {
                      email: email.value,
                      password: password.value,
                      firstName: firstName.value,
                      lastName: lastName.value,
                      birthday: birthday.value,
                      phoneNumber: phoneNumber.value,
                      dateOfEmployment: dateOfEmployment.value,
                      gender: gender.value,
                      department: department.value,
                      employeeRank : '사원'
                  }
                  const token = localStorage.getItem('employeetoken') 
                  const response = await axios.post('/employee/create', createData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(createData)
                alert(response.data)
              } catch(e){
                    alert(e.error_message)
              }
          }
          return{
              email,
              password,
              firstName,
              lastName,
              birthday,
              phoneNumber,
              dateOfEmployment,
              gender,
              department,
              genders, 
              departments, 
              employeeCreate
          }  
      },
  }
  </script>
  