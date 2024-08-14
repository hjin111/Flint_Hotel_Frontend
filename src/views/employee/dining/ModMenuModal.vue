<template>
    <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title>메뉴 수정</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="confirmEditMenu">
                    <v-text-field v-model="localMenuData.originalCost" label="기존 가격" readonly></v-text-field>
                    <v-text-field v-model="localMenuData.cost" label="수정 가격" type="number" :min="0"></v-text-field>
                    <v-row style="display: flex; justify-content: center;">
                        <v-btn type="submit" color="primary">저장</v-btn>
                        <v-btn @click="closeDialog" color="grey">취소</v-btn>
                    </v-row>
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
            localMenuData: { 
                ...this.menuData,
                originalCost: this.menuData.cost, // menuData의 cost를 originalCost로 저장
                cost: this.menuData.cost  // 수정할 가격을 저장
            } 
        }
    },
    watch: {
        menuData: {
            immediate: true,
            handler(newData) {
                // menuData 변경 시 로컬 데이터 업데이트
                this.localMenuData.originalCost = newData.cost;
                this.localMenuData.cost = newData.cost;
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
            this.$emit('input', false)
        },
        async confirmEditMenu() {
            try {
                await this.$emit('edit-menu', this.localMenuData)
                this.closeDialog()
            } catch (error) {
                console.error('Error updating menu:', error)
            }
        }
    }
}
</script>
