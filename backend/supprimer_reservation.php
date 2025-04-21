<?php
session_start();
require_once 'db.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['supprimer'], $_POST['id'])) {
        $id = intval($_POST['id']);
        $stmt = $pdo->prepare("DELETE FROM reservation WHERE id_reservation = ?");
        $success = $stmt->execute([$id]);
        echo json_encode(['success' => $success]);
        exit;
}
?>


