<template>
    <div class="popup-overlay" v-if="isVisible">
      <div class="popup-content">
        <button class="close-btn" @click="closePopup">X</button>
        <p>Pflanze wurde erkannt!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PlantInfoPopup",
    props: {
      plantData: {
        type: Object,
        required: true,
      },
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closePopup() {
        this.$emit("close-popup");  // Schließt das Popup
      },
    },
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 10px 20px;
    z-index: 1000;
  }
  
  .popup-content {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-btn {
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .close-btn:hover {
    background: #e74c3c;
  }
  </style>
  