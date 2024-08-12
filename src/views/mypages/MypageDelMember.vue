<template>
    <div class="main">
        <h1>회원 탈퇴</h1>
        <h2>{{ memberDetail }} 님 안녕하세요.</h2>
    </div>
</template>

<script>
export default {
    props: [
        'memberDetail'
    ],
    date() {
        return {
        }
    },
    async created() {
    },
}
</script>

<style scoped>
.dining-container {
    padding: 20px;
}

.main h1 {
    border-bottom: 4px solid black;
}

.main p {
    font-size: 12px;
}
</style>