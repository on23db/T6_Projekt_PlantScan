<template>
    <div class="loading-screen">
      <h1>PlantScan</h1>
      <img src="/src/assets/Monstera deliciosa.png" alt="Monstera" class="img-fluid" />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  
  const router = useRouter()
  const auth = getAuth()
  
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard')
      } else {
        router.replace('/home')
      }
    })
  })
  </script>
  
  <style scoped>
  .loading-screen {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.2rem;
  }
  </style>
  