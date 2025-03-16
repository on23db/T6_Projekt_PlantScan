<template>
    <div class="plant-identifier">
      <div class="input-group">
        <input type="file" class="form-control" id="inputGroupFile" @change="handleFileUpload" accept="image/*" />
      </div>
      <button @click="identifyPlant" class="btn" :disabled="isLoading">Pflanze identifizieren</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "PlantIdentifier",
  };
  </script>
  
  <style scoped>
  .input-group {
    margin-bottom: 1rem;
  }
  
  .btn {
    background-color: #e49e13;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    border: none;
  }
  
  .btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .btn:hover {
    background-color: #b8770d;
  }

  </style>
  