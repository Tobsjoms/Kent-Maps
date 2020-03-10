<?php

	include("../group-prerequisites/user.php");

	// Get posted timetable url
	$userURL = $_POST['timetable-url'];

	// If we have a new url coming through, 
	if (!empty($userURL)) {
		// Check url is valid
		$info = pathinfo($userURL);
		// Check if file exists & is the right filetype
		if($info["extension"] != "ics" || filter_var($userURL, FILTER_VALIDATE_URL) === false && !@get_headers($file)){
		    $_SESSION["message"] = "Invalid Timetable URL";
			header("Location: /Kent-Maps/Website/index.php");
			die();
		}
		// Shorten
		$userURL = str_replace("webcal://", "", $userURL);
	}
	else{
		// Default to null
		$userURL = NULL;
	}

	// Get colour scheme selection
	$colourScheme = $_POST['colour-scheme'];
	// If it's an invalid selection, abort
	if ($colourScheme != "default" && $colourScheme != "colourblindmode" && $colourScheme != "darkmode"){
		// Should never happen unless user is fiddling with html
		$_SESSION["message"] = "Invalid colour scheme selection";
		echo $colourScheme;
		header("Location: /Kent-Maps/Website/index.php");
		die();
	}
	// Update current user
   	$stmt = $conn->prepare("UPDATE users SET user_timetable_url = :url, user_colour_mode = :colourmode WHERE user_id = :id");
    $stmt->bindParam(':id', $_SESSION['id']);
    $stmt->bindParam(':url', $userURL);
    $stmt->bindParam(':colourmode', $colourScheme);
    $errorless = $stmt->execute();

    // Check it was successful
    if (!$errorless){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error " . $conn->errorCode();
		header("Location: /Kent-Maps/Website/index.php");
		die();
    }

    // Update session url
    $_SESSION['timetable_url'] = $userURL;
    // Update session colour scheme
    $_SESSION['colour_scheme'] = $colourScheme;

	// Success, redirect to index
	header("Location: /Kent-Maps/Website/index.php");
	die();

?>