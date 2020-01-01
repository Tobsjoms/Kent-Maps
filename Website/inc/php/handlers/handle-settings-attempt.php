<?php
	$userURL = $_POST['timetable-url'];
	$info = pathinfo($userURL);

	// Check if file exists & is the right filetype
	if($info["extension"] != "ics"){
	    $_SESSION["message"] = "Invalid Timetable URL" . $handle . $info["extension"];
		header("Location: ?");
		die();
	}

	$userURL = str_replace("webcal://", "", $userURL);

	// Insert new user
   	$stmt = $conn->prepare("UPDATE users SET user_timetable_url = :url WHERE user_id = :id");
    $stmt->bindParam(':id', $_SESSION['id']);
    $stmt->bindParam(':url', $userURL);
    $stmt->execute();

    // Check it was successful
    if ($stmt->rowCount() != 1){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error";
		header("Location: ?");
		die();
    }

    // Update session url
    $_SESSION['timetable_url'] = $userURL;

	// Success, redirect to login
	header("Location: login.php");
	die();

?>