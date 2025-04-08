<template>
    <nav class="bottom-nav">
      <router-link to="/dashboard" exact-active-class="active" class="nav-item">
        <img src="/src/assets/house-solid.svg" alt="Home" />
        <span>Home</span>
      </router-link>
      <router-link to="/camera" exact-active-class="active" class="nav-item">
        <img src="/src/assets/camera-solid.svg" alt="Kamera" />
        <span>Kamera</span>
      </router-link>
      <router-link to="/profile" exact-active-class="active" class="nav-item">
        <img src="/src/assets/circle-user-solid.svg" alt="Profil" />
        <span>Profil</span>
      </router-link>
    </nav>
  </template>
  
  <style scoped>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 0.5px solid var(--bs-border-color, #dee2e6); 
    z-index: 999;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    background-color: var(--bs-body-bg); 
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--bs-body-color); 
    font-size: 12px;
    gap: 4px;
    padding: 4px;
    transition: color 0.3s;
  }
  
  .nav-item img {
    width: 24px;
    height: 24px;
    filter: brightness(0) saturate(100%) invert(33%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(96%) contrast(90%);
  }
  
  .nav-item.active,
  .nav-item:hover {
    color: var(--bs-success); 
  }
  
  .nav-item.active img {
    filter: none; 
  }
  
  /* Mobile only */
  @media (max-width: 768px) {
    .bottom-nav {
      display: flex;
    }
  }
  </style>
  