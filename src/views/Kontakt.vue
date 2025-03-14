<template>
    <div class="kontakt-container">
        <h1>Kontakt</h1>

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
</template>

<style scoped>
.kontakt-container {
    max-width: 600px;
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
    padding: 8px;
    margin: 5px 0;
    border-radius: 4px;
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
</style>