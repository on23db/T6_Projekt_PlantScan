<template>
  <div class="plant-identifier">
    <div class="upload-section">
      <label for="file-upload" class="upload-box">
        <input type="file" id="file-upload" @change="handleFileUpload" accept="image/*" hidden />
        <div v-if="previewImage" class="preview">
          <img :src="previewImage" alt="Bildvorschau" />
        </div>
        <div v-else class="upload-text">📷 Bild auswählen</div>
      </label>
    </div>

    <div v-if="isLoading" class="loading">🔍 Wird analysiert...</div>
    <div v-if="errorMessage" class="error">❌ {{ errorMessage }}</div>

    <plant-details v-if="plantData" :plantData="plantData" />

    <!-- Popup für Benachrichtigung wird hier eingebunden -->
    <plant-info-popup
      v-if="showPopup"
      :plantData="plantData"
      :isVisible="showPopup"
      @close-popup="closePopup"
    />
  </div>
</template>

<script>
import axios from 'axios';
import PlantDetails from './PlantDetails.vue';
import PlantInfoPopup from '@/views/PlantInfoPopup.vue';  // Import Popup-Komponente

export default {
  name: 'PlantIdentifier',
  components: {
    PlantDetails,
    PlantInfoPopup,  // Einbinden der Komponente
  },
  data() {
    return {
      selectedFile: null,
      previewImage: null,
      isLoading: false,
      plantData: null,
      errorMessage: null,
      showPopup: false,  // Steuerung für das Popup
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
        this.identifyPlant(file);  // Sofortige Identifikation nach Upload
      }
    },

    async identifyPlant(file) {
      this.isLoading = true;
      this.errorMessage = null;

      const formData = new FormData();
      formData.append('images', file);

      try {
        const response = await axios.post('https://my-api.plantnet.org/v2/identify/all', formData, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_PLANTNET_API_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            lang: 'de', // Hier wird die Sprache auf Deutsch gesetzt
          }
        });

        this.plantData = response.data.results.length ? response.data.results[0] : null;
        if (this.plantData) {
          this.showPopup = true;  // Popup anzeigen, wenn Pflanze erkannt wurde
        }
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
        this.errorMessage = error.response
          ? `Fehler: ${error.response.status} - ${error.response.data.message || 'Unbekannt'}`
          : "Verbindungsfehler.";
      } finally {
        this.isLoading = false;
      }
    },

    closePopup() {
      this.showPopup = false;  // Popup schließen
    }
  },
};
</script>

<style scoped>
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(50, 50, 50, 0.8);
  width: auto;
  height: 30vh;
  border-radius: 12px;
  border-style: dotted;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
  overflow: hidden;
  position: relative;
}

.upload-box:hover {
  background: rgba(60, 60, 60, 1);
}

.preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.loading, .error {
  margin-top: 1em;
  padding: 0.5rem;
  color: #fff;
}

.loading {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 12px;
}

.error {
  background-color: #e74c3c;
  color: #fff;
  border: 1px solid #c0392b;
  padding: 1rem;
  border-radius: 8px;
}
</style>
