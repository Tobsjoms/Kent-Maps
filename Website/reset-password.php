<?php

	include("inc/php/group-prerequisites/user.php");

	/***************************************************************************
		Checks
	****************************************************************************/

	// Make sure the user is logged out
	ensureLoggedOut();

	/***************************************************************************
		Handlers
	****************************************************************************/

	if(isset($_POST['submit-new-pass'])){
		// User has submit a new password (and key hidden in the form)
		include 'inc/php/handlers/handle-reset-password-attempt.php';
		die();
	}
	elseif(isset($_POST['submit-email'])){
		// User has submit their email to be sent a reset link 
		include 'inc/php/handlers/handle-reset-password-request.php';
		die();
	}

	/***************************************************************************
		Views
	****************************************************************************/

	if (isset($_GET['key'])){

		$key = $_GET['key'];

		// Check if the key exists in the user_reset table
		$validKeyQuerySQL = "SELECT * FROM user_reset WHERE user_reset_key = :key LIMIT 1";
		$validKeyQuerySTMT = $conn->prepare($validKeyQuerySQL);
		$validKeyQuerySTMT->bindParam(':key', $_GET['key'], PDO::PARAM_STR);
		$validKeyQuerySTMT->execute();
		$validKeyQueryResult = $validKeyQuerySTMT->fetch();

		// Valid reset key
		if ($validKeyQueryResult != null){
			// User wants to view the password reset form
			include 'inc/php/views/reset-password-form.php';
		}
		else{
			// Invalid or expired key
			$_SESSION["message"] = "Invalid or expired password reset link";
			include 'inc/php/views/reset-password.php';
		}
	}
	else{
		// User wants to view the password reset request page
		include 'inc/php/views/reset-password.php';
	}

?>