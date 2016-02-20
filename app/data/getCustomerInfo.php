<?php
    include 'sqlInfo.php';

    $user=file_get_contents('php://input');
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $customer_sql = $conn->prepare("SELECT * FROM PERSON INNER JOIN CUSTOMER ON PERSON_PERSON_ID = PERSON_ID WHERE LOGIN_EMAIL_ADDRESS =?;");
    
    $customer_sql->execute(array($user));

  //   while($check =  $emailCheck_sql->fetch()){
		// 	$row = $check;
		// 	print_r($row);
		// 	break;
		// }
	ini_set('display_errors', 1);
    echo json_encode($customer_sql->fetchAll()[0]);
?>

