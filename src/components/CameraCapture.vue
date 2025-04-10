<template>
  <div class="plant-identifier">
    <div class="camera-section">
      <video ref="video" v-if="!capturedImage" autoplay playsinline class="camera-video"></video>
      <img v-else :src="capturedImage" alt="Vorschau" class="frozen-img" />
    </div>

    <div class="button-group">
      <button v-if="!capturedImage" @click="captureImage" class="capture-btn">📸 Bild aufnehmen</button>
      <button v-else @click="resetCamera" class="reset-btn">🔄 Neu aufnehmen</button>
    </div>

    <div v-if="isLoading" class="loading">🔍 Wird analysiert...</div>
    <div v-if="errorMessage" class="error">❌ {{ errorMessage }}</div>

    <div v-if="plantData" class="plant-images">
      <div v-for="(image, index) in plantData.images" :key="index" class="plant-image">
        <img :src="image.url" alt="Pflanzenbild" />
      </div>
    </div>

    <plant-details v-if="plantData" :plantData="plantData" />

  </div>
</template>

<script>
import axios from 'axios';
import PlantDetails from './PlantDetails.vue';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  components: {
    PlantDetails,
  },
  data() {
    return {
      stream: null,
      capturedImage: null,
      isLoading: false,
      plantData: null,
      errorMessage: null,
      showPopup: false,
    };
  },
  mounted() {
    this.startCamera();
  },
  beforeUnmount() {
    this.stopCamera();
  },
  methods: {
    async startCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        this.$refs.video.srcObject = this.stream;
        await this.$refs.video.play();
      } catch (err) {
        console.error(err);
        this.errorMessage = "Kamera konnte nicht gestartet werden.";
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
    },
    captureImage() {
      const video = this.$refs.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      this.capturedImage = canvas.toDataURL('image/png');
      this.identifyPlantFromBase64(this.capturedImage);
    },
    resetCamera() {
      this.capturedImage = null;
      this.errorMessage = null;
      this.startCamera();
    },
    async identifyPlantFromBase64(base64Image) {
      this.isLoading = true;
      this.errorMessage = null;

      const formData = new FormData();
      const blob = await (await fetch(base64Image)).blob();
      formData.append('images', blob, 'capture.png');

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

        this.plantData = response.data.results.length ? response.data.results[0] : null;

        if (this.plantData) {
          this.showPopup = true;
          this.saveScanToFirestore(this.plantData);
        }
      } catch (error) {
        console.error("API Fehler:", error);
        this.errorMessage = error.response
          ? `Fehler: ${error.response.status} – ${error.response.data.message || 'Unbekannt'}`
          : "Verbindungsfehler.";
      } finally {
        this.isLoading = false;
      }
    },
    async saveScanToFirestore(plantData) {
      const user = getAuth().currentUser;
      if (!user) return;

      const scan = {
        nameCommon: plantData.species?.commonNames?.[0] || 'Unbekannt',
        nameScientific: plantData.species?.scientificNameWithoutAuthor || 'Unbekannt',
        date: serverTimestamp(),
        score: plantData.score || null,
        imageUrl: plantData.images?.[0]?.url?.m || null,
      };

      try {
        await addDoc(collection(db, `users/${user.uid}/scans`), scan);
        console.log("Scan gespeichert.");
      } catch (error) {
        console.error("Fehler beim Speichern:", error);
      }
    },
    closePopup() {
      this.showPopup = false;
    }
  }
};
</script>

<style scoped>
.plant-identifier {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.camera-section {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3/4;
  border: 2px dashed #ccc;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.camera-video,
.frozen-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.capture-btn,
.reset-btn {
  background-color: #ffa500;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.reset-btn {
  background-color: gray;
}

.loading, .error {
  margin-top: 1em;
  padding: 0.5rem;
  color: white;
  border-radius: 8px;
}

.loading {
  background-color: #444;
}

.error {
  background-color: #e74c3c;
}

.plant-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

.plant-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  object-fit: cover;
}
</style>
