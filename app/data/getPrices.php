<?php
    include 'sqlInfo.php';

    $sql = "SELECT FORM_NAME, PRICE FROM `FORMS` ORDER BY price desc;";
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);

    $rows = $conn->query($sql);
ini_set('display_errors', 1);
    echo json_encode($rows->fetchAll());
?>