
<?php

require 'session.php'; //ajout pour session
header('Content-Type: application/json');

//require_once 'db.php';
require_once 'db_connexion.php';

if (isset($_GET['id_hebergement'])) {
    $id_hebergement = $_GET['id_hebergement'];

    // Préparer la requête pour trouver la chambre
    $stmt = $pdo->prepare("SELECT * FROM hebergement WHERE id_hebergement = :id_hebergement");
    $stmt->execute(['id_hebergement' => $id_hebergement]);

    // Vérifier si la chambre existe
    if ($stmt->rowCount() > 0) {
        // Récupérer les données de la chambre
        $chambreData = $stmt->fetch(PDO::FETCH_ASSOC);

        // Récupérer les sous-types associés
        $stmtSousTypes = $pdo->prepare("
        SELECT vc.*, h.type_chambre, h.prix_base
        FROM vue_chambre vc
        JOIN hebergement h ON vc.id_hebergement = h.id_hebergement
        WHERE vc.id_hebergement = :id_hebergement
      ");
        $stmtSousTypes->execute(['id_hebergement' => $chambreData['id_hebergement']]);
        $sousTypes = $stmtSousTypes->fetchAll(PDO::FETCH_ASSOC);

        // Retourner les données en JSON
        echo json_encode(['vue_chambre' => $sousTypes]);
    } else {
        echo json_encode(['error' => 'chambre non trouvée']);
    }
} else {
    echo json_encode(['error' => 'Aucune chambre fournie']);
}
exit;
?>



