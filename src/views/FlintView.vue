<template>
    <div>
    <div class="image-container">
        <img src="@/assets/image.png" alt="background image">
    </div>
    </div>
    
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';

export default{
   components(){
    HeaderComponent
   }
}
console.log("hi");
</script>

<style>
.image-container {
    width: 100%;
    height: 100%;
  }
  
  .image-container img {
    width: 1519.2px;
    height: 740px;
    position: relative;
    z-index: 8;
  }
</style>
