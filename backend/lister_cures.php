<?php
require 'session.php';
header('Content-Type: application/json');

//require_once 'db.php';
require_once 'db_connexion.php';

if (isset($_GET['id_cure'])) {
    $idCure = $_GET['id_cure'];

    $query = "SELECT * FROM cures WHERE id_cure = :idCure";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['idCure' => $idCure]);
    $cure = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($cure) {
        echo json_encode([
            'success' => true,
            'cure' => $cure
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Cure non trouvée.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'ID de cure manquant.'
    ]);
}
?>
