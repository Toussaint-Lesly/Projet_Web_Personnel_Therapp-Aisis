
/*
const client = require('./db'); // Import du client PostgreSQL

async function testQuery() {
    try {
        const result = await client.query('SELECT * FROM utilisateur LIMIT 5'); // Exécuter une requête test
        console.log(" Données trouvées :", result.rows);
    } catch (err) {
        console.error("Erreur :", err);
    } finally {
        client.end(); // Ferme la connexion après la requête
    }
}

// Lancer la fonction de test
testQuery();

*/


const client = require('./db'); // Import de la connexion PostgreSQL
//const client = require('./queries'); // Import de la connexion PostgreSQL

async function runQueries() {
    try {
         // Recupperer les enregistrements des tables
        const users = await client.query('SELECT * FROM utilisateur');
        console.log("Utilisateurs :", users.rows);

        const prestations = await client.query('SELECT * FROM prestations');
        console.log("Prestations :", prestations.rows);

        const reservations = await client.query('SELECT * FROM reservation_cure');
        console.log("Réservations de cures :", reservations.rows);

        const reservations_hebergement = await client.query('SELECT * FROM reservation_hebergement');
        console.log("Réservations d'hébergement :", reservations_hebergement.rows);

        const soins = await client.query('SELECT * FROM soins');
        console.log("Soins :", soins.rows);

        const contient_soins = await client.query('SELECT * FROM contient_soins');
        console.log("Contient_soins :", contient_soins.rows);

        const etapes = await client.query('SELECT * FROM etapes');
        console.log("Soins :", etapes.rows);

        const contient_etapes = await client.query('SELECT * FROM contient_etapes');
        console.log("Contient_etapes :", contient_etapes.rows);
         
        const tarif_hebergements = await client.query('SELECT * FROM tarif_hebergements');
        console.log("Tarif_hebergements :", tarif_hebergements.rows);

        const tarif_prestations = await client.query('SELECT * FROM tarif_prestations');
        console.log("Tarif_prestations :", tarif_prestations.rows);
        
        const saisons = await client.query('SELECT * FROM saisons');
        console.log("Saisons :", saisons.rows);
 
        const type_chambre = await client.query('SELECT * FROM type_chambre');
        console.log("Type_chambre :", type_chambre.rows);
         

    } catch (err) {
        console.error("Erreur lors des requêtes :", err);
    } finally {
        client.end(); // Ferme la connexion après l'exécution des requêtes
    }
}

// Lancer la fonction
runQueries();

