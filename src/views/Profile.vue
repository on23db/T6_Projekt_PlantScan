<template>
  <div class="profile-container container">
    <h1>Benutzerprofil</h1>

    <!-- Bootstrap Grid: Zwei Spalten -->
    <div class="row">
      <!-- Linke Spalte: Benutzerinformationen -->
      <div class="col-md-6">
        <p v-if="userEmail">Angemeldet als: <strong>{{ userEmail }}</strong></p>
        <ThemeToggle /> <!-- ThemeToggle Komponente -->
        <button @click="logout" class="btn btn-danger">Abmelden</button>
      </div>

      <!-- Rechte Spalte: Zuletzt gescannte Pflanzen -->
      <div class="col-md-6">
        <PlantHistory />
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import PlantHistory from "@/components/PlantHistory.vue"; 
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
  components: {
    PlantHistory,
    ThemeToggle
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
      this.$router.push("/splash");
    }
  },
  methods: {
    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Fehler beim Logout:", error);
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  padding: 30px;
}

button {
  margin-top: 20px;
}

h3 {
  margin-bottom: 15px;
}

.row {
  margin-top: 30px;
}

.col-md-6 {
  padding: 15px;
}
</style>
