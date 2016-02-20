<?php
    //include "/Mail-1.2.0/Mail.php";
    require_once 'swiftmailer/lib/swift_required.php';
   
    function sendEmail($from, $to, $subject, $body){

        // $headers = array(
        //     'From' => $from,
        //     'To' => $to,
        //     'Subject' => $subject
        // );

        // $smtp = Mail::factory('smtp', array(
        //         'host' => 'ssl://smtp.gmail.com',
        //         'port' => '465',
        //         'auth' => true,
        //         'username' => 'fvtaxprep@gmail.com',
        //         'password' => 'bridget95!'
        // ));

        // $mail = $smtp->send($to, $headers, $body);

        // if (PEAR::isError($mail)) {
        //     echo($mail->getMessage());
        // } 
        // else {
        //     echo('Message successfully sent!');
        // }


        $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
          ->setUsername('fvtaxprep')
          ->setPassword('bridget95!');

        $mailer = Swift_Mailer::newInstance($transport);

        $message = Swift_Message::newInstance('Test Subject')
          ->setFrom(array('fvtaxprep@gmail.com' => 'fvtaxprep'))
          ->setTo(array($to))
          ->setBody($body);

        $result = $mailer->send($message);
    }
?>