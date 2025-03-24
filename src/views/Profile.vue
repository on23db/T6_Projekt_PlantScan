<template>
    <div class="profile-container">
      <h1>Willkommen, Pflanzenfreund!</h1>
      

        <!-- PlantList einfügen -->
      <PlantList :userId="userId" />

      <button @click="logout" class="btn btn-danger">Abmelden</button>
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from "firebase/auth";
  import PlantList from "@/views/PlantList.vue";

  export default {
    components: {
    PlantList
  },
    data() {
      return {
        userEmail: null,
        userId: null
      };
    },
    mounted() {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        this.userEmail = user.email; // Zeige die E-Mail des Benutzers an
        this.userId = user.uid; // Benutzer-ID speichern
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