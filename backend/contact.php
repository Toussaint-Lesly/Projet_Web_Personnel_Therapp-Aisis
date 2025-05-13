<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
require_once __DIR__ . '/../PHPMailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // Configuration SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'therappaisis@gmail.com';
        $mail->Password = 'mhsz avmx orjc wubb'; // mot de passe d'application
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email expéditeur et destinataire
        $mail->setFrom('therappaisis@gmail.com', 'Therapp-Aisis');
        $mail->addAddress('therappaisis@gmail.com'); // Réception sur ta propre boîte

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = "Message depuis le formulaire de contact - $nom";
        $mail->Body = "
            <p><strong>Nom :</strong> $nom</p>
            <p><strong>Email :</strong> $email</p>
            <p><strong>Message :</strong><br>$message</p>
        ";
        $mail->AltBody = "Nom: $nom\nEmail: $email\nMessage:\n$message";

        $mail->send();
        // ✅ Redirection vers la page d'accueil
        header("Location: ../index.html");
        exit();

    } catch (Exception $e) {
        error_log("Erreur contact : " . $mail->ErrorInfo);
        echo "Erreur lors de l'envoi du message.";
    }
}
?>
