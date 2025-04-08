<template>
  <div id="app">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Firebase Auth importieren
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useRouter } from 'vue-router';  // Router für Weiterleitungen

const theme = ref('light');
const router = useRouter();  // Router verwenden

onMounted(() => {
  // Theme aus dem localStorage laden
  const savedTheme = localStorage.getItem('theme') || 'light';
  theme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.setAttribute('data-bs-theme', theme.value);

  // Firebase Auth State überwachen
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Wenn der Benutzer eingeloggt ist, zu Home weiterleiten
      router.push('/dashboard');
    } else {
      // Wenn der Benutzer nicht eingeloggt ist, zu Splash weiterleiten
      router.push('/splash');
    }
  });
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
