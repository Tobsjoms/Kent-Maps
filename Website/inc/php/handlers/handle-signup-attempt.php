<?php

	if( preg_match('/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/', $_POST['email']) == 0){
		// Invalid email
		$_SESSION["message"] = "Invalid Email";
		header("Location: ?");
		die();
	}

	if( preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/', $_POST['password']) == 0){
		// Password isn't strong enough
		$_SESSION["message"] = "Invalid Password";
		header("Location: ?");
		die();
	}

    // Check if that email already exists
	$sql= "SELECT COUNT(*) as total FROM users WHERE user_email = :user_email";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(':user_email', $_POST['email'], PDO::PARAM_STR);
	$stmt->execute();
	$result = $stmt->fetchAll();

	if ($result[0][0] != 0){
		// Email already exists
		$_SESSION["message"] = "An account already exists with that email address.";
		header("Location: ?");
		die();
	}

	// Hash password
	$hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);

	// Insert new user
   	$stmt = $conn->prepare("INSERT INTO users (user_email, user_password, user_timetable_url) VALUES (:email, :password, null)");
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->execute();

    // Check it was successful
    if ($stmt->rowCount() != 1){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error";
		header("Location: ?");
		die();
    }

	$_SESSION["message"] = "Account successfully created";

	// Success, redirect to login
	header("Location: login.php");
	die();

?>