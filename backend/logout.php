
<?php
session_start();
session_unset(); // Supprimer toutes les variables de session
session_destroy(); // Détruire la session

// Supprimer le cookie de session s’il existe
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Rediriger vers la page d'accueil
header('Location: ../index.html');
exit();
?>
