<template>
    <div class="save-plant-container">
      <h1>Pflanze speichern</h1>
      <form @submit.prevent="savePlant">
        <div class="form-group">
          <label for="plant-name">Pflanzenname:</label>
          <input
            id="plant-name"
            type="text"
            v-model="plantName"
            placeholder="Name der Pflanze"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="scientific-name">Wissenschaftlicher Name:</label>
          <input
            id="scientific-name"
            type="text"
            v-model="scientificName"
            placeholder="Wissenschaftlicher Name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="plant-image">Bild der Pflanze:</label>
          <input
            id="plant-image"
            type="file"
            @change="onFileSelected"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-success">Speichern</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { getAuth } from "firebase/auth";
  import { savePlantToFirestore } from "@/firebase"; // Diese Funktion wird in deiner firebase.js definiert
  import { uploadImageToStorage } from "@/firebase"; // Funktion für Bild-Upload
  
  export default {
    setup() {
      const plantName = ref("");
      const scientificName = ref("");
      const selectedFile = ref(null);
  
      const onFileSelected = (event) => {
        selectedFile.value = event.target.files[0];
      };
  
      const savePlant = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          alert("Bitte melden Sie sich zuerst an.");
          return;
        }
  
        try {
          // Bild hochladen und URL erhalten
          const imageUrl = await uploadImageToStorage(selectedFile.value, user.uid);
  
          // Pflanzendaten in Firestore speichern
          await savePlantToFirestore(user.uid, {
            name: plantName.value,
            scientificName: scientificName.value,
            imageUrl,
          });
  
          alert("Pflanze erfolgreich gespeichert!");
          plantName.value = "";
          scientificName.value = "";
          selectedFile.value = null;
        } catch (error) {
          console.error("Fehler beim Speichern der Pflanze:", error);
          alert("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
        }
      };
  
      return { plantName, scientificName, selectedFile, onFileSelected, savePlant };
    },
  };
  </script>
  
  <style scoped>
  .save-plant-container {
    max-width: 600px;
    margin: auto;
    text-align: center;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .btn {
    margin-top: 10px;
  }
  </style>