<template>
  <div>
    <div class="image-container">
        <img src="@/assets/image.png" alt="background image">
    </div>
  </div>
</template>

<script>
export default{
}
console.log("hi");
</script>

<style>
.image-container {
    width: 100%;
    height: 100%;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    background-attachment: fixed;
    position: relative;
    overflow: auto;
  }
</style>
