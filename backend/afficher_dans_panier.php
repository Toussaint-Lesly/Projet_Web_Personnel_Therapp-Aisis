<?php
session_start();
require_once 'db.php';

// Récupérer les réservations en cours (statut = 'panier')
$sql = "SELECT r.*, s.nom_sous_type, s.image 
        FROM reservation r 
        LEFT JOIN sous_types s ON r.id_sous_type = s.id_sous_type
        WHERE r.statut = 'panier'";
$stmt = $pdo->query($sql);
$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ✅ On définit le nombre d'articles et le prix total
$totalArticles = count($reservations);
$totalPrix = array_sum(array_column($reservations, 'prix_total'));

// Renvoi des données sous format JSON
echo json_encode($reservations);
?>

