<?php
    include 'sqlInfo.php';
    	
	$comment = json_decode(file_get_contents('php://input'));

	try{
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $emailCheck_sql = $conn->prepare("SELECT CUSTOMER_ID FROM CUSTOMER WHERE LOGIN_EMAIL_ADDRESS = ?;");
	    $feedback_sql 	= $conn->prepare("INSERT INTO FEEDBACK(CUSTOMER_ID, COMMENT) VALUES (?,?)");
	   
		$emailCheck_sql->execute(array($comment->sender));
		
		while($check =  $emailCheck_sql->fetch()){
			$customer_id = $check[0];
			break;
		}

		if (isset($customer_id)){	
			$feedback_sql->execute(array($customer_id, $comment->text));
		}
		else
			echo 'Email does not Exists';
	}
	catch(PDOException $e){
    	echo $e->getMessage();
    	die();
    }  


?>