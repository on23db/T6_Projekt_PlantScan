<template>
    <div class="plant-list-container">
        <h1>🌿 Gespeicherte Pflanzen</h1>

        <div v-if="loading" class="loading">Lade Pflanzen...</div>
        <div v-else-if="plants.length === 0" class="no-plants">Noch keine Pflanzen gespeichert.</div>

        <ul v-else>
            <li v-for="plant in plants" :key="plant.id" class="plant-item">
                <h2>{{ plant.name }}</h2>
                <p><strong>Wissenschaftlicher Name:</strong> {{ plant.scientificName }}</p>
                <p><strong>Hinzugefügt am:</strong> {{ formatDate(plant.timestamp) }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default {
    props: { 
        userId: { // Prop hinzugefügt, um Benutzer-ID zu erhalten
            type: String,
            required: true
        }
    },
    setup(props) {
        const plants = ref([]);
        const loading = ref(true);

        const fetchPlants = async () => {
            try {
                const q = query(collection(db, "plants"), where("userId", "==", props.userId)); // Benutzer-spezifische Abfrage
                const querySnapshot = await getDocs(q);
                plants.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Fehler beim Laden der Pflanzen:", error);
            } finally {
                loading.value = false;
            }
        };

        // Überwacht Änderungen der Benutzer-ID
        watch(() => props.userId, fetchPlants);

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
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: transparent;
    border-radius: 8px;
}

h1 {
    text-align: center;
    color: #217735;
    margin-bottom: 1.5rem;
}

.loading,
.no-plants {
    text-align: center;
    font-size: 1.2rem;
    color: #555;
    margin-top: 2rem;
}

ul {
    list-style-type: none;
    padding: 0;
}

.plant-item {
    background: white;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.plant-item h2 {
    font-size: 1.5rem;
    color: #217735;
}

.plant-item p {
    margin: 0.5rem 0;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .plant-list-container {
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
    }

    .plant-item {
        padding: 1rem;
    }
}
</style>
