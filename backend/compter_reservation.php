<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require 'session.php';  // contient session_set_cookie_params + session_start()
header('Content-Type: application/json');
require 'db.php';

$userId    = $_SESSION['user_id'] ?? null;
$sessionId = session_id();

try {
    // 1) Compter les réservations de cure pour cet utilisateur / session
    $sqlCure = "
      SELECT COUNT(*) AS count
      FROM reservation_cure
      WHERE statut = 'panier'
        AND (
          user_id    = :user_id
          OR session_id = :session_id
        )
    ";
    $stmtCure = $pdo->prepare($sqlCure);
    $stmtCure->execute([
      'user_id'    => $userId,
      'session_id' => $sessionId
    ]);
    $countCure = (int)$stmtCure->fetchColumn();

    // 2) Compter les réservations de chambre pour cet utilisateur / session
    $sqlChambre = "
      SELECT COUNT(*) AS count
      FROM reservation_chambre
      WHERE statut = 'panier'
        AND (
          user_id    = :user_id
          OR session_id = :session_id
        )
    ";
    $stmtChambre = $pdo->prepare($sqlChambre);
    $stmtChambre->execute([
      'user_id'    => $userId,
      'session_id' => $sessionId
    ]);
    $countChambre = (int)$stmtChambre->fetchColumn();

    // 3) Total
    $totalCount = $countCure + $countChambre;

    echo json_encode(['count' => $totalCount]);
} catch (PDOException $e) {
    // En cas d'erreur, renvoyer 0 et le message en log
    error_log('Erreur DB compter_reservation: ' . $e->getMessage());
    echo json_encode(['count' => 0]);
}
exit;
?>