const { Client } = require('pg');

const client = new Client({
    user: 'postgres', // Mets ton utilisateur PostgreSQL
    host: 'localhost',
    database: 'therapp_db', 
    password: '123', 
    port: 5432, // Port PostgreSQL par défaut
});

client.connect()
    .then(() => console.log('Connexion réussie à PostgreSQL !'))
    .catch(err => console.error('Erreur de connexion :', err));

module.exports = client;
