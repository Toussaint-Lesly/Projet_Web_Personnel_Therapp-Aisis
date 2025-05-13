<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require 'session.php'; //ajout pour session

//require_once 'db.php';
require_once 'db_connexion.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id_sous_type'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

$idSousType = intval($data['id_sous_type']);
$userId = $_SESSION['user_id'] ?? null;

try {
    if ($userId) {
        $stmt = $pdo->prepare("DELETE FROM favoris WHERE user_id = :user_id AND id_sous_type= :id_sous_type");
        $stmt->execute([':user_id' => $userId, ':id_sous_type' => $idSousType]);
    } else {
        $stmt = $pdo->prepare("DELETE FROM favoris WHERE user_id IS NULL AND id_sous_type = :id_sous_type");
        $stmt->execute([':id_sous_type' => $idSousType]);
    }

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Aucun favori trouvé']);
        exit;
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
}
?>