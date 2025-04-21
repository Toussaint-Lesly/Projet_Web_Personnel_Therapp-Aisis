<?php
header('Content-Type: application/json');
require 'db.php';

try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM reservation");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['count' => $result['count']]);
} catch (PDOException $e) {
    echo json_encode(['count' => 0, 'error' => "Erreur DB : " . $e->getMessage()]);
}
