<?php
require 'db.php'; // Connexion à la base de données

header('Content-Type: application/json');

// Récupération des cures avec leurs sous-types
$query = "SELECT c.id_cure, c.nom AS cure_nom, s.nom_sous_type, s.image, s.prix 
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
        'nom' => $cure['nom_sous_type'],
        'image' => $cure['image'],
        'prix' => $cure['prix'],
        'link' => "../backend/cures_details.php?id=" . $idCure
    ];
}

echo json_encode($curesOrganized);
exit;
?>
