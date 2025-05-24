<?php

require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
require_once __DIR__ . '/../PHPMailer/src/Exception.php';
require_once __DIR__ . '/../fpdf/fpdf.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function envoyerMailConfirmation($email, $prenom, $nom, $cures = [], $chambres = []) {
    // Génération PDF
    $pdf = new FPDF();
    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, 'Récapitulatif de votre réservation', 0, 1, 'C');
    $pdf->Ln(10);

    $total = 0;
    $pdf->SetFont('Arial', '', 12);

    foreach ($cures as $cure) {
        $pdf->Cell(0, 10, "Cure : " . $cure['nom_sous_type'] . " - " . number_format($cure['prix'], 2) . " €", 0, 1);
        $total += floatval($cure['prix']);
    }

    foreach ($chambres as $chambre) {
        $pdf->Cell(0, 10, "Chambre : " . $chambre['type_chambre'] . " - " . $chambre['vue'] . " - " . number_format($chambre['prix_total'], 2) . " €", 0, 1);
        $total += floatval($chambre['prix_total']);
    }

    $pdf->Ln(5);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, "Total : " . number_format($total, 2) . " €", 0, 1);

    $filename = 'panier_' . time() . '.pdf';
    $pdfPath = __DIR__ . '/pdf/' . $filename;
    $pdf->Output('F', $pdfPath);

    // Envoi du mail avec PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'therappaisis@gmail.com';
        $mail->Password = 'mhsz avmx orjc wubb'; // Pense à sécuriser ce mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('therappaisis@gmail.com', 'Therapp-Aisis');
        $mail->addAddress($email, "$prenom $nom");

        $mail->isHTML(true);
        $mail->Subject = "Confirmation de votre réservation Therapp-Aisis";
        $mail->Body = "
            <p>Bonjour <strong>$prenom $nom</strong>,</p>
            <p>Merci pour votre réservation ! Nous avons bien reçu vos informations.</p>
            <p>Vous trouverez en pièce jointe le récapitulatif de votre réservation.</p>
            <p>Cordialement,<br><strong>Therapp-Aisis</strong></p>
        ";
        $mail->addAttachment($pdfPath);

        $mail->send();
        return true; // tout s'est bien passé
    } catch (Exception $e) {
        error_log("Erreur mail: " . $mail->ErrorInfo);
        return false;
    }
}
?>