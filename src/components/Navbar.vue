<template>
  <nav class="navbar">
    <div class="container-lg d-flex justify-content-between align-items-center">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="/src/assets/Logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top me-2"
        />
        PlantScan
      </a>
      <div class="d-flex align-items-center">
        <div class="theme-switch-wrapper me-3">
          <input type="checkbox" id="themeSwitch" class="theme-switch" @change="emitToggleTheme" :checked="theme === 'dark'"/>
          <label for="themeSwitch">
            <span class="switch-icon">
              {{ theme === 'dark' ? '🌙' : '☀️' }}
            </span>
          </label>
        </div>
        <button class="btn btn-success" type="button">
          Anmelden
        </button>
        <button class="btn btn-outline-success" type="button">
          Registrieren
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>

const props = defineProps({
  theme: String,
});

const emit = defineEmits(['toggle-theme']);

const emitToggleTheme = () => {
  emit('toggle-theme');
};
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

.theme-switch + label {
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

.theme-switch + label .switch-icon {
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

/* Dunkler Modus */
.theme-switch:checked + label {
  background-color: var(--bs-gray-700);
}

.theme-switch:checked + label .switch-icon {
  transform: translateX(24px);
}
</style>
