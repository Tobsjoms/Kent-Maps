<?php
	include(dirname(__FILE__) . '/../group-prerequisites/user.php');

	ensureLoggedIn();

	// Insert new user
   	$stmt = $conn->prepare("INSERT INTO deadlines (user_id, deadline_title, deadline_link, deadline_datetime) VALUES (:user_id, :deadline_title, :deadline_link, :deadline_datetime)");
    $stmt->bindParam(':user_id', $_SESSION['id']);
    $stmt->bindParam(':deadline_title', $_POST['title']);
    $stmt->bindParam(':deadline_link', $_POST['link']);
    $stmt->bindParam(':deadline_datetime', $_POST['date-time']);
    $stmt->execute();

    // Check it was successful
    if ($stmt->rowCount() != 1){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error";
		header("Location: http://www.google.com/");
		die();
    }

	// Success, redirect to login
	header("Location: ../../../index.php");
	die();

?>