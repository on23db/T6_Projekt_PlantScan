<template>
  <div class="container-lg my-5">
    <div class="row d-flex flex-lg-row flex-column align-items-center justify-content-center gap-5">

      <!-- Linke Seite: Bild -->
      <div class="col-lg-6 image-section">
        <img src="/src/assets/Monstera deliciosa.png" alt="Monstera" class="img-fluid">
      </div>

      <!-- Rechte Seite: Text & Upload -->
      <div class="col-lg-6 text-content">
        <h1>Nature at your Fingertips.</h1>
        <p>
          Erkenne deine Pflanzen im Handumdrehen! Lade einfach ein Bild hoch und erfahre mehr über die Pflanzen in
          deiner Umwelt.
        </p>

        <div class="text-section p-4 rounded">
          <h2>Probier es aus!</h2>
          <p>Lade ein Foto deiner Pflanze hoch und wir helfen dir beim Identifizieren.</p>
          <PlantIdentifier />
        </div>
        <div class="mt-4">
          <p><strong>Ready for more?</strong> Mit unserer App hältst du das ganze Wissen der Natur in deiner Hand. Werde
            noch heute Pflanzenexperte!</p>
          <button class="btn" type="button"  @click="installApp" v-if="installReady">App installieren</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import PlantIdentifier from '@/components/PlantIdentifier.vue';

export default {
  name: 'Home',
  components: {
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

<style scoped>
h1 {
  font-size: 2,7rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.image-section {
  max-width: 500px;
  flex-shrink: 0;
}

.image-section img {
  width: 100%;
  height: auto;
  border-radius: 12px;
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

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
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