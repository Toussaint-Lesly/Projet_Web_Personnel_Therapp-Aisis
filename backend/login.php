
<?php
session_start();
header('Content-Type: application/json');

// Connexion à la base de données
$host = "localhost";
$dbname = "therapp_db";
$user = "postgres";
$password = "123";

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

    $sql = "SELECT mot_de_passe FROM utilisateurs WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($mot_de_passe, $user['mot_de_passe'])) {
        echo json_encode(["success" => true, "redirect" => "../index.html"]);
    } else {
        echo json_encode(["success" => false, "message" => "Mot de passe ou email incorrect. Avez-vous déjà un compte ?"]);
    }
    exit();
}
?>


