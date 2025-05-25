<?php

// Optionnel : ignorer les avertissements Deprecated
error_reporting(E_ALL & ~E_DEPRECATED);

require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
require_once __DIR__ . '/../PHPMailer/src/Exception.php';
require_once __DIR__ . '/../fpdf/fpdf.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function envoyerMailConfirmation($email, $prenom, $nom, $cures = [], $chambres = []) {
    // Génération PDF
    $pdf = new FPDF();
    $pdf->AddFont('DejaVu', '', 'DejaVuSans.php');
    $pdf->AddFont('DejaVu', 'B', 'DejaVuSans-Bold.php');
    $pdf->AddPage();
    $pdf->SetFont('DejaVu', '', 14);

    // Marges et texte
    $marge = 20;
    $largeurPage = 210;
    $zoneTexte = $largeurPage - 2 * $marge;

    $pdf->SetLeftMargin($marge);
    $pdf->SetRightMargin($marge);

    $pdf->Cell(0, 10, 'Recapitulatif de votre reservation', 0, 1, 'C');
    $pdf->Ln(10);

    $total = 0;
    $pdf->SetFont('DejaVu', '', 12);

    foreach ($cures as $cure) {
        $texte = "Cure : " . $cure['nom_sous_type'] . " - " . number_format($cure['prix'], 2) . " €";
        //$pdf->Cell($zoneTexte, 10, $texte, 0, 1);
        $pdf->MultiCell(0, 10, $texte, 0, 'L');

        $total += floatval($cure['prix']);
    }

    foreach ($chambres as $chambre) {
        $texte = "Chambre : " . $chambre['type_chambre'] . " - " . $chambre['vue'] . " - " . number_format($chambre['prix_total'], 2) . " €";
        //$pdf->Cell($zoneTexte, 10, $texte, 0, 1);
        $pdf->MultiCell(0, 10, $texte, 0, 'L');
        $total += floatval($chambre['prix_total']);
    }

    $pdf->Ln(5);
    $pdf->SetFont('DejaVu', 'B', 12);
    $pdf->Cell($zoneTexte, 10, "Total : " . number_format($total, 2) . " €", 0, 1);

    // Sauvegarde PDF
    $filename = 'panier_' . time() . '.pdf';
    $pdfPath = __DIR__ . '/pdf/' . $filename;
    $pdf->Output('F', $pdfPath);

    // Envoi du mail
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'therappaisis@gmail.com';
        $mail->Password = 'mhsz avmx orjc wubb';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('therappaisis@gmail.com', 'Therapp-Aisis');
        $mail->addAddress($email, "$prenom $nom");

        $mail->isHTML(true);
        $mail->Subject = "Confirmation de votre réservation Therapp-Aisis";
        $mail->Body = "
            <p>Bonjour <strong>$prenom $nom</strong>,</p>
            <p>Merci pour votre reservation ! Nous avons bien recu vos informations.</p>
            <p>Vous trouverez en piece jointe le recapitulatif de votre reservation.</p>
            <p>Cordialement,<br><strong>Therapp-Aisis</strong></p>
        ";
        $mail->addAttachment($pdfPath);

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Erreur mail: " . $mail->ErrorInfo);
        return false;
    }
}
?>
