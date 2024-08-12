<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>메뉴 수정</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="confirmEditMenu">
                    <v-text-field v-model="localMenuData.menuName" label="메뉴명"></v-text-field>
                    <v-text-field v-model="localMenuData.cost" label="가격"></v-text-field>
                    <v-btn type="submit" color="primary">저장</v-btn>
                    <v-btn @click="closeDialog" color="grey">취소</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean, // v-model을 위한 바인딩
        menuData: Object // 수정할 메뉴 데이터
    },
    data() {
        return {
            localMenuData: { ...this.menuData } // menuData의 데이터를 로컬 데이터로 복사
        }
    },
    watch: {
        menuData: {
            immediate: true,
            handler(newData) {
                this.localMenuData = { ...newData } // menuData 변경 시 로컬 데이터도 업데이트
            }
        }
    },
    computed: {
        dialog: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
        },
        async confirmCreateMenu() {
            try {
                await this.$emit('create-menu', this.localMenuData)
                this.closeDialog()
            } catch (error) {
                console.error('Error updating menu:', error)
            }
        }
    }
}
</script>
