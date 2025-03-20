<template>
    <div class="logout-container">
      <h2>Logout</h2>
      <p>Möchtest du dich wirklich abmelden?</p>
      <button @click="logout">Abmelden</button>
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";
  
  export default {
    methods: {
      async logout() {
        try {
          const auth = getAuth();
          await signOut(auth);
          this.$router.push("/login"); // Weiterleitung zur Login-Seite
          alert("Du wurdest erfolgreich abgemeldet.");
        } catch (error) {
          console.error("Logout-Fehler:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .logout-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #217735;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1a5a2b;
  }
  </style>