<template>
  <div id="app">
    <!-- Navbar für größere Screens -->
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />

    <router-view />

    <!-- Footer für alle -->
    <Footer />

    <!-- BottomNavigation nur auf Mobile sichtbar -->
    <BottomNavigation v-if="isMobile" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import BottomNavigation from './components/BottomNavigation.vue';
import { useRouter } from 'vue-router';

const theme = ref('light');
const isMobile = ref(false);
const router = useRouter();

// Funktion, um die Bildschirmbreite zu überprüfen
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768; // 768px als Grenze für mobile Geräte
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  theme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.setAttribute('data-bs-theme', theme.value);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    router.push(user ? '/dashboard' : '/home');
  });

  checkIfMobile(); // Initiale Überprüfung
  window.addEventListener('resize', checkIfMobile); // Event Listener für Fenstergröße ändern
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIfMobile); // Listener entfernen
});

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.setAttribute('data-bs-theme', theme.value);
  localStorage.setItem('theme', theme.value);
};
</script>

<style>
:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

[data-theme="dark"] {
  --background-color: #222222;
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
}
</style>
