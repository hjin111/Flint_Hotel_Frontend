<template>
    <BackGround />
    <v-container class="main-container">
        <v-row class="d-flex justify-content-between align-items-center search-bar">
            <v-col>
                <v-form @submit.prevent="searchMenus">
                    <v-row>
                        <v-col cols="2">
                            <v-select
                                v-model="searchType"
                                :items="searchOptions"
                                item-title="text"
                                item-value="value"
                                dense
                                hide-details
                                class="search-type"
                            >
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="searchValue"
                                label="검색어 입력"
                                dense
                                hide-details
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn type="submit" color="grey" elevation="0" outlined>검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>

            <v-col cols="auto" v-if="canAccess">
                <v-btn @click="openCreateMenuDialog()" color="grey" elevation="0" outlined>메뉴 추가</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card elevation="0" class="pa-4 table-card">
                    <v-card-text>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th class="id-column">Id</th>
                                    <th class="name-column">메뉴 이름</th>
                                    <th class="price-column">가격</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in menuList" :key="p.menuId">
                                    <td class="id-column-value" >{{ p.menuId }}</td>
                                    <td class="name-column-value">{{ p.menuName }}</td>
                                    <td class="price-column-value">{{ p.cost }}원</td>
                                    <td class="col-action">
                                        <v-btn color="grey" @click="openEditMenuDialog(p)" elevation="0" outlined small>수정</v-btn>
                                        <v-btn color="grey" @click="openDeleteMenuDialog(p.menuId)" elevation="0" outlined small>삭제</v-btn>
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
            @input="createDialog = $event"
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
import BackGround from '@/components/user/employee/EmployeeBasicComponent.vue'

export default {
    components: {
        AddMenuModal,
        ModMenuModal,
        DeleteModal,
        BackGround,
    },
    data() {
        return {
            diningMapping: {
                'KorDining': 1,
                'ChiDining': 2,
                'JapDining': 3,
                'Lounge': 4,
            },
            department: "",
            searchType: "",
            searchValue: "",
            searchOptions: [
                { text: '선택', value: '' },
                { text: '메뉴 코드', value: 'menuId' },
                { text: '메뉴명', value: 'menuName' },
            ],
            menuList: [],
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
                        this.menuList = response.data.result
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
        async searchMenus() {
            try {
                const response = await axios.get(`/employee/dining/list`, {
                    params: {
                        department: this.department,
                        searchType: this.searchType,
                        searchValue: this.searchValue,
                    }
                });
                this.menuList = response.data.result;
            } catch (error) {
                console.error('Error searching products:', error);
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
                    cost: parseInt(menuData.cost)
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
                this.menuList = this.menuList.filter(p => p.menuId !== menuId)
                this.closeDeleteMenuDialog()
            } catch (error) {
                console.error('Error deleting menu:', error)
            }
        }
    }
}
</script>

<style scoped>
.main-container {
    margin-top: 120px;
}

.search-bar {
    margin-bottom: 16px;
}

.search-type{
    max-width: 133px;
    font-size: 0.5rem; 
    line-height: 1.25rem;
}

.text-h5 {
    font-size: 1.25rem;
}

.table-card {
    border: none;
    box-shadow: none;
}

/* 열 간격 조정 */
.id-column {
    padding-left: 150px;
}

.name-column {
    padding-left: 200px;
    text-align: center;
}

.price-column {
    padding-left: 200px;
}

.id-column-value {
    padding-left: 150px;
    border-bottom: 1px solid #e0e0e0;
}

.name-column-value {
    padding-left: 200px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
}

.price-column-value {
    padding-left: 200px;
    border-bottom: 1px solid #e0e0e0;
}

.col-action {
    padding-left: 150px;
    display: flex;
    justify-content: space-between;
    gap: -10px; /* 버튼 사이의 간격 */
    border-bottom: 1px solid #e0e0e0;
}

</style>