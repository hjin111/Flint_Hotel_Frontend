<template>
    <v-app>
      <v-main>
        <div class="background-image">
          <v-container class="reserve-container">
            <v-row justify="center" align="center">
              <div class="reservation-content">
                
               </div>
            </v-row>
          </v-container>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        
      };
    },
  };
  </script>
  
  <style scoped>
  html,
  body,
  #app,
  .v-application--wrap {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevents overall page scrolling */
  }
  
  .background-image {
    background-image: url('@/assets/image2.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .reserve-container {
    background-color: white;
    position: absolute;
    width: 90%;
    max-width: 1200px;
    height: 90vh;
    max-height: calc(100vh - 20px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    overflow-y: auto; /* scrolling */
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .reservation-content h1 {
    margin-top: 50px;
    color: #787878;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
  }
  
  .reservation-content p {
    color: #787878;
    font-family: "Noto Serif KR", serif;
  }
  
  .confirmation-card {
    margin-top: 10px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .confirmation-title {
    font-size: 16px;
    font-weight: bold;
    color: #787878;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .section-title {
    font-size: 15px;
    font-weight: bold;
    color: #787878;
    margin-bottom: 8px;
  }
  
  .input-field {
    margin-bottom: 10px;
  }
  
  .v-radio-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex-direction: row; /* Ensures radio buttons are inline */
  }
  
  .v-radio {
    margin-right: 10px;
  }
  
  .v-card-title {
    padding: 0;
    margin: 0;
  }
  .data-label {
    font-size: 14px;
    font-weight: bold;
    color: #787878;
    display: flex;
    height: 100%; /* Ensures it takes up full column height for alignment */
    padding-top: 20px;
    padding-left: 20px;
  }
  
  </style>