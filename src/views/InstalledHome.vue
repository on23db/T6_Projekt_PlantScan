<template>
  <div class="container-lg my-5">
    <div class="row d-flex flex-lg-row flex-column align-items-center justify-content-center gap-5">
      <!-- Rechte Seite: Text & Optionen -->
      <div class="col-lg-6 text-content">
        <h1>Discover the world at your own pace. ✨</h1>

        <!-- Optionen: Bild hochladen und Kamera nutzen -->
        <div class="text-section p-4 rounded">
          <p>Wähle eine der Optionen, um eine Pflanze zu identifizieren:</p>

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
            <h3>Das hast du als letztes entdeckt:</h3>
            <p class="last-discovery">Bild oder Pflanze anzeigen</p>
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
import PlantIdentifier from '@/components/PlantIdentifier.vue';

export default {
  name: 'HomeScreen',
  components: {
    CameraCapture,
    PlantIdentifier
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
