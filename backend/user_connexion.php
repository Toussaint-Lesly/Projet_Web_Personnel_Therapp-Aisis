<?php
    
    require 'session.php';

    header('Content-Type: application/json');

    $response = [];
    if (isset($_SESSION['name'])) {
        // Concatène prénom + nom
        $response['status']   = 'connected';
        $response['username'] = trim($_SESSION['firstname']);
    } else {
        $response['status'] = 'not_connected';
    }
    echo json_encode($response);
    exit;
?>

 
  