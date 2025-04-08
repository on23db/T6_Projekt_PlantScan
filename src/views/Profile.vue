<template>
  <div class="profile-container container">
    <h1>Benutzerprofil</h1>

    <!-- Bootstrap Grid: Zwei Spalten -->
    <div class="row">
      <!-- Linke Spalte: Benutzerinformationen und ThemeToggle -->
      <div class="col-md-6">
        <div class="profile-box">
          <h3>Informationen</h3>
          <p v-if="userEmail">Angemeldet als: <strong>{{ userEmail }}</strong></p>
          
          <div class="theme-toggle-container d-flex align-items-center">
            <p class="mb-0 me-2">Theme ändern:</p>
            <ThemeToggle />
          </div>
          
          <div class="logout-button-container">
            <button @click="logout" class="btn btn-danger">Abmelden</button>
          </div>
        </div>
      </div>

      <!-- Rechte Spalte: Hier könnten weitere Infos oder Pflanzen-Historie rein -->
      <div class="col-md-6">
        <div class="profile-box">
          <PlantHistory /> <!-- Wenn du die PlantHistory hier noch haben möchtest -->
        </div>
      </div>
    </div>

    <!-- Legal Links nur auf mobilen Geräten anzeigen -->
    <div v-if="isMobile" class="legal-links">
      <ul>
        <li><router-link to="/überuns">Über uns</router-link></li>
        <li><router-link to="/impressum">Impressum</router-link></li>
        <li><router-link to="/datenschutz">Datenschutz</router-link></li>
        <li><router-link to="/hilfe">Hilfe</router-link></li>
        <li><router-link to="/kontakt">Kontakt</router-link></li>
      </ul>
      <p>© 2025 PlantScan</p>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import ThemeToggle from "@/components/ThemeToggle.vue";
import PlantHistory from "@/components/PlantHistory.vue"; 

export default {
  components: {
    ThemeToggle,
    PlantHistory
  },
  data() {
    return {
      userEmail: null,
      isMobile: false // Flag für mobile Ansicht
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

    this.checkIfMobile(); // Überprüfe bei der Initialisierung die Bildschirmgröße
    window.addEventListener('resize', this.checkIfMobile); // Event Listener für Fenstergrößenänderung
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIfMobile); // Entferne den Event Listener
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
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768; // Setze isMobile auf true bei einer Breite von <= 768px
    }
  }
};
</script>

<style scoped>
.profile-container {
  padding: 30px;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--bs-body-color);
}

.row {
  margin-top: 30px;
}

.col-md-6 {
  padding: 15px;
}

.profile-box {
  background-color: var(--bs-card-bg); /* Hintergrundfarbe der Box */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

/* Titel der Sektionen innerhalb der Box */
.profile-box h3 {
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: var(--bs-body-color);
}

/* Styling für den ThemeToggle-Bereich */
.theme-toggle-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.theme-toggle-container p {
  margin-bottom: 0;
}

.theme-toggle-container .form-check {
  margin-left: 10px;
}

/* Styling für den Logout-Button */
.logout-button-container {
  margin-top: 20px;
}

/* Legal Links nur auf mobilen Geräten anzeigen */
.legal-links {
  padding: 10px;
  text-align: center;
}

.legal-links ul {
  list-style: none;
  padding: 0;
}

.legal-links ul li {
  margin-bottom: 10px;
}

.legal-links ul li a {
  text-decoration: none;
  color: var(--bs-body-color);
}

.legal-links p {
  margin-top: 10px;
  color: var(--bs-body-color);
}

/* Dark Mode Anpassungen */
:root {
  color-scheme: light dark;
}

/* Auf mobilem Gerät */
@media (max-width: 768px) {
  .legal-links {
    font-size: 0.875rem; /* Kleinere Schrift auf mobilen Geräten */
  }

  /* Verkleinerte Boxen auf mobilen Geräten */
  .profile-box {
    padding: 15px;
  }

  .logout-button-container button {
    width: 100%; /* Vollständige Breite für den Logout-Button */
  }
}
</style>
