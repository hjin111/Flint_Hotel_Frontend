<template>
    <div class="full-screen-bg"></div>
  </template>

  <script>
  export default {
    mounted() {
      console.log("hi");
    }
  };
  </script>

  <style>
  .full-screen-bg {
    width: 100%;
    height: 100vh; 
    background-color: #DADADA;
    position: fixed;
    top: 0;
    left: 0;
  }
  </style>