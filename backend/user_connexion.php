<?php
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
     header("Access-Control-Allow-Headers: Content-Type, Authorization");
    require 'session.php';

    header('Content-Type: application/json');

    $response = [];
    if (isset($_SESSION['name'])) {
        // Concatène prénom + nom
        $response['status']   = 'connected';
        $response['username'] = trim($_SESSION['name']);
    } else {
        $response['status'] = 'not_connected';
    }
    echo json_encode($response);
    exit;
?>

 
  