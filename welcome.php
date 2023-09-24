 <?php
session_start();
if (!isset($_SESSION['email']) || $_SESSION['login']!==true) {
header('location:index.html');
}
$email=$_SESSION['email'];
echo'<h1>Welcome : ' . $email.'<br></h1>';
?>