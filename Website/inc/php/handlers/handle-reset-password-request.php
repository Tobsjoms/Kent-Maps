<?php

	$emailExistsQuerySQL = "SELECT user_id, user_email FROM users WHERE user_email = :user_email LIMIT 1";
	$emailExistsQuerySTMT = $conn->prepare($emailExistsQuerySQL);
	$emailExistsQuerySTMT->bindParam(':user_email', $_POST['email'], PDO::PARAM_STR);
	$emailExistsQuerySTMT->execute();
	$emailExistsQueryResult = $emailExistsQuerySTMT->fetch();

	if($emailExistsQueryResult == null){
		// No users found with that email
		$_SESSION["message"] = "Email not associated with any account";
		header("Location: ?");
		die();
	}

	// Variables for readability
	$userID = $emailExistsQueryResult[0];
	$userEmail = $emailExistsQueryResult[1];

	// Already active key?
	$activeResetQuerySQL = "SELECT user_reset_key, user_reset_expires FROM user_reset WHERE user_id = :user_id LIMIT 1";
	$activeResetQuerySTMT = $conn->prepare($activeResetQuerySQL);
	$activeResetQuerySTMT->bindParam(':user_id', $userID, PDO::PARAM_STR);
	$activeResetQuerySTMT->execute();
	$activeResetQueryResult = $activeResetQuerySTMT->fetch();

	// If there's already a reset link alive,
	if ($activeResetQueryResult != null){

		if (strtotime($activeResetQueryResult[1]) > time()){
			// Not expired, send the user the same key
			$resetKey = $activeResetQueryResult[0];
		}
		else{
			// Expired, update the row to be new
			$resetKey = substr(str_shuffle(md5(time())),0,32);
			$newResetExpires = date('Y-m-d H:i:s', strtotime('+1 day', time()));

			$expiredQuerySQL = "UPDATE user_reset SET user_reset_key = :key, user_reset_expires = :expires WHERE user_id = :user_id";
			$expiredQuerySTMT = $conn->prepare($expiredQuerySQL);
			$expiredQuerySTMT->bindParam(':user_id', $userID, PDO::PARAM_STR);
			$expiredQuerySTMT->bindParam(':key', $resetKey, PDO::PARAM_STR);
			$expiredQuerySTMT->bindParam(':expires', $newResetExpires, PDO::PARAM_STR);
			$expiredQuerySTMT->execute();
		}
	}
	else{
		// No reset link currently alive, create one
		$resetKey = substr(str_shuffle(md5(time())),0,32);
		$newResetExpires = date('Y-m-d H:i:s', strtotime('+1 day', time()));

		$createKeyQuerySQL = "INSERT INTO user_reset (user_id, user_reset_key, user_reset_expires) VALUES (:user_id, :key, :expires)";
		$createKeyQuerySTMT = $conn->prepare($createKeyQuerySQL);
		$createKeyQuerySTMT->bindParam(':user_id', $userID, PDO::PARAM_STR);
		$createKeyQuerySTMT->bindParam(':key', $resetKey, PDO::PARAM_STR);
		$createKeyQuerySTMT->bindParam(':expires', $newResetExpires, PDO::PARAM_STR);
		$createKeyQuerySTMT->execute();
	}

	$to      = $userEmail;
	$subject = "Password Reset";
	$message = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
				<html xmlns='http://www.w3.org/1999/xhtml'>
				<head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>
				<body>
					We have recieved a request to reset your password. If you didn't request this, ignore this email.</br></br>
					<a href='https://www.ukcmaps.co.uk/reset-password.php?key=$resetKey'>Reset Password</a>
				</body>
				</html>";
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= "From: UKCMaps Support <noreply@ukcmaps.com>" . "\r\n";

	mail($to, $subject, $message, $headers);

	// Redirect to login
	$_SESSION["message"] = "An email containing a reset link has been sent";
	header("Location: login.php");
	die();

?>