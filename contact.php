<?php

// comment ADD PHONE NUMBER, BEST METHOD TO REPLY, SUBJECT LINE
# comment See Page 198

$me = "marshajelleff@gmail.com";

$firstname = $_REQUEST['first-name'];
$lastname = $_REQUEST['last-name'];
$email = $_REQUEST['email'];
$accounttype = $_REQUEST['account-type'];
$referrer = $_REQUEST['referrer'];
$comment = $_REQUEST['comment'];
$submit = $_REQUEST['submit'];

// Email Validation
if (filter_var($email, FILTER_VALIDATE_EMAIL))  (
    die("Invalid email.");
)

// Message sent confirmation
$content = ''
First Name: $firstname
Last Name: $lastname 
Email: $email
Account Type: $accounttype
Referrer: $referrer
Comment: $comment'';

// Email Header
$header = "Reply-to: $email";

// Send the Message
mail($me, $me, $subject, $header);
?>
<p>Thank you. Your message has been sent.</p>

?>
