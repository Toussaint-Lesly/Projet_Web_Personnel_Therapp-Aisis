<?php
// Connexion à la base de données
require_once 'db.php';

// Vérifier si 'cure' est passé en paramètre GET
if (isset($_GET['cure'])) {
    $cure = $_GET['cure'];

    // Préparer la requête pour trouver la cure
    $stmt = $pdo->prepare("SELECT * FROM cures WHERE nom = :cure");
    $stmt->execute(['cure' => $cure]);

    // Vérifier si la cure existe
    if ($stmt->rowCount() > 0) {
        // Récupérer les données de la cure
        $cureData = $stmt->fetch(PDO::FETCH_ASSOC);

        // Récupérer les sous-types associés
        $stmtSousTypes = $pdo->prepare("SELECT * FROM sous_types WHERE id_cure = :id_cure");
        $stmtSousTypes->execute(['id_cure' => $cureData['id_cure']]);
        $sousTypes = $stmtSousTypes->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les données en JSON
        echo json_encode(['sous_types' => $sousTypes]);
    } else {
        echo json_encode(['error' => 'Cure non trouvée']);
    }
} else {
    echo json_encode(['error' => 'Aucune cure fournie']);
}
?>
