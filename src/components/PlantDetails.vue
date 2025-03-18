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

      <!-- Weitere Taxonomische Daten -->
      <div v-if="plantData.species.family && plantData.species.family.scientificName">
        <p><strong>Familie:</strong> {{ plantData.species.family.scientificName }}</p>
      </div>

      <div v-if="plantData.species.genus && plantData.species.genus.scientificName">
        <p><strong>Gattung:</strong> {{ plantData.species.genus.scientificName }}</p>
      </div>

      <!-- GBIF ID -->
      <div v-if="plantData.gbif && plantData.gbif.id">
        <p><strong>Weitere Informationen auf GBIF:</strong> 
          <a :href="'https://www.gbif.org/species/' + plantData.gbif.id" target="_blank" class="link"> Mehr erfahren </a>
        </p>
      </div>

      <div v-else>
        <p>❗ Keine Pflanzendaten verfügbar.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlantDetails",
  props: {
    plantData: {
      type: Object,
      required: true, // Pflanzendaten müssen hier übergeben werden
    },
  },
  mounted() {
    console.log(this.plantData);
  },
};
</script>

<style scoped>
.plant-details {
  margin-top: 20px;
  padding: 20px;
  background-color: var(--background-color); /* Dynamischer Hintergrund */
  color: var(--text-color); /* Dynamische Textfarbe */
  border-radius: 10px;
  transition: all 0.3s ease; /* Sanfter Übergang bei Theme-Wechsel */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.plant-details h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f39c12; /* Orange für wissenschaftlichen Namen */
}

.plant-details p {
  font-size: 1rem;
  margin: 0.5rem 0;
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
