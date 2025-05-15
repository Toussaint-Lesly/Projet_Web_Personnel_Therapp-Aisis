<?php
   
    require 'session.php';
    header('Content-Type: application/json');

    require_once 'db.php';
    //require_once 'db_connexion.php';
   

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

