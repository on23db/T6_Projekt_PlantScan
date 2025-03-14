<template>
    <div class="auth-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="email" v-model="email" placeholder="E-Mail" required />
            <input type="password" v-model="password" placeholder="Passwort" required />
            <button type="submit">Login</button>
        </form>
        <p>Noch kein Konto? <router-link to="/register">Registrieren</router-link></p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async login() {
            try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push("/home"); // Anpassung je nach Routing
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