<template>
    <div class="plant-list-container">
        <h1>🌿 Gespeicherte Pflanzen</h1>

        <div v-if="loading">Lade Pflanzen...</div>
        <div v-else-if="plants.length === 0">Noch keine Pflanzen gespeichert.</div>

        <ul v-else>
            <li v-for="plant in plants" :key="plant.id">
                <h2>{{ plant.name }}</h2>
                <p><strong>Wissenschaftlicher Name:</strong> {{ plant.scientificName }}</p>
                <p><strong>Hinzugefügt am:</strong> {{ formatDate(plant.timestamp) }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default {
    setup() {
        const plants = ref([]);
        const loading = ref(true);

        const fetchPlants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "plants"));
                plants.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Fehler beim Laden der Pflanzen:", error);
            } finally {
                loading.value = false;
            }
        };

        const formatDate = (timestamp) => {
            if (!timestamp) return "Unbekannt";
            const date = timestamp.toDate();
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        };

        onMounted(fetchPlants);

        return { plants, loading, formatDate };
    }
};
</script>

<style scoped>
.plant-list-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #217735;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: white;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>