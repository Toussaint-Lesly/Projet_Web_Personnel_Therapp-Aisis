<?php

require 'session.php'; //ajout pour session
header('Content-Type: application/json');
session_start(); // Nécessaire pour accéder à $_SESSION

require_once 'db.php';
//require_once 'db_connexion.php';

// Vérifier si 'id_cure' est passé en paramètre GET
if (isset($_GET['id_cure'])) {
    $id_cure = intval($_GET['id_cure']);

    // Vérifier si la cure existe
    $stmt = $pdo->prepare("SELECT * FROM cures WHERE id_cure = :id_cure");
    $stmt->execute(['id_cure' => $id_cure]);

    if ($stmt->rowCount() > 0) {
        // Récupérer les sous-types associés à cette cure
        $stmtSousTypes = $pdo->prepare("SELECT * FROM sous_types WHERE id_cure = :id_cure");
        $stmtSousTypes->execute(['id_cure' => $id_cure]);
        $sousTypes = $stmtSousTypes->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les données en JSON
        echo json_encode(['sous_types' => $sousTypes]);
    } else {
        echo json_encode(['error' => 'Cure non trouvée']);
    }
} else {
    echo json_encode(['error' => 'Aucun id_cure fourni']);
}
exit;
?>
