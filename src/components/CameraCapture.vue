<template>
  <div class="identifier-container">
    <!-- Kameraansicht oder eingefrorenes Bild -->
    <div class="camera-section" v-if="!capturedImage">
      <video ref="video" class="camera-video" autoplay playsinline></video>
    </div>
    
    <!-- Wenn ein Bild aufgenommen wurde, wird es hier angezeigt -->
    <div v-if="capturedImage" class="camera-section frozen-image">
      <img :src="capturedImage" alt="Eingefrorenes Bild" class="frozen-img" />
    </div>

    <!-- Button zum Bild aufnehmen -->
    <div v-if="!capturedImage" class="button-container">
      <button @click="captureImage" class="capture-btn">📸 Bild aufnehmen</button>
    </div>

    <!-- Vorschau des Bildes -->
    <div v-if="previewImage" class="preview">
      <button @click="resetImage" class="reset-btn">📷 Nochmal aufnehmen</button>
      <button @click="sendToAPI" class="send-btn">🌿 Pflanze identifizieren</button>
    </div>

    <!-- Ergebnisse -->
    <div v-if="isLoading" class="loading">🔍 Analyse läuft...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <plant-details v-if="plantData" :plantData="plantData" />
  </div>
</template>

<script>
import axios from 'axios';
import PlantDetails from './PlantDetails.vue';

export default {
  components: {
    PlantDetails,
  },
  data() {
    return {
      stream: null,
      capturedImage: null,
      previewImage: null,
      isLoading: false,
      plantData: null,
      errorMessage: null,
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    async startCamera() {
  const video = this.$refs.video;

  if (!navigator.mediaDevices?.getUserMedia) {
    this.errorMessage = "Dein Browser unterstützt keine Kamera.";
    return;
  }

  try {
    this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = this.stream;

    // Sicherstellen, dass das Video abgespielt wird
    await video.play();
  } catch (err) {
    console.error("Kamera-Fehler:", err);
    this.errorMessage = "Kamera konnte nicht gestartet werden.";
  }
}
,
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
      if (this.$refs.video) {
        this.$refs.video.srcObject = null;
      }
    },
    captureImage() {
      const video = this.$refs.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/png');
      this.capturedImage = imageData;
      this.previewImage = imageData;

      // Kamera wird NICHT gestoppt, falls man nochmal fotografieren möchte
    },
    resetImage() {
  this.capturedImage = null;
  this.previewImage = null;

  // Stop + Neustart für einen sauberen Reset
  this.stopCamera();

  // Etwas Verzögerung, damit das Video-Element Zeit hat sich zu "resetten"
  setTimeout(() => {
    this.startCamera();
  }, 300);
}
,
    async sendToAPI() {
      this.isLoading = true;
      this.errorMessage = null;

      const formData = new FormData();

      if (typeof this.previewImage === 'string') {
        const blob = await (await fetch(this.previewImage)).blob();
        formData.append('images', blob, 'capture.png');
      }

      try {
        const response = await axios.post('https://my-api.plantnet.org/v2/identify/all', formData, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_PLANTNET_API_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            lang: 'de',
          },
        });

        this.plantData = response.data.results?.[0] || null;
      } catch (error) {
        this.errorMessage = error.response
          ? `Fehler: ${error.response.status} – ${error.response.data.message || 'Unbekannt'}`
          : "Verbindungsfehler.";
      } finally {
        this.isLoading = false;
      }
    }
  },
  beforeUnmount() {
    this.stopCamera();
  },
};
</script>


<style scoped>
.identifier-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.camera-section {
  position: relative;
  width: 100%;
  max-width: 25em;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 12px;
  border: 2px solid #ababab;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.frozen-image {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: auto;
}

.frozen-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.capture-btn {
  background-color: orange;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.capture-btn:hover {
  background-color: darkorange;
}

.preview {
  text-align: center;
}

.preview img {
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  margin-bottom: 0.5rem;
}

.send-btn, .reset-btn {
  border: none;
  padding: 10px 16px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin: 0.5rem;
}

.send-btn {
  background-color: green;
}

.reset-btn {
  background-color: grey;
}

.send-btn:hover, .reset-btn:hover {
  opacity: 0.8;
}

.loading,
.error {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  color: white;
  text-align: center;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.loading {
  background-color: #444;
}

.error {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 400px;
  font-size: 1rem;
  background-color: #e74c3c;
}

.camera-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
}
</style>
