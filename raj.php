<?php
header('Content-Type:application/json');
header('Acess-Control-Allow-Origin: *');
$data = json_decode(file_get_contents("php://input"), true);
include('db.php');
if (isset($data['otp'])) {
    $otp = mysqli_real_escape_string($con, $data['otp']);
    $email = mysqli_real_escape_string($con, $data['email']);
    $sql = mysqli_query($con, "SELECT * FROM user WHERE otp='$otp' AND  status='0' AND email='$email'");
    if (mysqli_num_rows($sql) > 0) {
        $sql = mysqli_query($con, "UPDATE `user` SET  status='1' WHERE otp='$otp' AND email='$email'");
        if ($sql) {
            echo json_encode(['status' => true, 'message' => 'OTP Verified']);
        } else {

            echo json_encode(['status' => false, 'message' => 'Invalid OTP']);
        }
    } else {

        echo json_encode(['status' => false, 'message' => 'Invalid OTP']);
    }
} elseif (isset($data['password'])) {
    $password = mysqli_real_escape_string($con, $data['password']);
    $email = mysqli_real_escape_string($con, $data['email']);
    $sql = mysqli_query($con, "UPDATE `user` SET  password='$password' WHERE email='$email'");
    if ($sql) { session_start();
        $_SESSION['email']=$email;
        $_SESSION['login']=true;
        setcookie('email',$email);
        setcookie('password', $password);
         echo json_encode(['status' => true, 'message' => 'Registration Successfull']);
       
    } else {

        echo json_encode(['status' => false, 'message' => 'Registration Failed 1']);
    }
} elseif (isset($data['email'])) {
    $email = mysqli_real_escape_string($con, $data['email']);
    $sql = mysqli_query($con, "SELECT * FROM user WHERE email='$email' and status='1'");
    if (mysqli_num_rows($sql) > 0) {
        echo json_encode(['status' => false, 'message' => 'Email Already Exists']);
    } else {
        $sql = mysqli_query($con, "INSERT INTO `user`(email)VALUES('$email')");
        if ($sql) {
            $sql = mysqli_query($con, "SELECT * FROM user WHERE email='$email'");
            if (mysqli_num_rows($sql) > 0) {
                $otp = rand(111111, 999999);
                $sql = mysqli_query($con, "UPDATE `user` SET  otp='$otp' WHERE email='$email'");
                if ($sql) {
                    include 'PHPMailer/use/use.php';
                    $arr = [$email, 'Email Verification', 'Your Otp Is:' . $otp];
                    email($arr);
                    echo json_encode(['status' => true, 'message' => 'OTP Sent']);
                } else {

                    echo json_encode(['status' => false, 'message' => 'Somthing went wrong']);
                }
            } else {

                echo json_encode(['status' => false, 'message' => 'Somthing went wrong']);
            }
        }else{
            echo json_encode(['status' => false, 'message' => 'Somthing went wrong']);
        }
    }
}
?>