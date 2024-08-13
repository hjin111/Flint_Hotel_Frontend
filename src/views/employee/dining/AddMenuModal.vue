<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>메뉴 추가</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="confirmCreateMenu">
                    <v-text-field v-model="localMenuData.menuName" label="메뉴명" required></v-text-field>
                    <v-text-field v-model="localMenuData.cost" label="가격" type="number" required></v-text-field>
                    <v-card-actions>
                        <v-btn type="submit" color="primary">저장</v-btn>
                        <v-btn @click="closeDialog" color="grey">취소</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean,
        menuData: Object
    },
    data() {
        return {
            localMenuData: { ...this.menuData }
        }
    },
    watch: {
        menuData: {
            immediate: true,
            handler(newData) {
                this.localMenuData = { ...newData }
            }
        }
    },
    computed: {
        dialog() {
            return this.value
        }
    },
    methods: {
        closeDialog() {
            this.$emit('input', false)
        },
        async confirmCreateMenu() {
            try {
                await this.$emit('create-menu', this.localMenuData)
                this.closeDialog()
            } catch (error) {
                console.error('Error creating menu:', error)
            }
        }
    }
}
</script>
