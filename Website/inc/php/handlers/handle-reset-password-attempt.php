<?php

	// Check it's strong
	if( preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/', $_POST['password']) == 0){
		// Password not strong enough
		$_SESSION["message"] = "Invalid Password";
		header("Location: ?key=" . $_POST['key']);
		die();
	}

	// Get inputs
	$inputKey = $_POST['key'];
	$inputNewPassword = $_POST['password'];

	// Already active key?
	$activeResetQuerySQL = "SELECT user_reset_expires, user_id FROM user_reset WHERE user_reset_key = :key LIMIT 1";
	$activeResetQuerySTMT = $conn->prepare($activeResetQuerySQL);
	$activeResetQuerySTMT->bindParam(':key', $inputKey, PDO::PARAM_STR);
	$activeResetQuerySTMT->execute();
	$activeResetQueryResult = $activeResetQuerySTMT->fetch();

	// If there's already a reset link alive,
	if ($activeResetQueryResult != null){
		// If it's still valid,
		if (strtotime($activeResetQueryResult[0]) > time()){

			// Hash new password
			$passwordHash = password_hash($inputNewPassword, PASSWORD_DEFAULT);
			// Update password
			$changePassQuerySQL = "UPDATE users SET user_password = :newpass WHERE user_id = :user_id";
			$changePassQuerySTMT = $conn->prepare($changePassQuerySQL);
			$changePassQuerySTMT->bindParam(':newpass', $passwordHash, PDO::PARAM_STR);
			$changePassQuerySTMT->bindParam(':user_id', $activeResetQueryResult[1], PDO::PARAM_STR);
			$changePassQuerySTMT->execute();
			// Delete the reset entry
			$deleteResetRowSQL = "DELETE FROM user_reset WHERE user_reset_key = :key";
			$deleteResetRowSTMT = $conn->prepare($deleteResetRowSQL);
			$deleteResetRowSTMT->bindParam(':key', $inputKey, PDO::PARAM_STR);
			$deleteResetRowSTMT->execute();
			// Session message to inform the user that it was successful, redirect to login
			$_SESSION["message"] = "Password Successfully Changed";
			header("Location: login.php");
			die();
		}
	}
	// Session message to inform the user that it was unsuccessful, remain on same page
	$_SESSION["message"] = "Reset Link Invalid or Expired";
	header("Location: ?");
	die();

?>