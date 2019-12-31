<?php

	// Open file
	$handle = @fopen($_POST['timetable-url'], 'r');

	// Check if file exists
	if(!$handle){
	    $_SESSION["message"] = "Invalid Timetable URL";
		header("Location: ?");
		die();
	}

	// Insert new user
   	$stmt = $conn->prepare("UPDATE users SET user_timetable_url = :url WHERE user_id = :id");
    $stmt->bindParam(':id', $_SESSION['id']);
    $stmt->bindParam(':url', $_POST['timetable-url']);
    $stmt->execute();

    // Check it was successful
    if ($stmt->rowCount() != 1){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error";
		header("Location: ?");
		die();
    }

    // Update session url
    $_SESSION['timetable_url'] = $_POST['timetable-url'];

	// Success, redirect to login
	header("Location: login.php");
	die();

?>