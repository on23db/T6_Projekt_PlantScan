<template>
  <div v-if="user">
    <h2>Zuletzt gescannte Pflanzen</h2>

    <div v-if="limitedScans.length > 0" class="row">
      <div
        class="col-md-6 mb-3"
        v-for="(scan, index) in limitedScans"
        :key="index"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ scan.name }}</h5>
            <p class="card-text">
              Gescannt am: {{ formatDate(scan.date) }}
            </p>
            <a v-if="scan.gbifId" :href="'https://www.gbif.org/species/' + scan.gbifId" target="_blank" class="link">
              Mehr erfahren
            </a>
          </div>
        </div>
      </div>

      <div class="col-12 mt-2 d-flex justify-content-center" v-if="!isProfilePage">
        <router-link to="/profile" class="btn-history">
          Zu deinem Verlauf
        </router-link>
      </div>
    </div>

    <p v-else>Du hast noch keine Pflanzen gescannt.</p>
  </div>

  <div v-else>
    <p>Melde dich an, um deine letzten Scans zu sehen.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { useRoute } from 'vue-router'

const user = ref(null)
const scans = ref([])

// Hole die aktuelle Route
const route = useRoute()

// Berechne, ob wir auf der Profilseite sind
const isProfilePage = computed(() => route.path === '/profile')

// Limitiere die Scans abhängig von der Seite (2 Scans auf anderen Seiten, alle im Profil)
const limitedScans = computed(() => {
  return isProfilePage.value ? scans.value : scans.value.slice(0, 2)
})

onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      // Lade zuerst die Scans aus IndexedDB
      await loadScansFromIndexedDB(currentUser.uid)

      // Wenn keine Daten in IndexedDB sind, hole sie aus Firestore
      if (scans.value.length === 0) {
        await setupRealTimeScans(currentUser.uid)
      }
    }
  })
})

// Holen der Scans aus Firestore (Echtzeit-Listener)
const setupRealTimeScans = (userId) => {
  const scansRef = collection(db, `users/${userId}/scans`)
  const q = query(scansRef, orderBy('date', 'desc'))

  onSnapshot(q, (snapshot) => {
    // Speichern der Scans in der reaktiven `scans`-Liste
    const fetchedScans = snapshot.docs.map(doc => doc.data())
    scans.value = fetchedScans

    // Speichern in IndexedDB, falls online
    saveScansToIndexedDB(userId, fetchedScans)
  })
}

// Laden der Scans aus IndexedDB
const loadScansFromIndexedDB = (userId) => {
  const dbRequest = indexedDB.open('plantScans', 1)

  dbRequest.onsuccess = event => {
    const db = event.target.result
    const transaction = db.transaction(['scans'], 'readonly')
    const objectStore = transaction.objectStore('scans')
    const index = objectStore.index('userId')

    const getRequest = index.getAll(userId)

    getRequest.onsuccess = () => {
      if (getRequest.result && getRequest.result.length > 0) {
        scans.value = getRequest.result
        console.log('Scans aus IndexedDB geladen')
      } else {
        console.log('Keine Scans in der IndexedDB gefunden')
      }
    }

    getRequest.onerror = () => {
      console.error('Fehler beim Laden der Scans aus IndexedDB')
    }
  }

  dbRequest.onerror = event => {
    console.error('Fehler beim Öffnen der IndexedDB:', event.target.error)
  }
}

// Speichern der Scans in IndexedDB
const saveScansToIndexedDB = (userId, scans) => {
  const dbRequest = indexedDB.open('plantScans', 1)

  dbRequest.onupgradeneeded = event => {
    const db = event.target.result
    const objectStore = db.createObjectStore('scans', { keyPath: 'id' })
    objectStore.createIndex('userId', 'userId', { unique: false })
  }

  dbRequest.onsuccess = event => {
    const db = event.target.result
    const transaction = db.transaction(['scans'], 'readwrite')
    const objectStore = transaction.objectStore('scans')

    scans.forEach(scan => {
      objectStore.put({
        id: scan.id,
        userId: userId,
        name: scan.name,
        date: scan.date,
        gbifId: scan.gbifId
      })
    })

    transaction.oncomplete = () => {
      console.log('Scans wurden lokal gespeichert.')
    }
  }

  dbRequest.onerror = event => {
    console.error('Fehler beim Speichern der Scans:', event.target.error)
  }
}

const formatDate = (date) => {
  if (date?.toDate) {
    return date.toDate().toLocaleDateString()
  } else {
    return new Date(date).toLocaleDateString()
  }
}

</script>

<style>
h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

.btn-history {
  background-color: orange;
  color: white;
  padding: 0.75rem 1.25rem; 
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  width: 100%; 
  text-align: center; 
}

.btn-history:hover {
  background-color: darkorange;
}
</style>
