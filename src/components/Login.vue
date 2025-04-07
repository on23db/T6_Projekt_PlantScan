<template>
    <div class="auth-container">
      <h2 v-if="!user">Login</h2>
      <div v-else>
        <p>Willkommen, {{ user.email }}!</p>
        <button @click="logout">Logout</button>
      </div>
  
      <form v-if="!user" @submit.prevent="login">
        <input type="email" v-model="email" placeholder="E-Mail" required />
        <input type="password" v-model="password" placeholder="Passwort" required />
        <button type="submit">Login</button>
      </form>
  
      <p v-if="!user">Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
        user: null
      };
    },
    methods: {
      async login() {
        try {
          const auth = getAuth();
          await signInWithEmailAndPassword(auth, this.email, this.password);
          this.$router.push("/profile"); // Weiterleitung zur Profil-Seite
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      async logout() {
        try {
          const auth = getAuth();
          await signOut(auth);
          this.$router.push("/"); // Weiterleitung zur Startseite
        } catch (error) {
          this.errorMessage = error.message;
        }
      }
    },
    created() {
      // Überwache den Anmeldestatus, um den User zu laden
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          this.user = currentUser; // Setze den User, wenn er eingeloggt ist
        } else {
          this.user = null; // Setze den User auf null, wenn er ausgeloggt ist
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
  }
  
  button {
    padding: 10px;
    width: 100%;
    background: #217735;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background: #1a5a1a;
  }
  
  .error {
    color: red;
  }
  </style>
  