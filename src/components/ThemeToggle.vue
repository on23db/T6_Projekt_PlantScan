<template>
    <div class="theme-switch-wrapper">
      <input 
        type="checkbox" 
        id="themeSwitch" 
        class="theme-switch" 
        @change="toggleTheme" 
        :checked="theme === 'dark'" 
      />
      <label for="themeSwitch">
        <span class="switch-icon">
          {{ theme === 'dark' ? '🌙' : '☀️' }}
        </span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const theme = ref('light');
  
  // Beim Laden der Komponente prüfen, welcher Modus gespeichert ist
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    theme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', theme.value);
    document.documentElement.setAttribute('data-bs-theme', theme.value);
  });
  
  // Funktion zum Wechseln des Themes
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
    document.documentElement.setAttribute('data-bs-theme', theme.value);
    localStorage.setItem('theme', theme.value); // Speichern im localStorage
  };
  </script>
  
  <style scoped>
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
  