<?php
    include 'sqlInfo.php';
    	
	$person = json_decode(file_get_contents('php://input')); 
	
    try{
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $emailCheck_sql = $conn->prepare("SELECT PERSON_PERSON_ID FROM CUSTOMER WHERE LOGIN_EMAIL_ADDRESS = ?;");
	    $person_sql 	= $conn->prepare("UPDATE PERSON SET F_NAME = ?, L_NAME = ?, STREET_ADDRESS = ?, CITY = ?, STATE = ?, ZIPCODE = ?, PHONE_NUMBER = ?, CELL_NUMBER = ? WHERE PERSON_ID = ?");
	   
		$emailCheck_sql->execute(array($person->LOGIN_EMAIL_ADDRESS));
		
		while($check =  $emailCheck_sql->fetch()){
			$person_id = $check[0];
			break;
		}

		if (isset($person_id)){	
			$person_sql->execute(array($person->F_NAME,$person->L_NAME,$person->STREET_ADDRESS,$person->CITY,$person->STATE,$person->ZIPCODE,$person->PHONE_NUMBER,$person->CELL_NUMBER, $person_id));
		}
		else
			echo 'Email does not Exists';
	}
	catch(PDOException $e){
    	echo $e->getMessage();
    	die();
    }     
?>