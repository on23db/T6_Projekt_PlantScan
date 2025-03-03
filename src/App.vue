<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
</template>

<style>
/* Light Mode */
@media (prefers-color-scheme: light) {
  body {
    background-color: #fff;
    color: #000;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1f1f1f;
    color: #fff;
  }
}

</style>
