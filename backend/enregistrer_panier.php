<?php
require 'db.php'; // Connexion à la base de données

// Fonction pour valider une date au format jj/mm/aaaa
function validerDate($date, $format = 'd/m/Y') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
}

// Vérifier si le formulaire a été soumis via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Récupérer et nettoyer les données du formulaire
    $description = strip_tags($_POST['description'] ?? '');
    $nom_sous_type = strip_tags($_POST['nom_sous_type'] ?? '');
    $type_chambre = strip_tags($_POST['type_chambre'] ?? '');
    $vue = strip_tags($_POST['vue'] ?? '');
    $statut = $_POST['statut'] ?? 'panier';

    $prix = floatval($_POST['prix'] ?? 0);
    $prix_base = floatval($_POST['prix_base'] ?? 0);
    $supplement = floatval($_POST['supplement'] ?? 0);
    $prix_total = floatval($_POST['prix_total'] ?? 0);

    $id_cure = intval($_POST['id_cure'] ?? 0);
    $id_sous_type = intval($_POST['id_sous_type'] ?? 0);
    $id_hebergement = intval($_POST['id_hebergement'] ?? 0);
    $id_vue_chambre = intval($_POST['id_vue_chambre'] ?? 0);

    $date_arrivee = $_POST['date_arrivee'] ?? '';
    $date_depart = $_POST['date_depart'] ?? '';

    // Validation des dates
    if (empty($date_arrivee) || empty($date_depart)) {
        echo "⚠️ Tous les champs obligatoires doivent être remplis (y compris les dates).";
        exit;
    }

    if (!validerDate($date_arrivee) || !validerDate($date_depart)) {
        echo "⚠️ Les dates doivent être au format valide (jj/mm/aaaa).";
        exit;
    }

    // Préparer la requête d'insertion
    $sql = "INSERT INTO reservation (
        id_cure, description, id_sous_type, nom_sous_type, prix,
        id_hebergement, type_chambre, prix_base,
        id_vue_chambre, vue, supplement,
        date_arrivee, date_depart,
        prix_total,
        statut
    ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
    )";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $id_cure, $description, $id_sous_type, $nom_sous_type, $prix,
            $id_hebergement, $type_chambre, $prix_base,
            $id_vue_chambre, $vue, $supplement,
            $date_arrivee, $date_depart,
            $prix_total,
            $statut
        ]);

        //echo "✅ Réservation enregistrée avec succès ! <a href='../vues/afficher_dans_panier.html'>Voir le panier</a>";
        //exit;
        echo "✅ Réservation enregistrée avec succès !  <a href='../vues/afficher_dans_panier.html'>Souhaitez-vous voir le panier ? </a> ";
        exit; // ← ajoute ce exit


    } catch (PDOException $e) {
        echo "❌ Erreur lors de l'enregistrement : " . $e->getMessage();
        exit;
    }
} else {
    echo "❌ Méthode non autorisée.";
    exit;
}
?>
