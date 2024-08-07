<template>
    <div class="image-container">
    <img src="../assets/image.png" alt="background image">
    </div>
</template>
<script>
  export default {
    components: {
    }
  };
  </script>
  
  <style >
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden; /* 스크롤 방지 */
  }
  
  .image-container {
    width: 100vw;
    height: 100vh;
  }
  
  .image-container img {

    width: 1519.2px;
    height: 740px;
    object-fit: cover; /* 이미지를 화면에 맞게 자르기 */
  }
  </style>
  