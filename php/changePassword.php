<?php
require('PasswordHash.php');

	session_start();
//---connect database---------------------
$dbhost = "localhost";	
$dbuser = "root";
$dbpass = "";
$dbname = "unispon";
$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname); 

if(mysqli_connect_errno()){
	$errnumber = mysqli_connect_errno();
	$errmessage = mysqli_connect_error();
	die("Database connection failed: ($errnumber) $errmessage");
}
//-------------------------------------------------connect database

$name = $_POST['name'];

if ($name)
{
	$user = mysqli_query($link, "SELECT * FROM user WHERE username = \"$name\"");

	$dbId = null;
	$dbName = null;
	$dbEmail = null;
	while ($row = mysqli_fetch_array($user, MYSQL_ASSOC))
	{
		$dbName = $row["Username"];
		$dbId = $row["UserId"];
		$dbEmail = $row["Email"];
	}

	if ($dbName && $dbId && $dbEmail)
	{
		$newpassword = randomPassword();
		$pwdHasher = new PasswordHash(8, FALSE);
		$hash = $pwdHasher->HashPassword( $newpassword );
		
		$resetPassword = mysqli_query($link, "UPDATE user SET Password = \"$hash\" WHERE UserId = $dbId;");
		if ($resetPassword)
		{
			echo("Password reset to: $newpassword");
			mail($dbEmail, "Unispon - Password Reset", "Your password has been reset.  Username: $dbName.  Temporary Password: $newpassword.  If this message has been sent in error, then please contact customer service.");
		}
		else
		{
			echo("Failed to reset password.");
		}
	}
	else
	{
		echo("Make sure that the username you entered was correct.  If you entered the correct username, then contact customer service.");
	}
}

mysqli_close($link);


function randomPassword() {
    $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[$i] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

?>