<?php

	$sql= "SELECT user_id, user_password, user_timetable_url, user_colour_mode FROM users WHERE user_email = :user_email LIMIT 1";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam(':user_email', $_POST['email'], PDO::PARAM_STR);
	$stmt->execute();
	$row = $stmt->fetch();

	// If there is a user with that email, 
	if ($row != null){
		// Check input password against the saved password
		if(password_verify($_POST['password'], $row[1])){
			// Correct username/password combo
			$_SESSION['id'] = $row[0];
			$_SESSION['email'] = $_POST['email'];
			
			// If we have a url set, set session var
			$_SESSION['timetable_url'] = $row[2];
			// If we have a colour scheme set, set session var
			$_SESSION['colour_scheme'] = $row[3];

			// Redirect them to settings
			header("Location: index.php");
			die();
		}
	}

	// Incorrect username / password combo
	$_SESSION["message"] = "Incorrect Username or Password";
	header("Location: ?");
	die();

?>