<template>
    <div class="kontakt-container">
        <!-- Mittig platzierte Überschrift -->
        <h1 class="kontakt-title">Kontakt</h1>

        <div class="kontakt-content">
            <div class="text-section">
                <p>Falls du Fragen oder Anregungen hast, kannst du uns gerne kontaktieren.</p>

                <h3>E-Mail</h3>
                <p>Du erreichst uns unter:
                    <a href="mailto:pau.neumann.23@lehre.mosbach.dhbw.de">pau.neumann.23@lehre.mosbach.dhbw.de</a>
                </p>

                <h3>Unser Team</h3>
                <ul>
                    <li>Paula Neumann</li>
                    <li>Denise Barg</li>
                    <li>Marie Arnold</li>
                    <li>Zoe Neuberger</li>
                </ul>
            </div>

            <!-- Rechter Bereich: Bild -->
            <div class="image-section">
                <img src="/src/assets/Pflanze.png" alt="Pflanzenbild" class="img-fluid" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.kontakt-container {
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: transparent;
    box-shadow: none;
    border-radius: 8px;
}

/* Mittig platzierte Überschrift */
.kontakt-title {
    text-align: center;
    color: #217735;
    margin-bottom: 2rem;
}

.kontakt-content {
    display: flex;
    justify-content: space-between;
    /* Platziert Text und Bild nebeneinander */
    flex-wrap: wrap;
    /* Erlaubt es den Inhalt, sich anzupassen, wenn der Bildschirm kleiner wird */
}

.text-section {
    width: 60%;
    /* Der Textbereich nimmt 60% des Containers ein */
    padding-right: 2rem;
    /* Etwas Abstand zwischen Text und Bild */
}

h2 {
    margin-top: 1.5rem;
    color: #333;
}

p {
    line-height: 1.6;
}

ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    background: #217735;
    color: white;
    padding: 5px 10px;
    margin: 5px 0;
    border-radius: 4px;
    width: 250px;
    text-align: left;
}

a {
    color: #217735;
    font-weight: bold;
    text-decoration: none;
}

a:hover {
    color: #1a5e2e;
    text-decoration: underline;
}

.image-section {
    width: 35%;
    /* Der Bildbereich nimmt 35% des Containers ein */
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-section img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
}

@media (max-width: 768px) {
    .kontakt-content {
        flex-direction: column;
        /* Auf kleinen Bildschirmen wird der Inhalt untereinander gestapelt */
        align-items: center;
    }

    .text-section {
        width: 100%;
        /* Auf kleinen Bildschirmen nimmt der Textbereich die volle Breite ein */
        padding-right: 0;
    }

    .image-section {
        width: 100%;
        /* Bild nimmt auch die volle Breite ein */
        margin-top: 1rem;
        /* Etwas Abstand zwischen Text und Bild */
    }
}
</style>
