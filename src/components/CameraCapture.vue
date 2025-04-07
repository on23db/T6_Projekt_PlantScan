<template>
    <div>
      <h1>Deine Kamera</h1>
      <video ref="videoElement" width="100%" height="auto" autoplay></video>
      <button @click="startCamera">Kamera starten</button>
      <button @click="stopCamera">Kamera stoppen</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stream: null,
        errorMessage: null
      };
    },
    methods: {
      async startCamera() {
        try {
          // Versuche, Zugriff auf die Kamera zu erhalten und explizit die Rückkamera zu verwenden
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment" // 'environment' bedeutet die Backkamera
            }
          });
          // Video-Element mit dem Kamerastream verbinden
          this.$refs.videoElement.srcObject = stream;
          this.stream = stream;
          this.errorMessage = null;  // Lösche vorherige Fehlermeldung
        } catch (error) {
          console.error("Fehler beim Zugriff auf die Kamera:", error);
          this.errorMessage = `Fehler: ${error.message}`;
        }
      },
      stopCamera() {
        if (this.stream) {
          // Alle Tracks des Streams stoppen
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
        }
      }
    },
    beforeDestroy() {
      // Stoppe die Kamera, wenn die Komponente zerstört wird
      this.stopCamera();
    }
  };
  </script>
  
  <style scoped>
  video {
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  