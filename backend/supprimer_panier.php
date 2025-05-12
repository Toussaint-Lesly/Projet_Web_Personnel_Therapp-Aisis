<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require 'header.php'
require 'session.php'; //ajout pour session
//session_start();
require_once 'db.php';

if (isset($_POST['supprimer'], $_POST['id'], $_POST['type'])) {
    $id = (int) $_POST['id'];
    $type = $_POST['type'];

    if ($type === 'cure') {
        $sql = "DELETE FROM reservation_cure WHERE id_reservation_cure = ?";
    } elseif ($type === 'chambre') {
        $sql = "DELETE FROM reservation_chambre WHERE id_reservation_chambre = ?";
    } else {
        echo json_encode(['success' => false]);
        exit;
    }

    $stmt = $pdo->prepare($sql);
    $success = $stmt->execute([$id]);

    echo json_encode(['success' => $success]);
}
?>
