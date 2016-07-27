<?php
    //we need to get our variables first
    
    include 'config.php';
    $name     =   'Madrasi';  
    $email    =   'madrasi@parth.me';
    $subject  =   '[parth.parimal.me] FeedBack';
    $message  =   $_POST['message'];
    
    
    $headers  = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if(mail($email_to, $subject, $message, $headers)){
        echo 'sent'; 
    }else{
        echo 'failed';
    }
?>