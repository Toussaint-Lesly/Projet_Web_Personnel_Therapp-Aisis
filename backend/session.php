<?php
// 1) Paramètres du cookie de session
session_set_cookie_params([
  'lifetime' => 0,
  'path'     => '/',
  // 'domain'  => 'localhost',           // optionnel en local
  // 'domain'  => '.therapp-aisis.com',  // en production
  'secure'   => false,   // true si HTTPS
  'httponly' => true,
  'samesite' => 'Lax'
]);

// 2) Démarrage de la session si aucune session active
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
?>


