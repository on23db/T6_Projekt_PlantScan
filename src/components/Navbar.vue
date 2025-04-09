<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-lg d-flex justify-content-between align-items-center">
      <router-link
        :to="isLoggedIn ? '/dashboard' : '/home'"
        class="navbar-brand d-flex align-items-center"
      >
        <img src="/src/assets/Logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top me-2" />
        PlantScan
      </router-link>

      <!-- Burger-Menü-Button für Mobile nur bei größeren Bildschirmen anzeigen -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" v-if="!isMobile">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav" v-if="!isMobile">
        <div class="d-flex flex-column flex-lg-row align-items-center">
          <!-- ThemeToggle Komponente nur anzeigen, wenn der User nicht eingeloggt ist -->
          <ThemeToggle v-if="!isLoggedIn" />

          <div class="d-flex flex-column flex-md-row gap-2 mt-2 mt-lg-0">
            <!-- Login und Register Buttons nur anzeigen, wenn der User nicht eingeloggt ist -->
            <router-link v-if="!isLoggedIn" to="/login">
              <button class="btn btn-success" type="button">
                Login
              </button>
            </router-link>
            <router-link v-if="!isLoggedIn" to="/register">
              <button class="btn btn-outline-success" type="button">
                Registrieren
              </button>
            </router-link>

            <!-- Nur sichtbar wenn der User eingeloggt ist -->
            <router-link v-if="isLoggedIn" to="/dashboard">
              <button class="btn btn-success" type="button">
                Dashboard
              </button>
            </router-link>
            <router-link v-if="isLoggedIn" to="/profile">
              <button class="btn btn-outline-success" type="button">
                Profil
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ThemeToggle from './ThemeToggle.vue';

const auth = getAuth();
const isLoggedIn = ref(false);
const isMobile = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });

  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
});
</script>

<style scoped>
nav {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  outline: 0.5px solid rgb(26, 26, 26);
  padding: 0.5rem 1rem;
  background-color: var(--navbar-bg);
}

button {
  margin-left: 0.5rem;
}

.navbar-brand {
  color: var(--navbar-text);
  font-weight: bold;
  text-decoration: none;
}

.theme-switch-wrapper {
  position: relative;
}

.theme-switch {
  display: none;
}

.theme-switch+label {
  display: flex;
  align-items: center;
  width: 50px;
  height: 26px;
  background-color: var(--bs-gray-300);
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-switch+label .switch-icon {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s ease;
}

.theme-switch:checked+label {
  background-color: var(--bs-gray-700);
}

.theme-switch:checked+label .switch-icon {
  transform: translateX(24px);
}
</style>
