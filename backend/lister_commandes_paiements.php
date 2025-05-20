<?php
require 'session.php';
header('Content-Type: application/json');

//require_once 'db.php';
require_once 'db_connexion.php';

$user_id = $_SESSION['user_id'] ?? null;
$session_id = session_id();

try {
    $where = "";
    $params = [];

    if (!empty($user_id)) {
        $where = "WHERE commandes.user_id = :user_id";
        $params[':user_id'] = $user_id;
    } elseif (!empty($session_id)) {
        $where = "WHERE commandes.session_id = :session_id";
        $params[':session_id'] = $session_id;
    } else {
        throw new Exception("Aucun identifiant de session ou d'utilisateur trouvé.");
    }

    // Récupération des commandes
    $sqlCommandes = "
        SELECT 
            commandes.*,
            utilisateurs.name AS user_name,
            utilisateurs.firstname AS user_firstname,
            paiements.nom AS guest_name,
            paiements.prenom AS guest_firstname
        FROM commandes
        LEFT JOIN utilisateurs ON utilisateurs.id = commandes.user_id
        LEFT JOIN paiements ON paiements.session_id = commandes.session_id
        $where
        ORDER BY commandes.date_commande DESC, commandes.id_commande ASC
    ";
    $stmt = $pdo->prepare($sqlCommandes);
    $stmt->execute($params);
    $commandes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // On récupère tous les détails de commande liés aux utilisateurs ou sessions
    $sqlDetails = "
        SELECT * FROM commandes_details
        WHERE " . (!empty($user_id) ? "user_id = :id" : "session_id = :id");
    $stmtDetails = $pdo->prepare($sqlDetails);
    $stmtDetails->execute([':id' => $user_id ?? $session_id]);
    $details = $stmtDetails->fetchAll(PDO::FETCH_ASSOC);

    // On regroupe les détails par session_id
    $detailsParSession = [];
    foreach ($details as $detail) {
        $sid = $detail['session_id'];
        $type = ucfirst($detail['type']);
        $desc = '';
        $prix = 0;

        // Décodage des détails JSON
        $decodedDetails = json_decode($detail['details'], true); // Décodage JSON

        if ($detail['type'] === 'cure') {
            $desc = $decodedDetails['nom_sous_type'] ?? 'Cure inconnue';
            $prix = $decodedDetails['prix'] ?? 0;
        } else {
            $typeChambre = $decodedDetails['type_chambre'] ?? 'Chambre';
            $vue = $decodedDetails['vue'] ?? 'vue inconnue';
            $desc = "$typeChambre avec $vue";
            $prix = $decodedDetails['prix_total'] ?? 0;
        }

        $detailsParSession[$sid][] = [
            'type' => $type,
            'description' => $desc,
            'prix' => $prix
        ];
    }

    // Finalisation du format
    $groupes = [];
    $seenSessions = [];

    foreach ($commandes as $cmd) {
        $sid = $cmd['session_id'];
        $key = $cmd['date_commande'];

        if (in_array($sid, $seenSessions)) continue;
        $seenSessions[] = $sid;

        $groupes[$key] = [
            'infos' => $cmd,
            'items' => $detailsParSession[$sid] ?? []
        ];
    }

    echo json_encode(array_values($groupes));

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur PDO : ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur : ' . $e->getMessage()]);
}
exit;
?>
