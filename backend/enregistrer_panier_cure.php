
<?php

require 'session.php';
error_log("POST reçu enregistrer_panier_cure: " . print_r($_POST, true));
header('Content-Type: application/json');

require 'db.php';

// 2) Lecture de la requête
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '❌ Méthode non autorisée.']);
    exit;
}

// 3) Préparation des données
$nom_sous_type  = strip_tags($_POST['nom_sous_type']  ?? '');
$prix           = floatval($_POST['prix']            ?? 0);
$id_cure        = intval($_POST['id_cure']           ?? 0);
$id_sous_type   = intval($_POST['id_sous_type']      ?? 0);
$statut         = $_POST['statut']                   ?? 'panier';
$prix_total     = floatval($_POST['prix_total']      ?? $prix);

// validation
if (!$id_cure || !$id_sous_type || !$nom_sous_type || $prix <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '❌ Données manquantes ou invalides.']);
    exit;
}

// 4) Détermination user_id vs session_id
$userId    = $_SESSION['user_id'] ?? null;
$sessionId = session_id();

// 5) Insert dans la table
$sql = "
    INSERT INTO reservation_cure (user_id, session_id, id_cure, id_sous_type, nom_sous_type, prix, statut, prix_total) 
    VALUES (:user_id, :session_id, :id_cure, :id_sous_type, :nom_sous_type, :prix, :statut, :prix_total)
    ";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
        'user_id'       => $userId,
        /*'session_id'    => $userId ? null : $sessionId,*/
        'session_id'    => $sessionId,
        'id_cure'       => $id_cure,
        'id_sous_type'  => $id_sous_type,
        'nom_sous_type' => $nom_sous_type,
        'prix'          => $prix,
        'statut'        => $statut,
        'prix_total'    => $prix_total
    ]);

     // Récupérer l'ID de la nouvelle réservation
    $id_reservation_cure = $pdo->lastInsertId();

    // Créer la réponse JSON
    echo json_encode([
      'success'               => true,
      'message'               => '✅ Réservation de cure enregistrée avec succès !',
      'id_reservation_cure'   => $id_reservation_cure
    ]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
      'success' => false,
      'message' => '❌ Erreur SQL : ' . $e->getMessage()
    ]);
    exit;
}
