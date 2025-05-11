<?php
require 'session.php';
header('Content-Type: application/json');
require 'db.php';

// Récupération du user_id et du session_id
$user_id = $_SESSION['user_id'] ?? null;
$session_id = session_id();

if ($user_id) {
    $sql = "
        SELECT 
            c.id_cure,
            c.nom AS nom_cure,
            st.id_sous_type,
            st.nom_sous_type,
            st.prix,
            st.image
        FROM favoris f
        JOIN sous_types st ON f.id_sous_type = st.id_sous_type
        JOIN cures c ON st.id_cure = c.id_cure
        WHERE f.user_id = :user_id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['user_id' => $user_id]);

} else {
    $sql = "
        SELECT 
            c.id_cure,
            c.nom AS nom_cure,
            st.id_sous_type,
            st.nom_sous_type,
            st.prix,
            st.image
        FROM favoris f
        JOIN sous_types st ON f.id_sous_type = st.id_sous_type
        JOIN cures c ON st.id_cure = c.id_cure
        WHERE f.session_id = :session_id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['session_id' => $session_id]);
}

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$favoris = [];
foreach ($results as $row) {
    $nom = $row['nom_cure'];
    if (!isset($favoris[$nom])) {
        $favoris[$nom] = [
            'nom' => $nom,
            'options' => []
        ];
    }

    $favoris[$nom]['options'][] = [
        'id_sous_type' => $row['id_sous_type'],
        'id_cure' => $row['id_cure'],
        'nom_sous_type' => $row['nom_sous_type'],//j'ai change nom du debut en nom_sous_type
        'prix' => $row['prix'],
        'image' => $row['image']
    ];
}

echo json_encode(array_values($favoris));
exit;
?>
