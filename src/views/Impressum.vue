<template>
    <div class="impressum-container">
        <h1>Impressum</h1>

        <h6>Diese Website ist ein Projekt im Rahmen des Studiengangs <strong>Onlinemedien</strong> an der <strong>DHBW
                Mosbach</strong>.</h6>

        <h3>Angaben gemäß § 5 TMG:</h3>
        <p>
            PlantScan – Ein nicht-kommerzielles Hochschulprojekt<br>
            Duale Hochschule Baden-Württemberg Mosbach<br>
            Lohrtalweg 10<br>
            74821 Mosbach<br>
            Deutschland
        </p>

        <h3>Vertreten durch:</h3>
        <p>
            Paula Neumann<br>
            Denise Barg <br>
            Marie Arnold<br>
            Zoe Neuberger<br>
            <br>
            Studierende des Studiengangs Onlinemedien
        </p>

        <h3>Kontakt:</h3>
        <p>E-Mail: <a href="mailto:[pau.neumann.23@lehre.mosbach.dhbw.de]">pau.neumann.23@lehre.mosbach.dhbw.de</a></p>

        <h3>Haftungsausschluss:</h3>
        <p>Dies ist ein studentisches Projekt ohne kommerziellen Hintergrund. Die Inhalte dienen rein zu Forschungs- und
            Lernzwecken.
            Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen übernehmen wir keine
            Gewähr.</p>

        <h3>Urheberrecht:</h3>
        <p>Die durch die Studierenden erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen
            Urheberrecht.
            Beiträge Dritter sind als solche gekennzeichnet.</p>

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

.impressum-container {
    width: 100%;
    max-width: 1200px;
    /* Maximale Breite für größere Bildschirme */
    margin: 2rem auto;
    padding: 2rem;
    background: transparent;
    border-radius: 8px;
}

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

@media (max-width: 768px) {
    .impressum-container {
        width: 100%;
        padding-left: 15px;
        /* Mehr Abstand für kleine Bildschirme */
        padding-right: 15px;
    }
}
</style>
