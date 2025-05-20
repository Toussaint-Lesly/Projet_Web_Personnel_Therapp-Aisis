<?php
require 'session.php';

header('Content-Type: application/json');

//require_once 'db.php';
require_once 'db_connexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $nom_sous_type = strip_tags($data['nom_sous_type'] ?? '');
    $prix = floatval($data['prix'] ?? 0);
    $id_cure = intval($data['id_cure'] ?? 0);
    $id_sous_type = intval($data['id_sous_type'] ?? 0);
    $prix_total = $prix;

    // Vérification des champs requis
    if (!$id_cure || !$id_sous_type || !$nom_sous_type || $prix <= 0) {
        echo json_encode([
            'success' => false,
            'message' => '❌ Données manquantes ou invalides.'
        ]);
        exit;
    }

    // Vérifier si l'utilisateur est connecté
    $user_id = $_SESSION['user_id'] ?? null;
    $session_id = session_id(); // récupère automatiquement le session_id

    if ($user_id) {
        $sql = "INSERT INTO favoris (
            user_id, session_id, id_cure, id_sous_type, nom_sous_type, prix, prix_total
        ) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $params = [$user_id, $session_id, $id_cure, $id_sous_type, $nom_sous_type, $prix, $prix_total];
    } else {
        $sql = "INSERT INTO favoris (
            session_id, id_cure, id_sous_type, nom_sous_type, prix, prix_total
        ) VALUES (?, ?, ?, ?, ?, ?)";
        $params = [$session_id, $id_cure, $id_sous_type, $nom_sous_type, $prix, $prix_total];
    }

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode([
            'success' => true,
            'message' => '✅ Favori ajouté avec succès.',
            'id_favoris' => $pdo->lastInsertId()
        ]);
        exit;

    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => '❌ Erreur SQL : ' . $e->getMessage()
        ]);
        exit;
    }

} else {
    echo json_encode([
        'success' => false,
        'message' => '❌ Méthode non autorisée.'
    ]);
    exit;
}
