<template>
    <div class="hilfe-container">
        <h1>Hilfe & Unterstützung</h1>

        <p>Willkommen auf der Hilfeseite von <strong>PlantScan</strong>. Hier findest du Antworten auf häufig gestellte
            Fragen und Tipps zur Nutzung unserer Website.</p>

        <h3>Häufig gestellte Fragen (FAQ)</h3>

        <div class="faq">
            <h5>1. Wie funktioniert die Pflanzenerkennung?</h5>
            <p>Nutze die Kamera-Funktion, um ein Bild einer Pflanze hochzuladen. Unser System analysiert das Bild und
                zeigt dir Informationen zur Pflanze an.</p>

            <h5>2. Ich kann mich nicht einloggen – was kann ich tun?</h5>
            <p>Überprüfe, ob deine E-Mail-Adresse und dein Passwort korrekt sind. Falls du dein Passwort vergessen hast,
                kannst du es zurücksetzen. Nehme gerne Kontakt mit unserem Support auf.</p>

            <h5>3. Wie kann ich den Support kontaktieren?</h5>
            <p>Schreib uns eine E-Mail an <a
                    href="mailto:[pau.neumann.23@lehre.mosbach.dhbw.de]">pau.neumann.23@lehre.mosbach.dhbw.de</a>. Wir
                versuchen, so schnell wie
                möglich zu antworten.</p>
        </div>

        <h3>Weitere Unterstützung</h3>
        <p>Falls du weitere Fragen hast, kannst du uns über unsere <router-link to="/kontakt">Kontaktseite</router-link>
            erreichen.</p>
    </div>
</template>

<style scoped>
a {
    color: #217735;
    text-decoration: none;
}

a:hover {
    color: #1a5e2e;
}

.hilfe-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #217735;
}

h2 {
    margin-top: 1.5rem;
    color: #333;
}

.faq h {
    margin-top: 1rem;
    color: #217735;
}

p {
    line-height: 1.6;
}
</style>