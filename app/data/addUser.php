

<?php
    include 'sqlInfo.php';
    include 'sendEmail.php';
	
	$person = json_decode(file_get_contents('php://input'));    
 	$hash = password_hash($person->passwd, PASSWORD_DEFAULT);
 	$guid = guidv4();

    try{
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $emailCheck_sql = $conn->prepare("SELECT CUSTOMER_ID FROM CUSTOMER WHERE LOGIN_EMAIL_ADDRESS = ?;");
	    $person_sql 	= $conn->prepare("INSERT INTO PERSON(F_NAME, L_NAME, STREET_ADDRESS, CITY, STATE, ZIPCODE, PHONE_NUMBER, CELL_NUMBER) 
    									  VALUES (?,?,?,?,?,?,?,?)");
	    $customer_sql 	= $conn->prepare("INSERT INTO CUSTOMER(PERSON_PERSON_ID, LOGIN_EMAIL_ADDRESS) VALUES (?,?)");
	    $login_sql 		= $conn->prepare("INSERT INTO LOGIN(EMAIL_ADDRESS, PASSWORD, ROLE, CODE, VERIFIED, LAST_LOGIN) VALUES (?,?,?,?,?,?)");
	    $stmt 			= $conn->prepare("SELECT PERSON_ID FROM PERSON WHERE F_NAME = ? AND L_NAME = ?;");

		$emailCheck_sql->execute(array($person->email));
		
		while($check =  $emailCheck_sql->fetch()){
			$customer_id = $check[0];
			break;
		}

		if (!isset($customer_id)){	
			$person_sql->execute(array($person->firstname,$person->lastname,$person->street,$person->city,$person->state,$person->zipcode,$person->homenumber,$person->cellnumber));
		    $stmt->execute(array($person->firstname, $person->lastname));
		    
		    while($row = $stmt->fetch()){	
		    	$person_id = $row[0];
		        break;
		    }

		    $customer_sql->execute(array($person_id, $person->email));
		    $login_sql->execute(array($person->email, $hash, customer, $guid, 0, '1900-01-01'));

		    //$message = sendEmail('<fvtaxprep@gmail.com>',$person->email,'Email Verification',"<html><body>Thank You For Registering With FVTaxPrep\n\nPlease Click The Following Link To Confirm Your Account: <a href = 'www.fvtaxprep.com/data/validate.php?email=".$person->email."&code=".guid."'>www.fvtaxprep.com</a></body></html>");
		}
		else
			echo 'Email Exists';
	}
	catch(PDOException $e){
    	echo $e->getMessage();
    	die();
    }


    function guidv4(){
	    $data = openssl_random_pseudo_bytes( 16 );
	    $data[6] = chr( ord( $data[6] ) & 0x0f | 0x40 ); // set version to 0100
	    $data[8] = chr( ord( $data[8] ) & 0x3f | 0x80 ); // set bits 6-7 to 10

	    return vsprintf( '%s%s-%s-%s-%s-%s%s%s', str_split( bin2hex( $data ), 4 ) );
	}    
?>