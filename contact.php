<?php

// comment ADD PHONE NUMBER, BEST METHOD TO REPLY, SUBJECT LINE
# comment See Page 198

$me = "marshajelleff@gmail.com";

$firstname = $_POST['first-name'];
$lastname = $_POST['last-name'];
$email = $_POST['email'];
$accounttype = $_POST['account-type'];
$referrer = $_POST['referrer'];
$message = $_POST['message'];
$subject = "Message from MarshaJelleff.com"
$submit = $_POST['submit'];

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
Message: $message'';

// Email Header
$header = "Reply-to: $email";

// Send the Message
mail($me, $subject, $header);

<p>Thank you. Your message has been sent.</p>

?>
