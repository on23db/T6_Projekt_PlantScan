<template>
  <div v-if="user">
    <h2>Zuletzt gescannte Pflanzen</h2>

    <div v-if="scans.length > 0" class="row">
      <div
        class="col-md-6 mb-3"
        v-for="(scan, index) in scans"
        :key="index"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ scan.name }}</h5>
            <p class="card-text">
              Gescannt am: {{ formatDate(scan.date) }}
            </p>
            <!-- GBIF-Link hier hinzufügen -->
            <a v-if="scan.gbifId" :href="'https://www.gbif.org/species/' + scan.gbifId" target="_blank" class="link">
              Mehr erfahren
            </a>
          </div>
        </div>
      </div>
    </div>

    <p v-else>Du hast noch keine Pflanzen gescannt.</p>
  </div>

  <div v-else>
    <p>Bitte melde dich an, um deine Scans zu sehen.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, orderBy, limit, addDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase' // Importiere Firebase Auth und DB

const user = ref(null)
const scans = ref([])

// Firebase Auth: Überprüfe, ob der User eingeloggt ist
onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      // Hol dir die Scans des eingeloggten Users
      await loadUserScans(currentUser.uid)
    }
  })
})

// Lädt die Scans des Users
const loadUserScans = async (userId) => {
  const scansRef = collection(db, `users/${userId}/scans`)
  const q = query(scansRef, orderBy('date', 'desc'), limit(5)) // Sortiere nach Datum (absteigend) und limitiere auf 5 Scans

  const scanDocs = await getDocs(q)
  scans.value = scanDocs.docs.map(doc => doc.data())
}

const formatDate = (date) => {
  if (date?.toDate) {
    return date.toDate().toLocaleDateString()
  } else {
    return new Date(date).toLocaleDateString()
  }
}

// Neue Pflanze scannen und speichern
const scanPlant = async () => {
  const plantName = 'Monstera'  // Beispielpflanze, hier sollte der echte Name aus dem Scan kommen
  const scanDate = new Date().toISOString()  // Aktuelles Datum und Uhrzeit
  const gbifId = '123456' // Beispiel-GBIF-ID, diese ID kommt idealerweise aus dem Scan-Daten-Objekt
  
  if (user.value) {
    // Scans Collection des Benutzers in Firestore
    const scansRef = collection(db, `users/${user.value.uid}/scans`)
    try {
      // Speichern der Pflanze in Firestore
      await addDoc(scansRef, {
        name: plantName,
        date: scanDate,
        gbifId: gbifId // Füge die GBIF-ID hinzu
      })
      console.log('Scan erfolgreich gespeichert')
      
      // Lade die Scans nach dem Speichern neu
      await loadUserScans(user.value.uid)
    } catch (e) {
      console.error('Fehler beim Speichern des Scans: ', e)
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
button {
  padding: 10px;
  background-color: #217735;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

/* Link-Styling */
.link {
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
