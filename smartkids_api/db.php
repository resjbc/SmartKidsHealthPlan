<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$servername = "203.157.237.18";
$username = "sisqc";
$password = "ptn1234##";
$dbname = "hdc";
$conn = new mysqli($servername, $username, $password, $dbname);
?>
