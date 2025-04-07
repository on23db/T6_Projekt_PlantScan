<template>
    <div class="identifier-container">
      <!-- Kameraansicht -->
      <div class="camera-section" v-if="!capturedImage">
        <video ref="video" class="camera-video" autoplay playsinline></video>
        <button @click="captureImage" class="capture-btn">📸 Bild aufnehmen</button>
      </div>
  
      <!-- Vorschau & Upload -->
      <div class="upload-section" v-if="!capturedImage">
        <label for="file-upload" class="upload-box">
          <input type="file" id="file-upload" @change="handleFileUpload" accept="image/*" hidden />
          <div class="upload-text">📷 Bild hochladen</div>
        </label>
      </div>
  
      <!-- Vorschau aufgenommenes oder hochgeladenes Bild -->
      <div v-if="previewImage" class="preview">
        <img :src="previewImage" alt="Bildvorschau" />
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
      startCamera() {
        const video = this.$refs.video;
        if (navigator.mediaDevices?.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: { facingMode: 'environment' } })
            .then((stream) => {
              video.srcObject = stream;
            })
            .catch((err) => {
              console.error("Kamera-Fehler:", err);
              this.errorMessage = "Kamera konnte nicht gestartet werden.";
            });
        }
      },
      stopCamera() {
        const stream = this.$refs.video?.srcObject;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      },
      captureImage() {
        const video = this.$refs.video;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.capturedImage = canvas.toDataURL('image/png');
        this.previewImage = this.capturedImage;
        this.stopCamera();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.previewImage = URL.createObjectURL(file);
          this.capturedImage = file;
        }
      },
      async sendToAPI() {
        this.isLoading = true;
        this.errorMessage = null;
  
        const formData = new FormData();
        if (typeof this.capturedImage === 'string') {
          const blob = await (await fetch(this.capturedImage)).blob();
          formData.append('images', blob, 'capture.png');
        } else {
          formData.append('images', this.capturedImage);
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
    }
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
    max-width: 400px;
    aspect-ratio: 3/4;
    overflow: hidden;
    border-radius: 12px;
    border: 2px solid #fff;
  }
  
  .camera-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .capture-btn {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #28a745;
    border: none;
    padding: 12px 20px;
    border-radius: 24px;
    color: white;
    cursor: pointer;
  }
  
  .upload-box {
    background: #91919151;
    border: 2px dashed #aaa;
    padding: 1rem;
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
    width: 100%;
    max-width: 300px;
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
  
  .send-btn {
    background-color: #007bff;
    border: none;
    padding: 10px 16px;
    color: white;
    border-radius: 8px;
    cursor: pointer;
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
  }
  
  .loading {
    background-color: #444;
  }
  
  .error {
    background-color: #e74c3c;
  }
  </style>
  