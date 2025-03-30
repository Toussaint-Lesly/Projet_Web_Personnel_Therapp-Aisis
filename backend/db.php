<?php
// Informations de connexion à PostgreSQL
$host = "localhost";  // Adresse du serveur PostgreSQL (généralement localhost)
$port = "5432";  // Port PostgreSQL par défaut
$dbname = "therapp_db";  // Nom de ta base de données
$username = "postgres";  // Nom d'utilisateur PostgreSQL (souvent "postgres" par défaut)
$password = "123";  // Ton mot de passe PostgreSQL

// Connexion avec PDO
try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
                     