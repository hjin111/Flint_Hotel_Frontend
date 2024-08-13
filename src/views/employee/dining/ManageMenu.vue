<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form @submit.prevent="searchProducts">
                    <v-row>
                        <v-col cols="auto">
                            <v-select
                                v-model="searchType"
                                :items="searchOptions"
                                item-title="text"
                                item-value="value"
                            >
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="searchValue"
                                label="Search"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn type="submit" color="grey">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>

            <v-col cols="auto" v-if="canAccess">
                <v-btn @click="openCreateMenuDialog()" color="success">메뉴 추가</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-p text-center">{{ pageTitle }}</v-card-title>
                    <v-card-text>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>제품 코드</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th v-if="canAccess">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.menuId">
                                    <td>{{ p.menuId }}</td>
                                    <td>{{ p.menuName }}</td>
                                    <td>{{ p.cost }}</td>
                                    <td v-if="canAccess">
                                        <v-btn color="secondary" @click="openEditMenuDialog(p)">수정</v-btn>
                                        <v-btn color="red" @click="openDeleteMenuDialog(p.menuId)">삭제</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- 추가 모달 -->
        <AddMenuModal
            v-model="createDialog"
            @input="creatDialog = $event"
            :menuData="createMenuData"
            @create-menu="confirmCreateMenu"
        />

        <!-- 수정 모달 -->
        <ModMenuModal
            v-model="editDialog"
            @input="editDialog = $event"
            :menuData="editMenuData"
            @edit-menu="confirmEditMenu"
        />

        <!-- 삭제 확인 모달 -->
        <DeleteModal
            v-model="deleteDialog"
            :menuId="menuIdToDelete"
            @delete-menu="confirmDeleteMenu"
        />
    </v-container>
</template>

<script>
import axios from '@/axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'
import ModMenuModal from '@/views/employee/dining/ModMenuModal.vue'
import DeleteModal from '@/views/employee/dining/DeleteModal.vue'
import AddMenuModal from '@/views/employee/dining/AddMenuModal.vue'

export default {
    components: {
        AddMenuModal,
        ModMenuModal,
        DeleteModal
    },
    data() {
        return {
            diningMapping: {
                'KorDining': 1,
                'JapDining': 2,
                'ChiDining': 3,
                'Lounge': 4,
            },
            department: "",
            searchType: "",
            searchValue: "",
            searchOptions: [
                { text: '제품 코드', value: 'menuId' },
                { text: '제품명', value: 'menuName' },
                { text: '가격', value: 'cost' }
            ],
            productList: [],
            canAccess: false,
            pageTitle: '메뉴 목록',
            router: useRouter(),

            createDialog: false,
            createMenuData: {},

            editDialog: false,
            editMenuData: {},

            deleteDialog: false,
            menuIdToDelete: null
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        async initialize() {
            const token = localStorage.getItem('employeetoken')
            if (token) {
                const decodedToken = jwtDecode(token)
                this.department = decodedToken.department

                this.canAccess = ['KorDining', 'JapDining', 'ChiDining', 'Lounge'].includes(this.department)

                if (this.canAccess) {
                    try {
                        const response = await axios.get(`/employee/dining/list`, {
                            params: { department: this.department }
                        })
                        this.productList = response.data.result
                    } catch (error) {
                        console.error('Error fetching menu list:', error)
                    }
                } else {
                    alert("접근 권한이 없습니다.")
                    this.router.push('/employee/')
                }
            } else {
                alert("로그인이 필요합니다.")
                this.router.push('/employee/login')
            }
        },
        async searchProducts() {
            try {
                const response = await axios.get(`/employee/dining/listes`, {
                    params: {
                        searchType: this.searchType,
                        searchValue: this.searchValue,
                        department: this.department
                    }
                })
                this.productList = response.data.result
            } catch (error) {
                console.error('Error searching products:', error)
            }
        },
        openCreateMenuDialog() {
            this.createMenuData = {
                menuName: '',
                cost: 0,
                diningId: this.diningMapping[this.department] || null, // department를 diningId로 변환
            }
            this.createDialog = true
        },
        closeCreateMenuDialog() {
            this.createDialog = false
        },
        async confirmCreateMenu(menuData) {
            try {
                await axios.post(`/employee/dining/addmenu`, menuData)
                this.initialize()
                this.closeCreateMenuDialog()
            } catch (error) {
                console.error('생성 실패:', error)
            }
        },
        openEditMenuDialog(menu) {
            this.editMenuData = { ...menu }
            this.editDialog = true
        },
        closeEditMenuDialog() {
            this.editDialog = false
        },
        async confirmEditMenu(menuData) {
            try {
                await axios.patch(`/employee/dining/modmenu/${menuData.menuId}`, {
                    cost: menuData.cost
                })
                this.initialize()
                this.closeEditMenuDialog()
            } catch (error) {
                console.error('Error updating menu:', error)
            }
        },
        openDeleteMenuDialog(menuId) {
            this.menuIdToDelete = menuId
            this.deleteDialog = true
        },
        closeDeleteMenuDialog() {
            this.deleteDialog = false
        },
        async confirmDeleteMenu(menuId) {
            try {
                await axios.delete(`/employee/dining/delmenu/${menuId}`)
                this.productList = this.productList.filter(p => p.menuId !== menuId)
                this.closeDeleteMenuDialog()
            } catch (error) {
                console.error('Error deleting menu:', error)
            }
        }
    }
}
</script>

<style scoped>
</style>