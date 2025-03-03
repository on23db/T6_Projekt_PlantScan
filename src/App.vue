<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
</template>

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
