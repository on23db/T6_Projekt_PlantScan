<template>
    <div class="installed-home container text-center py-5">
      <h1 class="headline mb-4">Bereit zum Scannen 🌱</h1>
      <p class="lead mb-4">
        Öffne deine Kamera und beginne direkt mit dem Live-Scan deiner Pflanzen.
      </p>
  
      <div class="camera-placeholder mb-4">
        <!-- Hier kann später die Kamera-Ansicht rein -->
        <img src="@/assets/camera-preview-placeholder.png" alt="Kamera-Preview" class="img-fluid rounded">
      </div>
  
      <button class="btn btn-scan" @click="startScan">Scan starten</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InstalledHome',
    methods: {
      startScan() {
        // Placeholder-Logik – hier später Kamera-Funktion einbauen
        console.log('Scan gestartet – Kamera öffnen 🔍🌿');
        // z. B. Navigation zur Kamera-Seite oder Kamera-Component zeigen
        this.$router.push('/camera');
      }
    }
  }
  </script>
  
  <style scoped>
  .installed-home {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .headline {
    font-size: 2.5rem;
    font-weight: bold;
  }
  
  .camera-placeholder {
    border: 2px dashed #ccc;
    padding: 1rem;
    border-radius: 12px;
    background-color: #f8f9fa;
  }
  
  .btn-scan {
    background-color: #56ab2f;
    color: white;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
  
  .btn-scan:hover {
    background-color: #3d8a1a;
  }
  </style>
  