<?php

// comment ADD PHONE NUMBER, BEST METHOD TO REPLY, SUBJECT LINE
# comment See Page 198

# Honeypot for spam blocking
$honeypot = filter_input(INPUT_POST, 'nickname', FILTER_SANITIZE_STRING);
if ($honeypot) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
}

$to = "marshajelleff@gmail.com";

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
$content = "
First Name: ".$firstname ."\r\n
Last Name: ".$lastname ."\r\n 
Email: ".$email ."\r\n
Account Type: ".$accounttype ."\r\n
Referrer: ".$referrer ."\r\n
Message: ". $message";

// Email Header
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';

// Additional headers
$headers[] = "To: $to";
$headers[] = "From: $email";
$header = implode('\r\n', $headers);

// Mail it
mail($to, $subject, $content, $header);

if (isset($_POST['submit'])){   header("Location: thank_you.html")   }

?>
