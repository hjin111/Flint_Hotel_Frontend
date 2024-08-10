<template>
    <div class="login-container">
      <div class="background-image-wrapper">
        <img :src="loginImage" alt="Login Page" class="background-image">
      </div>
      <div class="login-form-container">
        <LoginComponent
          :showFindId="true"
          :showJoinLink="true"
          findEmailEndpoint="/member/findemail"
          findPasswordEndpoint="/member/findpassword"
          loginEndpoint="/member/login"
          tokenName="membertoken"
          redirectPath="/" 
        />
      </div>
    </div>
</template>
  
<script>
import loginImage from '@/assets/image.png'
import LoginComponent from '@/components/common/LoginComponent.vue'

export default {
    name: 'MemberLoginView',
    components: {
          LoginComponent,
    },
    setup() {
        return {
            loginImage,
        }
    },
}
</script>
  
<style scoped>
.login-container {
    display: flex; /* Flexbox를 사용하여 자식 요소 정렬 */
    height: 100vh; /* 화면 높이 100% */
    width: 100%; /* 화면 너비 100% */
    overflow: hidden; /* 넘치는 콘텐츠 숨김 */
}

.background-image-wrapper {
    flex: 3; /* Flexbox에서 3배 공간 차지 */
    position: relative; /* 상대적 위치 설정 */
    overflow: hidden; /* 넘치는 콘텐츠 숨김 */
}

.background-image {
    width: 100%; /* 이미지 너비 100% */
    height: 100%; /* 이미지 높이 100% */
    object-fit: cover; /* 이미지 비율 유지하며 영역 채우기 */
    position: absolute; /* 절대적 위치 설정 */
    top: 0; /* 상단 위치 설정 */
    left: 0; /* 좌측 위치 설정 */
}

.login-form-container {
    flex: 1; /* Flexbox에서 1배 공간 차지 */
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    background-color: white; /* 배경색 흰색 */
}
</style>
