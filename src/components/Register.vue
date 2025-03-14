<template>
    <div class="auth-container">
        <h2>Registrieren</h2>
        <form @submit.prevent="register">
            <input type="email" v-model="email" placeholder="E-Mail" required />
            <input type="password" v-model="password" placeholder="Passwort" required />
            <button type="submit">Registrieren</button>
        </form>
        <p>Bereits ein Konto? <router-link to="/login">Login</router-link></p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js"; // Firebase korrekt importieren

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async register() {
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push("/home"); // Nach der Registrierung weiterleiten
            } catch (error) {
                this.errorMessage = error.message;
            }
        }
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

.error {
    color: red;
}
</style>