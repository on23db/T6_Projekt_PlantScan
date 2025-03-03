<template>
  <nav class="navbar">
    <div class="container-lg">
      <a class="navbar-brand" href="#">
      <img src="/src/assets/Logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
      PlantScan
    </a>
      <form class="d-flex">
        <button class="btn btn-outline-success me-2" type="button">Anmelden</button>
        <button class="btn btn-outline-success" type="button">Registrieren</button>
      </form>
    </div>
</nav>
</template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
<style scoped>
nav {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}


</style>
  