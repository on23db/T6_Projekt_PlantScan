<template>
        <div class="text-section p-4 rounded mt-4">
          <h2>Deine gescannten Pflanzen</h2>
          <p>
            Alle Pflanzen, die du bereits gescannt hast, sind in deiner persönlichen Pflanzenübersicht gespeichert.
          </p>
          <router-link to="/plantlist" class="btn plantlist-btn">Zur Pflanzenübersicht</router-link>
        </div>
</template>
  
  <script>  
  export default {
    name: "PlantHistory",
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .plantlist-btn {
    background-color: #e49e13;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-top: 1rem;
  }
  
  .plantlist-btn:hover {
    background-color: #b8770d;
    color: white;
  }
  
  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  
    .text-section {
      margin-top: 2rem;
      padding: 1.5rem;
    }
  
    .text-content {
      max-width: 90%;
      padding-left: 15px;
      padding-right: 15px;
    }
  
    .container-lg {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  </style>