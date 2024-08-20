<template>
    <div class="container">
      <div class="image-gallery">
        <!-- 첫 번째 이미지와 그 위에 텍스트 오버레이 -->
        <div class="image-item" style="position: relative;">
          <img src="@/assets/image.png" alt="image 1" class="first-image">
          <div style="display: flex; width: 100%; box-sizing: border-box;" class="overlay-container">

            <!-- 왼쪽 텍스트 박스 -->
            <div class="text-overlay" style="flex: 1; text-align: left; padding-left: 20px; box-sizing: border-box; padding-bottom:38%;">
              <p style="font-size: 60px; color:#787878; ">WHAT IS FLINT</p>
              <p style="font-size: 1.1em; color:#787878; font-family: 'Noto Serif KR', serif;">저희 플린트 호텔을 소개합니다</p>
            </div>
            <!-- 오른쪽 텍스트 박스 -->
            <div class="text-overlay" style="flex: 1; text-align: right; padding-left: 20px; box-sizing: border-box; padding-bottom:14%;">
              <p style="font-size: 1.1em; color:#787878;">Flint는 부싯돌을 의미하며, 예로부터 여행자들에게 따뜻한 불을 제공해온 도구입니다.</p>
              <p style="font-size: 1.1em; color:#787878;  font-family: 'Noto Serif KR', serif;">이처럼 Flint 호텔은 여행자들에게 안락하고 따뜻한 공간을 제공하고자 합니다.</p>
              <p style="font-size: 1.1em; color:#787878; font-family: 'Noto Serif KR', serif;">부싯돌이 단순한 도구를 넘어 따뜻함과 안락함을 상징하듯,</p>
              <p style="font-size: 1.1em; color:#787878; font-family: 'Noto Serif KR', serif;">Flint 호텔은 세심한 서비스로 여행의 피로를 풀고 </p>
              <p style="font-size: 1.1em; color:#787878; font-family: 'Noto Serif KR', serif;">몸과 마음을 치유할 수 있는 휴식처를 제공합니다. </p>
            </div>
          </div>
        </div>
        <div class="image-item" style="position: relative;">
          <img src="@/assets/roomImage.png" alt="image 2">
        </div>
        <div class="image-item">
          
          <img src="@/assets/diningImage.png" alt="image 3">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x:hidden;
  }
  
  .first-image {
    width: 100%;
    height: auto;
    opacity: 0.5; 
    display: block;
    animation: fadeInImage 15s forwards; /* 이미지 애니메이션  */
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; 
    justify-content: space-between; 
    box-sizing: border-box;
    padding: 20px; 
  }
  
  .text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: "Noto Serif KR", serif;
    animation: fadeOutText 15s forwards; /* 텍스트 사라지는 애니메이션  */
    z-index: 1;
  }
  
  @keyframes fadeInImage {
    0% {
      opacity: 0.5; /* 이미지 초기 투명도 */
    }
    100% {
      opacity: 1; 
    }
  }
  
  @keyframes fadeOutText {
    0% {
      opacity: 1; 
    }
    100% {
      opacity: 0; 
    }
  }
  
  
  .roomBox {
    position: absolute;
    top: 640px; 
    left: 1000px; 
    width: 676px; 
    height: 130px; 
    background-color: #8F7598; 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    padding: 10px;
  }
  
  .diningBox {
    position: absolute;
    top: 680px; 
    left: 1000px; 
    width: 676px;  
    height: 130px;
    background-color: #9C93A0; 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: "Noto Serif KR", serif;
    padding: 10px;
  }
  
  .image-gallery {
    display: flex;
    flex-direction: column; 
    overflow-y: auto; 
    height: 100vh;
  }
  
  .image-item {
    flex: 0 0 auto;
    position: relative; /* 이 요소 내에서 절대 위치 지정이 가능하도록 설정 */
  }
  
  .image-item img {
    width: 100%;
    height: auto; 
    display: block;
  }
  </style>
  