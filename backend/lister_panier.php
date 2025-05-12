<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    require 'session.php';   // contient session_start()
    header('Content-Type: application/json');

    //require_once 'db.php';
    require_once 'db_connexion.php';

    // 1) Récupère les deux clés pour filtrer
    $userId    = $_SESSION['user_id'] ?? null;
    $sessionId = session_id();

    // 2) Réservations de cure (panier) pour user_id OU session_id
    $sqlCures = "
      SELECT rc.*, s.nom_sous_type, s.image 
      FROM reservation_cure rc
      LEFT JOIN sous_types s ON rc.id_sous_type = s.id_sous_type
      WHERE rc.statut = 'panier'
        AND (
          rc.user_id    = :user_id
          OR rc.session_id = :session_id
        )
    ";
    $stmtCures = $pdo->prepare($sqlCures);
    $stmtCures->execute([
      'user_id'    => $userId,
      'session_id' => $sessionId
    ]);
    $reservationsCure = $stmtCures->fetchAll(PDO::FETCH_ASSOC);

    // 3) Réservations de chambre (panier) pour user_id OU session_id
    $sqlChambres = "
      SELECT rh.*, h.type_chambre, h.image AS image_hebergement, v.vue
      FROM reservation_chambre rh
      LEFT JOIN hebergement   h ON rh.id_hebergement   = h.id_hebergement
      LEFT JOIN vue_chambre   v ON rh.id_vue_chambre   = v.id_vue_chambre
      WHERE rh.statut = 'panier'
        AND (
          rh.user_id    = :user_id
          OR rh.session_id = :session_id
        )
    ";
    $stmtChambres = $pdo->prepare($sqlChambres);
    $stmtChambres->execute([
      'user_id'    => $userId,
      'session_id' => $sessionId
    ]);
    $reservationsChambre = $stmtChambres->fetchAll(PDO::FETCH_ASSOC);

    // 4) Construction de la réponse
    $response = [
      'success' => true, //j'ai ajoute ca le 06 Mai pour tester recapitulatif
      'cures'    => $reservationsCure,
      'chambres' => $reservationsChambre
    ];

    echo json_encode($response);
    exit;
?>