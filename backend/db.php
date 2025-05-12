<?php
// Informations de connexion à PostgreSQL
$host = "localhost"; //caij57unh724n3.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com
$port = "5432"; // 5432
$dbname = "therapp_db"; //d2lig7gvottsrv
$user = "www-data"; //u7qu4e8bnifiv8
$password = "123";// p5f8e3b26e971cafcf5545b72f3cf7999cc3ce5f758968962ead104049fd90c84

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Connexion avec PDO
try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
