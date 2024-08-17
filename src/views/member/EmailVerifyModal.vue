<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title class="text-h5 text-center">
                이메일 인증 하기
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="emailVerify">
                    <v-text-field
                    label="email *"
                    v-model="email"
                    prepend-icon="mdi-email"
                    type="email"
                    readonly
                    required
                    >
                    </v-text-field>
                    <v-text-field
                    label="인증 번호 *"
                    v-model="authCode"
                    type="text"
                    prepend-icon="mdi-lock"
                    required
                    >
                    </v-text-field>
                    <v-row style="display: flex; justify-content: center;">
                        <v-btn type="submit">인증 완료</v-btn>
                        <v-btn @click="closeModal">닫기</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import axios from '@/axios'

export default {
    props: {
        modelValue: Boolean, 
        emailProp: String 
    },
    data() {
        return {
            email: this.emailProp,
            authCode: "",
            dialog: this.modelValue 
        }
    },
    watch: {
        modelValue(val) {
            this.dialog = val
        },
        dialog(val) {
            this.$emit('update:modelValue', val)
        },
        emailProp(val) {
            this.email = val
        }
    },
    methods: {
        async emailVerify() {
            const verifyData = {
                email: this.email,
                authCode: this.authCode
            }
            try {
                const response = await axios.post(`/member/signup/verified`, verifyData)
                alert(response.data?.status_message)
                this.dialog = false
                this.$router.push('/member/login')
            } catch (e) {
                console.log(e)
                alert(e.response?.data?.error_message)
            }
        },
        closeModal() {
            this.dialog = false
        }
    }
}
</script>
