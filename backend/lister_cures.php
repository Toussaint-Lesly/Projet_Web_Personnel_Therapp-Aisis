<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//require_once 'db.php';
require_once 'db_connexion.php';

// Réponse JSON
header('Content-Type: application/json');

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
