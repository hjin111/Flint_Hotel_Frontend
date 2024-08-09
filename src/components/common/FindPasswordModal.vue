<template>
    <v-dialog v-model="localDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center">
          비밀번호 찾기
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="findPassword">
            <v-text-field
              label="FIRST NAME(이름)"
              v-model="firstName"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              label="LAST NAME(성)"
              v-model="lastName"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              label="EMAIL"
              v-model="email"
              type="email"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" block>임시 비밀번호 발급</v-btn>
            <v-btn color="red" @click="closeModal" block>닫기</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from '@/axios'
  
  export default {
    name: 'FindPasswordModal',
    props: {
      modelValue: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        localDialog: this.modelValue
      }
    },
    watch: {
      modelValue(val) {
        this.localDialog = val
      },
      localDialog(val) {
        this.$emit('update:modelValue', val)
      }
    },
    methods: {
      async findPassword() {
        try {
          const response = await axios.post(`/member/findpassword`, {
            email: this.email
          })
          alert(response.data?.status_message)
          this.closeModal()
        } catch (e) {
          console.log(e)
          alert(e.response?.data?.error_message)
        }
      },
      closeModal() {
        this.localDialog = false
      }
    }
  }
  </script>
  