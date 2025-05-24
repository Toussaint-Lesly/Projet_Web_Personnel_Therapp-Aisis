<?php

require 'session.php';
header('Content-Type: application/json');

//require_once 'db.php';
require_once 'db_connexion.php';

require_once __DIR__ . '/mailToUser.php';

if (!function_exists('envoyerMailConfirmation')) {
    die(json_encode(['success' => false, 'message' => 'Erreur critique : fonction envoyerMailConfirmation() non trouvée.']));
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$champs = ['prenom', 'nom', 'telephone', 'email', 'adresse_postale', 'ville', 'code_postal'];
$champs_vides = array_filter($champs, fn($champ) => empty($_POST[$champ]));

if (!empty($champs_vides)) {
  echo json_encode([
    'success' => false,
    'message' => 'Champs manquants : ' . implode(', ', $champs_vides)
  ]);
  exit;
}

$prenom = htmlspecialchars($_POST['prenom']);
$nom = htmlspecialchars($_POST['nom']);
$telephone = htmlspecialchars($_POST['telephone']);
$email = htmlspecialchars($_POST['email']);
$adresse = htmlspecialchars($_POST['adresse_postale']);
$ville = htmlspecialchars($_POST['ville']);
$code_postal = htmlspecialchars($_POST['code_postal']);

$user_id = $_SESSION['user_id'] ?? null;
$session_id = session_id();

try {
  // 1. Paiement
  $stmt = $pdo->prepare("INSERT INTO paiements (user_id, session_id, prenom, nom, telephone, email, adresse_postale, ville, code_postal)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->execute([$user_id, $session_id, $prenom, $nom, $telephone, $email, $adresse, $ville, $code_postal]);

  // 2. Commandes - cures
  $stmtCures = $pdo->prepare("SELECT * FROM reservation_cure WHERE session_id = ? AND statut = 'panier'");
  $stmtCures->execute([$session_id]);
  $cures = $stmtCures->fetchAll(PDO::FETCH_ASSOC);
  if (empty($cures)) {
    throw new Exception("Aucune cure trouvée dans le panier !");
  }

  foreach ($cures as $cure) {
    $stmt = $pdo->prepare("INSERT INTO commandes (user_id, session_id, type, prix)
                           VALUES (?, ?, 'cure', ?)");
    $stmt->execute([$user_id, $session_id, $cure['prix']]);

    $stmtDetails = $pdo->prepare("INSERT INTO commandes_details (user_id, session_id, type, details)
                                  VALUES (?, ?, 'cure', ?)");
    $stmtDetails->execute([
      $user_id,
      $session_id,
      json_encode($cure)
    ]);
  }

  // 3. Commandes - chambres
  $stmtChambres = $pdo->prepare("SELECT * FROM reservation_chambre WHERE session_id = ? AND statut = 'panier'");
  $stmtChambres->execute([$session_id]);
  $chambres = $stmtChambres->fetchAll(PDO::FETCH_ASSOC);

  foreach ($chambres as $chambre) {
    $stmt = $pdo->prepare("INSERT INTO commandes (user_id, session_id, type, prix)
                           VALUES (?, ?, 'chambre', ?)");
    $stmt->execute([$user_id, $session_id, $chambre['prix_total']]);

    $stmtDetails = $pdo->prepare("INSERT INTO commandes_details (user_id, session_id, type, details)
                                  VALUES (?, ?, 'chambre', ?)");
    $stmtDetails->execute([
      $user_id,
      $session_id,
      json_encode($chambre)
    ]);
  }

  // 4. Suppression du panier
  $pdo->prepare("DELETE FROM reservation_cure WHERE session_id = ? AND statut = 'panier'")->execute([$session_id]);
  $pdo->prepare("DELETE FROM reservation_chambre WHERE session_id = ? AND statut = 'panier'")->execute([$session_id]);

  // 5. Envoi mail de confirmation
  if (envoyerMailConfirmation($email, $prenom, $nom, $cures, $chambres)) {
    echo json_encode(['success' => true, 'redirect' => 'commandes.html']);
  } else {
    echo json_encode(['success' => false, 'message' => 'Email non envoyé.']);
  }

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Erreur : ' . $e->getMessage()
  ]);
}
?>