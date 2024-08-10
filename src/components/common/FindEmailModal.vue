<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center">
        이메일 찾기
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="findEmail">
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
            label="휴대전화"
            v-model="phoneNumber"
            type="text"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" block>이메일 찾기</v-btn>
          <v-btn color="red" @click="closeModal" block>닫기</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '@/axios'

export default {
name: 'FindEmailModal',
props: {
  modelValue: {
    type: Boolean,
    required: true
  },
  findEmailEndpoint: {
    type: String,
    required: true
  }
},
data() {
  return {
    firstName: '',
    lastName: '',
    phoneNumber: '',
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
  async findEmail() {
    try {
      const response = await axios.get(this.findEmailEndpoint, {
        params: {
          phoneNumber: this.phoneNumber,
          firstName: this.firstName,
          lastName: this.lastName
        }
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
