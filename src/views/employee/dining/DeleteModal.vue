<template>
    <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title>메뉴 삭제</v-card-title>
            <v-card-text>
                이 메뉴를 삭제하시겠습니까?
            </v-card-text>
            <v-card-actions>
                <v-row style="display: flex; justify-content: center;">
                    <v-btn class="submitButton" @click="confirmDelete">확인</v-btn>
                    <v-btn class="cancelButton" @click="closeDialog">취소</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean, // v-model을 위한 바인딩
        menuId: Number // 삭제할 메뉴 ID
    },
    computed: {
        dialog: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },
        async confirmDelete() {
            try {
                await this.$emit('delete-menu', this.menuId);
                this.closeDialog();
            } catch (error) {
                console.error('Error deleting menu:', error);
            }
        }
    }
};
</script>

<style scoped>


</style>