<?php
    include 'sqlInfo.php';
    
    $user=json_decode(file_get_contents('php://input'));    
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
    $rows = $conn->query("SELECT * FROM LOGIN WHERE EMAIL_ADDRESS='$user->mail';");
    $found = false;
    
    foreach($rows as $row)
    {	
        $found = true;
        $email = $row[0];
        $pcheck = $row[1];
        $role = $row[2];
        break;
    } 
    
    if($user->mail == $email && $user->password==$pcheck){
       session_start();
       $_SESSION['uid'] = uniqid('ang_'); 
       $array["uid"]= $_SESSION['uid'];
       $array["role"]= $role;
       echo json_encode($array);
    }
?>