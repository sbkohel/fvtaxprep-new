<?php
    $user=json_decode(file_get_contents('php://input'));
    if($user->mail =='sterling.kohel@gmail.com' && $user->password=='1234'){
       session_start();
       $_SESSION['uid'] = uniqid(); 
       print $_SESSION['uid'];
    }
?>