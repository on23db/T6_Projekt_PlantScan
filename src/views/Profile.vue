<template>
    <div class="profile-container">
      <h1>Willkommen, Pflanzenfreund!</h1>
      <p>Hier siehst du deine gescannten Pflanzen:</p>
      <button @click="logout" class="btn btn-danger">Abmelden</button>
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";
  
  export default {
    data() {
      return {
        userEmail: null
      };
    },
    mounted() {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        this.userEmail = user.email; // Zeige die E-Mail des Benutzers an
      } else {
        this.$router.push("/login"); // Falls nicht eingeloggt, zurück zur Login-Seite
      }
    },
    methods: {
      async logout() {
        try {
          const auth = getAuth();
          await signOut(auth);
          this.$router.push("/login"); // Weiterleitung zur Login-Seite
        } catch (error) {
          console.error("Fehler beim Logout:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: auto;
    text-align: center;
    padding: 20px;
  }
  
  button {
    margin-top: 20px;
  }
  </style>