<?php
session_start();
header('Content-Type: application/json');

require 'db.php'; // Connexion à la base de données

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur de connexion à la base de données."]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $mot_de_passe = $_POST['password'];

    $sql = "SELECT id, name, firstname, role, mot_de_passe FROM utilisateurs WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($mot_de_passe, $user['mot_de_passe'])) {
        // Sauvegarder les infos en session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['firstname'] = $user['firstname'];
        $_SESSION['role'] = $user['role'];

        // Rediriger en fonction du rôle
        if ($user['role'] === 'admin') {
            echo json_encode(["success" => true, "redirect" => "../vues/admin.html"]);
        } else {
            echo json_encode(["success" => true, "redirect" => "../index.html"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Mot de passe ou email incorrect. Avez-vous déjà un compte ?"]);
    }
    exit();
}
?>
