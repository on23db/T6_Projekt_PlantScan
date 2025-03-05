<template>
    <footer class="footer">
      <div class="footer-links">
        <a href="#">Über uns</a>
        <a href="#">Impressum</a>
        <a href="#">Datenschutz</a>
        <a href="#">Hilfe</a>
        <a href="#">Kontakt</a>
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
    color: var(--bs-gray-600);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .footer-links a:hover {
    color: var(--bs-gray-900);
  }
  
  .footer-copy {
    color: var(--bs-gray-500);
  }
  </style>
  