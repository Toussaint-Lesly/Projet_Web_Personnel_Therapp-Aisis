<?php

require 'db.php'; // Connexion à la base de données

// Vérifier si le formulaire a été soumis via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données du formulaire
    $name = $_POST['name'];
    $firstname = $_POST['firstname'];
    $tel = $_POST['tel'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    // Vérification de la correspondance des mots de passe
    if ($password !== $password_confirm) {
        echo "Les mots de passe ne correspondent pas.";
        exit;
    }

    // Vérification que les champs sont remplis
    if (empty($name) || empty($firstname) || empty($tel) || empty($email) || empty($password)) {
        echo "Tous les champs doivent être remplis.";
        exit;
    }

    // Vérifier si l'email existe déjà dans la base de données
    $sql = "SELECT COUNT(*) FROM utilisateurs WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $userCount = $stmt->fetchColumn();

    if ($userCount > 0) {
        echo "Cet email est déjà utilisé.";
    } else {
        // Crypter le mot de passe avant l'insertion
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insertion dans la base de données
        $sql = "INSERT INTO utilisateurs (name, firstname, tel, email, mot_de_passe) VALUES (:name, :firstname, :tel, :email, :mot_de_passe)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'name' => $name,
            'firstname' => $firstname,
            'tel' => $tel,
            'email' => $email,
            'mot_de_passe' => $hashedPassword
        ]);

        // Message de succès et redirection
        echo "Inscription réussie ! Vous allez être redirigé vers la page d'accueil.";
        header('Location: ../index.html');
        exit();
    }
}
?>
