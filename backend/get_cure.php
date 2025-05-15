<?php
require 'session.php';
header('Content-Type: application/json');

require_once 'db.php';
//require_once 'db_connexion.php';

// Récupération des cures avec leurs sous-types
$query = "SELECT c.id_cure, c.nom AS cure_nom, s.id_sous_type, s.nom_sous_type, s.image, s.prix 
          FROM cures c
          JOIN sous_types s ON c.id_cure = s.id_cure";
$stmt = $pdo->prepare($query);
$stmt->execute();
$cures = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Organisation des cures sous forme de tableau associatif
$curesOrganized = [];
foreach ($cures as $cure) {
    $idCure = $cure['id_cure'];
    if (!isset($curesOrganized[$idCure])) {
        $curesOrganized[$idCure] = [
            'nom' => $cure['cure_nom'],
            'options' => []
        ];
    }
    $curesOrganized[$idCure]['options'][] = [
        'id_cure' => $cure['id_cure'],
        'id_sous_type' => $cure['id_sous_type'],
        'nom' => $cure['nom_sous_type'], 
        'nom_sous_type' => $cure['nom_sous_type'],         
        'image' => $cure['image'],
        'prix' => $cure['prix'],
        'link' => "../backend/get_cure_details.php?id=" . $idCure
    ];
}

echo json_encode($curesOrganized);
exit;
?>
