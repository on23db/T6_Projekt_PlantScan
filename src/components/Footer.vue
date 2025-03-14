<template>
  <footer class="footer">
    <div class="footer-links">
      <router-link to="/überuns">Über uns</router-link>
      <router-link to="/impressum">Impressum</router-link>
      <router-link to="/datenschutz">Datenschutz</router-link>
      <router-link to="/hilfe">Hilfe</router-link>
      <router-link to="/kontakt">Kontakt</router-link>
    </div>
    <div class="footer-copy">
      © 2025 PlantScan
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};

</script>

<style scoped>
.footer {
  padding: 2rem 1rem;
  font-size: 12px;
  color: var(--bs-gray-600);
  text-align: center;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-links a {
  color: var(--bs-grey-600);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--bs-green);
}

.footer-copy {
  color: var(--bs-gray-500);
}
</style>