<?php
// mailToUser.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Inclure les fichiers PHPMailer depuis la racine du projet
require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
require_once __DIR__ . '/../PHPMailer/src/Exception.php';

// Fonction pour envoyer l'email de confirmation
function envoyerMailConfirmation($email, $prenom, $nom) {
    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'therappaisis@gmail.com';
        $mail->Password = 'mhsz avmx orjc wubb'; // mot de passe d'application sécurisé
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataire et contenu
        $mail->setFrom('therappaisis@gmail.com', 'Therapp-Aisis');
        $mail->addAddress($email, "$prenom $nom");

        $mail->isHTML(true);
        $mail->Subject = "Confirmation de votre réservation Therapp-Aisis";
        $mail->Body = "
            <p>Bonjour <strong>$prenom $nom</strong>,</p>
            <p>Merci pour votre réservation ! Nous avons bien reçu vos informations.</p>
            <p>Nous vous contacterons bientôt pour les détails.</p>
            <br>
            <p>Cordialement,<br><strong>Therapp-Aisis</strong></p>
        ";
        $mail->AltBody = "Bonjour $prenom $nom,\nMerci pour votre réservation ! Nous vous contacterons bientôt.";

        $mail->send();
        return true;

    } catch (Exception $e) {
        error_log("Erreur lors de l’envoi du mail : " . $mail->ErrorInfo);
        return false;
    }
}
