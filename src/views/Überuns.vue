<template>
    <div class="ueber-uns-container">
        <h1>Über Uns</h1>

        <p><strong>PlantScan</strong> ist ein Projekt im Rahmen unseres <strong>Onlinemedien-Studiums</strong> an der
            DHBW Mosbach. Unser Ziel ist es, eine progressive Web-App (PWA) zu entwickeln, die Pflanzen erkennt und den
            Nutzern hilfreiche Informationen dazu bereitstellt.</p>

        <h3>🌱 Unser Projekt</h3>
        <p>Die Idee hinter PlantScan ist es, eine einfache Möglichkeit zu bieten, Pflanzen zu identifizieren und mehr
            über ihre Eigenschaften und Pflege zu erfahren. Dabei setzen wir moderne Web-Technologien ein und achten
            besonders auf eine intuitive Benutzeroberfläche.</p>

        <h3>👩‍💻 Unser Team</h3>
        <p>Wir sind vier Studentinnen im <strong>4. Semester</strong> des Studiengangs Onlinemedien und arbeiten
            gemeinsam an der
            Umsetzung dieser Anwendung:</p>
        <ul>
            <li>Paula Neumann</li>
            <li>Denise Barg</li>
            <li>Marie Arnold</li>
            <li>Zoe Neuberger</li>
        </ul>

        <h3>🔧 Unsere Technologien</h3>
        <p>Für die Entwicklung nutzen wir unter anderem:</p>
        <ul>
            <li><strong>Vue.js</strong> für das Frontend</li>
            <li><strong>Firebase</strong> für Authentifizierung und Datenbank</li>
            <li><strong>PWA-Technologien</strong> für Offline-Funktionalität</li>
        </ul>

        <h3>📩 Kontakt</h3>
        <p>Falls du Fragen hast oder mit uns in Kontakt treten möchtest, schreibe uns gerne an:
            <a href="mailto:pau.neumann.23@lehre.mosbach.dhbw.de">pau.neumann.23@lehre.mosbach.dhbw.de</a>
        </p>
    </div>
</template>

<style scoped>
.ueber-uns-container {
    width: 100%;
    max-width: 1200px;
    /* Maximale Breite für größere Bildschirme */
    margin: 2rem auto;
    padding: 2rem;
    background: transparent;
    box-shadow: none;
    border-radius: 8px;
}

/* Mittig platzierte Überschrift */
h1 {
    text-align: center;
    color: #217735;
    margin-bottom: 2rem;
}

h2 {
    margin-top: 1.5rem;
    color: #333;
}

p {
    line-height: 1.6;
}

ul {
    list-style-type: disc;
    margin-left: 20px;
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

@media (max-width: 768px) {
    .ueber-uns-container {
        width: 100%;
        padding-left: 15px;
        /* Mehr Abstand für kleine Bildschirme */
        padding-right: 15px;
    }
}
</style>
