<template>
    <div class="welcome-container">
      <div class="logo-section">
        <img src="/src/assets/logo.png" alt="App Logo" class="logo" />
      </div>
      <div class="auth-options">
        <h2>Willkommen in der Pflanzenwelt!</h2>
        <p>Erkenne Pflanzen und entdecke die Natur mit Leichtigkeit.</p>
        <div class="buttons">
          <button @click="goToLogin" class="btn btn-primary">Login</button>
          <button @click="goToRegister" class="btn btn-secondary">Registrieren</button>
          <button @click="guestLogin" class="btn btn-tertiary">Als Gast fortfahren</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToLogin() {
        this.$router.push('/login');
      },
      goToRegister() {
        this.$router.push('/register');
      },
      guestLogin() {
        this.$router.push('/home'); // Direkt zur Home-Seite, ohne Anmeldung
      }
    }
  };
  </script>
  
  <style scoped>
  .welcome-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 100vh;
  }
  
  .logo-section {
    margin-bottom: 2rem;
  }
  
  .logo {
    width: 150px;
    height: auto;
  }
  
  .auth-options {
    max-width: 400px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .buttons button {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 12px;
  }
  
  .btn-primary {
    background-color: #217735;
    color: white;
  }
  
  .btn-secondary {
    background-color: #e49e13;
    color: white;
  }
  
  .btn-tertiary {
    background-color: #ccc;
    color: black;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  </style>
  