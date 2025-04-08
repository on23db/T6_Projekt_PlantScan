<template>
  <div class="welcome-container">
    <div class="logo-section">
      <h1>PlantScan</h1>
      <img src="/src/assets/Monstera deliciosa.png" alt="Monstera" class="img-fluid logo-image">
    </div>
    <div class="auth-options">
      <div class="buttons">
        <button @click="goToLogin" class="btn btn-success">Login</button>
        <button @click="goToRegister" class="btn btn-outline-success">Registrieren</button>
        <p class="guest-link">
          <a @click="guestLogin" href="#">Als Gast fortfahren</a>
        </p>
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
      this.$router.push('/dashboard'); 
    }
  }
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 3rem;
  color: var(--text-color);
  font-weight: bold;
  margin-bottom: 15px;
}

.logo-image {
  width: 15em;
  height: auto;
}

.auth-options {
  max-width: 400px;
  width: 100%;
}

.buttons button {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.guest-link {
  text-align: center;
  font-size: 1rem;
  margin-top: 20px;
}

.guest-link span {
  display: block;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.guest-link a {
  color: var(--navbar-text);
  text-decoration: none;
}

.guest-link a:hover {
  text-decoration: underline;
}
</style>
