<?php

require 'session.php'; //ajout pour session

require_once 'db.php';
//require_once 'db_connexion.php';

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
