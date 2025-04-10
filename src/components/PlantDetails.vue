<template>
  <div class="plant-details">
    <div v-if="plantData">
      <!-- Häufiger Name (erstes Element aus commonNames) -->
      <h3 class="common-name">{{ plantData.species.commonNames ? plantData.species.commonNames[0] : '❗ Kein häufiger Name gefunden.' }}</h3>

      <!-- Weitere gängige Namen unterhalb des häufigen Namens -->
      <div v-if="plantData.species.commonNames && plantData.species.commonNames.length > 1">
        <p><strong>Trivialnamen:</strong> {{ plantData.species.commonNames.slice(1).join(', ') }}</p>
      </div>

      <!-- Wissenschaftlicher Name -->
      <p><strong>Wissenschaftlicher Name:</strong> {{ plantData.species.scientificName }}</p>

      <!-- Familie -->
      <div v-if="plantData.species.family && plantData.species.family.scientificName">
        <p><strong>Familie:</strong> {{ plantData.species.family.scientificName }}</p>
      </div>

      <!-- Gattung -->
      <div v-if="plantData.species.genus && plantData.species.genus.scientificName">
        <p><strong>Gattung:</strong> {{ plantData.species.genus.scientificName }}</p>
      </div>

      <!-- GBIF ID -->
      <div v-if="plantData.gbif && plantData.gbif.id">
        <p><strong>Weitere Informationen auf GBIF:</strong> 
          <a :href="'https://www.gbif.org/species/' + plantData.gbif.id" target="_blank" class="link"> Mehr erfahren </a>
        </p>
      </div>

    </div>
    <div v-else>
      <p>❗ Keine Pflanzendaten verfügbar.</p>
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
  background-color: var(--background-color); 
  color: var(--text-color); 
  border-radius: 10px;
  transition: all 0.3s ease; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.common-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.plant-details h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f39c12; 
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

ul {
  list-style-type: square;
  margin-left: 20px;
}

ul li {
  font-size: 1rem;
  margin: 0.5rem 0;
}
</style>
