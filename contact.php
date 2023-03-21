<?php

// comment ADD PHONE NUMBER, BEST METHOD TO REPLY, SUBJECT LINE
# comment See Page 198

# Honeypot for spam blocking
$honeypot = filter_input(INPUT_POST, 'nickname', FILTER_SANITIZE_STRING);
if ($honeypot) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
}

$me = "marshajelleff@gmail.com";

$firstname = $_POST['first-name'];
$lastname = $_POST['last-name'];
$email = $_POST['email'];
$accounttype = $_POST['account-type'];
$referrer = $_POST['referrer'];
$message = $_POST['message'];
$subject = "Message from MarshaJelleff.com";
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
$headers = "Reply-to: $email";

// Send the Message
mail($me, $subject, $headers);

header('Location: thank_you.html');


?>
