<template>
  <div class="profile-container">
    <h1>Willkommen, Pflanzenfreund!</h1>
    
    <!-- Eingeloggter Benutzer -->
    <p v-if="userEmail">Angemeldet als: {{ userEmail }}</p>

    <!-- Zuletzt gescannte Pflanzen -->
    <PlantHistory />

    <button @click="logout" class="btn btn-danger">Abmelden</button>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import PlantHistory from "@/components/PlantHistory.vue"; 

export default {
  components: {
    PlantHistory
  },
  data() {
    return {
      userEmail: null
    };
  },
  mounted() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.userEmail = user.email;
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push("/login");
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
