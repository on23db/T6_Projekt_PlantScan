<template>
    <div class="plant-details">
      <div v-if="plantData">
        <h3 class="scientific-name">{{ plantData.species.scientificName }}</h3>
        <p><strong>Wissenschaftlicher Name:</strong> {{ plantData.species.scientificName }}</p>
        
        <div v-if="plantData.species.commonNames && plantData.species.commonNames.length">
          <p><strong>Häufige Namen:</strong> {{ plantData.species.commonNames.join(', ') }}</p>
        </div>
        <div v-else>
          <p>❗ Keine gängigen Namen gefunden.</p>
        </div>
  
        <div v-if="plantData.species.description">
          <p><strong>Beschreibung:</strong> {{ plantData.species.description }}</p>
        </div>
  
        <div v-if="plantData.images && plantData.images.length" class="image-info">
          <p><strong>Bildquelle:</strong> <a :href="plantData.images[0].url.o" target="_blank" class="link">Bild anzeigen</a></p>
          <p><strong>Bildlizenz:</strong> {{ plantData.images[0].license || 'Keine Lizenz verfügbar' }}</p>
          <p><strong>Bildautor:</strong> {{ plantData.images[0].author || 'Unbekannt' }}</p>
        </div>
  
        <div v-if="plantData.iucn && plantData.iucn.category">
          <p><strong>Schutzstatus:</strong> {{ plantData.iucn.category }}</p>
        </div>
  
        <div v-if="plantData.species.geographicArea">
          <p><strong>Herkunft:</strong> {{ plantData.species.geographicArea }}</p>
        </div>
  
        <div v-if="plantData.species.family && plantData.species.family.scientificName">
          <p><strong>Familie:</strong> {{ plantData.species.family.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.genus && plantData.species.genus.scientificName">
          <p><strong>Gattung:</strong> {{ plantData.species.genus.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.kingdom && plantData.species.kingdom.scientificName">
          <p><strong>Königreich:</strong> {{ plantData.species.kingdom.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.order && plantData.species.order.scientificName">
          <p><strong>Ordnung:</strong> {{ plantData.species.order.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.phylum && plantData.species.phylum.scientificName">
          <p><strong>Phylum:</strong> {{ plantData.species.phylum.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.class && plantData.species.class.scientificName">
          <p><strong>Klasse:</strong> {{ plantData.species.class.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.subFamily && plantData.species.subFamily.scientificName">
          <p><strong>Unterfamilie:</strong> {{ plantData.species.subFamily.scientificName }}</p>
        </div>
  
        <div v-if="plantData.species.careTips && plantData.species.careTips.length">
          <p><strong>Pflegehinweise:</strong></p>
          <ul>
            <li v-for="(tip, index) in plantData.species.careTips" :key="index">{{ tip }}</li>
          </ul>
        </div>
  
        <div v-if="plantData.gbif && plantData.gbif.id">
          <p><strong>GBIF ID:</strong> <a :href="'https://www.gbif.org/species/' + plantData.gbif.id" target="_blank" class="link">Mehr erfahren</a></p>
        </div>
  
        <div v-if="plantData.species.synonyms && plantData.species.synonyms.length">
          <p><strong>Synonyme:</strong> {{ plantData.species.synonyms.join(', ') }}</p>
        </div>
  
        <div v-if="plantData.species.hybrids && plantData.species.hybrids.length">
          <p><strong>Hybriden:</strong> {{ plantData.species.hybrids.join(', ') }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlantDetails',
    props: {
      plantData: {
        type: Object,
        required: true, // Pflanzendaten müssen hier übergeben werden
      },
    },
  };
  </script>
  
  <style scoped>
  .plant-details {
    margin-top: 20px;
    padding: 20px;
    background-color: #2c3e50; /* Dunklerer Hintergrund für besseren Kontrast */
    color: #ecf0f1; /* Helle Schriftfarbe */
    border-radius: 10px;
  }
  
  .plant-details h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #f39c12; /* Helle Farbe für den wissenschaftlichen Namen */
  }
  
  .plant-details p {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  
  .image-info {
    margin-top: 1rem;
  }
  
  .link {
    color: #f1c40f;
    text-decoration: none;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  
  /* Stil für die Liste der Pflegehinweise */
  ul {
    list-style-type: square;
    margin-left: 20px;
  }
  
  ul li {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  </style>
  