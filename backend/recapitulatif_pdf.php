<?php
require('fpdf/fpdf.php');
session_start();

$cures = $_SESSION['panier']['cures'] ?? [];
$chambres = $_SESSION['panier']['chambres'] ?? [];

$pdf = new FPDF();
$pdf->AddPage();
$pdf->AddFont('DejaVu','','DejaVuSans.php'); // Ajout de la police
$pdf->SetFont('DejaVu','',14);

// Définir les marges
$marge = 20; // en mm
$largeurPage = 210; // largeur A4 en mm
$zoneTexte = $largeurPage - 2 * $marge;

$pdf->SetLeftMargin($marge);
$pdf->SetRightMargin($marge);

$pdf->Cell(0, 10, 'Récapitulatif de votre réservation', 0, 1, 'C');
$pdf->Ln(10);

$total = 0;
$pdf->SetFont('DejaVu', '', 12);

foreach ($cures as $cure) {
    $texte = "Cure : " . $cure['nom_sous_type'] . " - " . number_format($cure['prix'], 2) . " €";
    $pdf->Cell($zoneTexte, 10, $texte, 0, 1);
    $total += floatval($cure['prix']);
}

foreach ($chambres as $chambre) {
    $texte = "Chambre : " . $chambre['type_chambre'] . " - " . $chambre['vue'] . " - " . number_format($chambre['prix_total'], 2) . " €";
    $pdf->Cell($zoneTexte, 10, $texte, 0, 1);
    $total += floatval($chambre['prix_total']);
}

$pdf->Ln(5);
$pdf->SetFont('DejaVu', 'B', 12);
$pdf->Cell($zoneTexte, 10, "Total : " . number_format($total, 2) . " €", 0, 1);

$filename = 'panier_' . time() . '.pdf';
$pdf->Output('F', 'pdf/' . $filename);

// Enregistre le nom du fichier dans la session pour le récupérer plus tard
$_SESSION['pdf_filename'] = $filename;
?>
