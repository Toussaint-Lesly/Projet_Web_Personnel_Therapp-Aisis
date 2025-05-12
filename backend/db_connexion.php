<?php
// Activer les erreurs PHP pour le debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Récupération de l'URL de la base de données depuis Heroku
$url = getenv('DATABASE_URL');

if (!$url) {
    die("Erreur : la variable d'environnement DATABASE_URL n'est pas définie.");
}

// Parsing de l'URL pour extraire les infos de connexion
$opts = parse_url($url);

$host = $opts['host'];
$port = $opts['port'];
$user = $opts['user'];
$password = $opts['pass'];
$dbname = ltrim($opts['path'], '/');

try {
    // Connexion à PostgreSQL avec PDO
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>
