<?php
require 'session.php';
header('Content-Type: application/json');

require_once 'db.php';
//require_once 'db_connexion.php';

// 1. Récupérer les hébergements
$query = "SELECT * FROM hebergement";
$stmt = $pdo->prepare($query);
$stmt->execute();
$hebergements = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 2. Structurer les hébergements
$hebergementsOrganized = [];
foreach ($hebergements as $hebergement) {
    $id = $hebergement['id_hebergement'];
    $hebergementsOrganized[$id] = [
        'type' => $hebergement['type_chambre'],
        'imageH' => $hebergement['image'],
        'prixH' => $hebergement['prix_base'],
        'vues' => [] // on va y ajouter ensuite
    ];
}

// 3. Récupérer les vues
$queryVue = "SELECT * FROM vue_chambre 
             WHERE vue IN ('Vue sur plage', 'Vue sur piscine', 'Vue sur jardin', 'Vue sur parc')";
$stmtVue = $pdo->prepare($queryVue);
$stmtVue->execute();
$vues = $stmtVue->fetchAll(PDO::FETCH_ASSOC);

// 4. Joindre les vues dans une liste globale (tu peux aussi les lier à chaque hébergement si besoin)
$response = [
    "hebergements" => array_values($hebergementsOrganized),
    "vues" => $vues
];

echo json_encode($response);
exit;
?>