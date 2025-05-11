<?php
require 'session.php';
require 'db.php';

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $firstname = $_POST['firstname'] ?? '';
    $tel = $_POST['tel'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $password_confirm = $_POST['password_confirm'] ?? '';

    // Vérification des champs vides
    if (empty($name) || empty($firstname) || empty($tel) || empty($email) || empty($password) || empty($password_confirm)) {
        echo json_encode(['success' => false, 'message' => "Tous les champs doivent être remplis."]);
        exit;
    }

    // Vérification des mots de passe
    if ($password !== $password_confirm) {
        echo json_encode(['success' => false, 'message' => "Les mots de passe ne correspondent pas."]);
        exit;
    }

    // Vérification de l'existence de l'email
    $sql = "SELECT COUNT(*) FROM utilisateurs WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $userCount = $stmt->fetchColumn();

    if ($userCount > 0) {
        echo json_encode(['success' => false, 'message' => "Cet email est déjà utilisé."]);
        exit;
    }

        // Vérification de l'existence du téléphone
    $sql = "SELECT COUNT(*) FROM utilisateurs WHERE tel = :tel";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['tel' => $tel]);
    $telCount = $stmt->fetchColumn();

    if ($telCount > 0) {
        echo json_encode(['success' => false, 'message' => "Ce numéro de téléphone est déjà utilisé."]);
        exit;
    }


    // Insertion
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO utilisateurs (name, firstname, tel, email, mot_de_passe) VALUES (:name, :firstname, :tel, :email, :mot_de_passe)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'name' => $name,
        'firstname' => $firstname,
        'tel' => $tel,
        'email' => $email,
        'mot_de_passe' => $hashedPassword
    ]);

    // Réponse JSON de succès
    echo json_encode(['success' => true, 'message' => "Inscription réussie.", 'redirect' => '../index.html']);
    exit;
}

echo json_encode(['success' => false, 'message' => "Requête invalide."]);
exit;
?>