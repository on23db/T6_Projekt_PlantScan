<template>
  <div id="app">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const theme = ref('light');

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  theme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.setAttribute('data-bs-theme', theme.value);
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

/* Hintergrund-Gradient unten */
body::after {
  content: "";
  position: fixed;
  bottom: -20vh; 
  left: 50%;
  transform: translateX(-50%);
  width: 150vw; 
  height: 100vh; 
  background: radial-gradient(ellipse at bottom, rgba(44, 208, 96, 0.2) 0%, transparent 70%);
  z-index: -1;
}

/* Dark Mode - Etwas dezenter */
[data-theme="dark"] body::after {
  background: radial-gradient(ellipse at bottom, rgba(44, 208, 96, 0.1) 0%, transparent 70%);
}

</style>
