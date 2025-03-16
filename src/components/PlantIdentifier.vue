<template>
  <div class="plant-identifier">
    <div class="upload-section">
      <!-- Datei-Upload mit Bildvorschau -->
      <label for="file-upload" class="upload-box">
        <input type="file" id="file-upload" @change="handleFileUpload" accept="image/*" hidden />
        <div v-if="previewImage" class="preview">
          <img :src="previewImage" alt="Bildvorschau" />
        </div>
        <div v-else class="upload-text">📷 Bild auswählen</div>
      </label>
    </div>

    <!-- Lade-Animation -->
    <div v-if="isLoading" class="loading">🔍 Wird analysiert...</div>

    <!-- Ergebnisse -->
    <div v-if="plantData" class="result">
      <!-- Wissenschaftlicher Name der Pflanze -->
      <h3 class="scientific-name">{{ plantData.species.scientificName }}</h3>
      
      <!-- Gängige Namen der Pflanze -->
      <p v-if="plantData.species.commonNames.length">
        <strong>Häufige Namen:</strong> {{ plantData.species.commonNames.join(', ') }}
      </p>
      <p v-else>❗ Keine gängigen Namen gefunden.</p>

      <!-- Bildquelle und Lizenz -->
      <div v-if="plantData.images && plantData.images.length" class="image-info">
        <p><strong>Bildquelle:</strong> <a :href="plantData.images[0].url.o" target="_blank" class="link">Bild anzeigen</a></p>
        <p><strong>Bildlizenz:</strong> {{ plantData.images[0].license || 'Keine Lizenz verfügbar' }}</p>
        <p><strong>Bildautor:</strong> {{ plantData.images[0].author || 'Unbekannt' }}</p>
        <p><strong>Bilddatum:</strong> {{ plantData.images[0].date.string || 'Kein Datum verfügbar' }}</p>
      </div>

      <!-- Schutzstatus (IUCN) und GBIF-ID -->
      <div class="extra-info">
        <p v-if="plantData.iucn && plantData.iucn.category">
          <strong>Schutzstatus:</strong> {{ plantData.iucn.category }} <span class="icon" role="img" aria-label="Warnung">⚠️</span>
        </p>
        <p v-if="plantData.gbif && plantData.gbif.id">
          <strong>GBIF ID:</strong> <a :href="'https://www.gbif.org/species/' + plantData.gbif.id" target="_blank" class="link">Mehr erfahren</a>
        </p>
      </div>

      <!-- Geografische Herkunft und andere interessante Fakten -->
      <div v-if="plantData.species.geographicArea" class="geography">
        <p><strong>Herkunft:</strong> {{ plantData.species.geographicArea || 'Unbekannt' }}</p>
      </div>
    </div>

    <!-- Fehleranzeige -->
    <div v-if="errorMessage" class="error">❌ {{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PlantIdentifier",
  data() {
    return {
      selectedFile: null,
      previewImage: null,
      isLoading: false,
      plantData: null,
      errorMessage: null,
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
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
        this.errorMessage = error.response
          ? `Fehler: ${error.response.status} - ${error.response.data.message || 'Unbekannt'}` 
          : "Verbindungsfehler.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(145, 145, 145, 0.318);
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
  background: rgba(105, 105, 105, 0.4);
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

.loading, .result, .error {
  margin-top: 1em;
  padding: 0.5rem;
}

.loading {
  background: rgba(145, 145, 145, 0.318);
  border-radius: 12px;
}

.result .scientific-name {
  font-weight: bold;
  color: #278d5f;
}

.result .extra-info {
  margin-top: 1em;
  background: #f1f8f26b;
  padding: 1rem;
  border-radius: 8px;
}

.result .geography {
  margin-top: 1em;
  background: #f9f9f988;
  padding: 0.8rem;
  border-radius: 8px;
}

.result .link {
  color: #3b79b3;
  text-decoration: none;
}

.result .link:hover {
  text-decoration: underline;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 8px;
}
</style>
