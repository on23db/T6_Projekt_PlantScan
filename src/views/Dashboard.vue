<template>
  <div class="container-lg my-5">
    <div class="row d-flex flex-lg-row flex-column align-items-center justify-content-center gap-5">
      
      <!-- Linke Seite: Headline und Bild -->
      <div class="col-lg-6 text-content">
        <h1>What will you discover today?✨</h1>
        <img src="/src/assets/Monstera deliciosa.png" alt="Monstera" class="img-fluid" />
      </div>

      <!-- Rechte Seite: Optionen zum Scannen und Hochladen von Bildern -->
      <div class="col-lg-6 text-content">
        <div class="text-section p-4 rounded">
          <h2>Pflanzen entdecken🔎</h2>
          <h3>Lade ein Bild hoch</h3>
          <PlantIdentifier />
          <h3 class="mt-4">Oder nutze deine Kamera</h3> <!-- Hier wird margin-top hinzugefügt -->
          <router-link to="/camera" class="btn btn-camera">Kamera starten</router-link>
        </div>

        <!-- Box für Zuletzt Entdecktes -->
        <div class="history-box mt-4">
          <PlantHistory />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlantHistory from '@/components/PlantHistory.vue';
import PlantIdentifier from '@/components/PlantIdentifier.vue';

export default {
  name: 'Dashboard',
  components: {
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
        this.deferredPrompt = null;
        this.installReady = false;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2.7rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

h2 {
  font-size: 1.8rem;
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

.text-section, .history-box {
  background-color: rgba(130, 136, 124, 0.291);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.btn {
  background-color: orange;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: darkorange;
  color: white;
  transform: translateY(-2px);
}

.btn-camera {
  background-color: orange;
  color: white;
  width: 100%; /* Button nimmt die gesamte Breite ein */
  padding: 0.75rem 1.25rem; /* Vertikale und horizontale Polsterung */
  border-radius: 8px;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.btn-camera:hover {
  background-color: darkorange;
}

.img-fluid {
  width: 80%;
  height: auto;
  border-radius: 12px;
  display: block; 
  margin-left: auto; 
  margin-right: auto; 
}


@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  .text-section, .history-box {
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
