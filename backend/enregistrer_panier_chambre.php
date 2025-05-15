<?php
require 'session.php';

header('Content-Type: application/json');

require_once 'db.php';
//require_once 'db_connexion.php';

// 2) Méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '❌ Méthode non autorisée.']);
    exit;
}

// 3) Lecture des champs
$type_chambre         = strip_tags($_POST['type_chambre']         ?? '');
$vue                  = strip_tags($_POST['vue']                  ?? '');
$prix_base            = floatval($_POST['prix_base']             ?? 0);
$statut               = $_POST['statut']                   ?? 'panier';
$supplement           = floatval($_POST['supplement']            ?? 0);
$id_hebergement       = intval($_POST['id_hebergement']          ?? 0);
$id_reservation_cure  = intval($_POST['id_reservation_cure']     ?? 0);
$id_vue_chambre       = intval($_POST['id_vue_chambre']          ?? 0);
$date_arrivee_raw     = $_POST['date_arrivee']                   ?? '';
$date_depart_raw      = $_POST['date_depart']                    ?? '';
$prix_total           = floatval($_POST['prix_total']            ?? 0);

// 4) Validation sommaire
if (!$id_hebergement || !$id_reservation_cure || !$type_chambre || $prix_base <= 0) {
    http_response_code(400);
    echo json_encode([
      'success' => false,
      'message' => '❌ Données manquantes ou invalides.'
    ]);
    exit;
}
// Validation date jj/mm/aaaa
function validerDate($d) {
    $dt = DateTime::createFromFormat('d/m/Y', $d);
    return $dt && $dt->format('d/m/Y') === $d;
}
if (!validerDate($date_arrivee_raw) || !validerDate($date_depart_raw)) {
    http_response_code(400);
    echo json_encode([
      'success' => false,
      'message' => '❌ Format de date invalide, utilisez jj/mm/aaaa.'
    ]);
    exit;
}
// Conversion en SQL (AAAA-MM-JJ)
$date_arrivee = DateTime::createFromFormat('d/m/Y', $date_arrivee_raw)
                     ->format('Y-m-d');
$date_depart  = DateTime::createFromFormat('d/m/Y', $date_depart_raw)
                     ->format('Y-m-d');

// 5) Détermination user_id vs session_id
$userId    = $_SESSION['user_id'] ?? null;
$sessionId = session_id();

// 6) INSERT
$sql = "
    INSERT INTO reservation_chambre (user_id, session_id, id_reservation_cure, id_hebergement, type_chambre,
                 prix_base, statut, id_vue_chambre, vue, supplement, date_arrivee, date_depart, prix_total)
    VALUES (:user_id, :session_id, :id_reservation_cure, :id_hebergement, :type_chambre, :prix_base, :statut,
            :id_vue_chambre, :vue, :supplement, :date_arrivee, :date_depart,:prix_total)
    ";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
      'user_id'              => $userId,
     /* 'session_id'           => $userId ? null : $sessionId,*/
      'session_id'           => $sessionId,
      'id_reservation_cure'  => $id_reservation_cure,
      'id_hebergement'       => $id_hebergement,
      'type_chambre'         => $type_chambre,
      'prix_base'            => $prix_base,
      'statut'               => $statut,
      'id_vue_chambre'       => $id_vue_chambre,
      'vue'                  => $vue,
      'supplement'           => $supplement,
      'date_arrivee'         => $date_arrivee,
      'date_depart'          => $date_depart,
      'prix_total'           => $prix_total
    ]);

    // 7) Réponse
    echo json_encode([
      'success'                   => true,
      'message'                   => '✅ Réservation de chambre enregistrée avec succès ! <a href="creer_panier.html">Voir le panier ?</a>',
      'id_reservation_chambre'    => $pdo->lastInsertId()
    ]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
      'success' => false,
      'message' => '❌ Erreur SQL (chambre) : ' . $e->getMessage()
    ]);
    exit;
}





