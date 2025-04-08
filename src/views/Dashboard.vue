<template>
  <div class="container-lg my-5">
    <div class="row d-flex flex-lg-row flex-column align-items-center justify-content-center gap-5">
      <!-- Linke Seite: Headline und Bild -->
      <div class="col-lg-4 text-content">
        <h1>Discover the world at your own pace.✨</h1>
        <img src="/src/assets/Monstera deliciosa.png" alt="Monstera" class="img-fluid">
      </div>

      <!-- Rechte Seite: Optionen zum Scannen und Hochladen von Bildern -->
      <div class="col-lg-6 text-content">
        <div class="text-section p-4 rounded">

          <!-- Grid für Bild hochladen und Kamera nutzen nebeneinander -->
          <div class="row g-4">
            <!-- Bild hochladen Option -->
            <div class="col-12 col-md-6">
              <h3>Bild hochladen</h3>
              <PlantIdentifier />
            </div>

            <!-- Kamera nutzen Option -->
            <div class="col-12 col-md-6">
              <h3>Kamera nutzen</h3>
              <!-- Navigiere zur CameraCapture-Seite -->
              <router-link to="/camera" class="btn btn-success">Kamera starten</router-link>
            </div>
          </div>

          <!-- Zuletzt Entdecktes -->
          <div class="mt-4">
            <PlantHistory :maxScans="2" />
            <router-link to="/profile" class="btn btn-link">Alle Scans ansehen</router-link> <!-- Link zur Profilseite -->
          </div>
        </div>

        <!-- PWA Install Option -->
        <div class="mt-4" v-if="installReady && !isStandalone">
          <p><strong>Ready for more?</strong> Mit unserer App hältst du das ganze Wissen der Natur in deiner Hand. Werde
            noch heute Pflanzenexperte!</p>
          <button class="btn" type="button" @click="installApp">App installieren</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CameraCapture from '@/components/CameraCapture.vue';
import PlantHistory from '@/components/PlantHistory.vue';
import PlantIdentifier from '@/components/PlantIdentifier.vue';

export default {
  name: 'Dashboard',
  components: {
    CameraCapture,
    PlantIdentifier,
    PlantHistory
  },
  data() {
    return {
      deferredPrompt: null,
      installReady: false,
      isStandalone: false
    };
  },
  mounted() {
    // Check if PWA is running standalone
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    // Show install button if prompt is available
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.installReady = true;
    });
  },

  methods: {
    async installApp() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const choiceResult = await this.deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
        this.installReady = false;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.text-content {
  max-width: 600px;
}

.text-section {
  background-color: rgba(130, 136, 124, 0.291);
  padding: 2rem;
  border-radius: 12px;
}

.btn {
  background-color: #e49e13;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}

.btn:hover {
  background-color: #b8770d;
  color: white;
}

.img-fluid {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.last-discovery {
  font-weight: bold;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.3rem;
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
