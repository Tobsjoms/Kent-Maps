<?php
	include(dirname(__FILE__) . '/../group-prerequisites/user.php');

	ensureLoggedIn();

	// Insert new user
   	$stmt = $conn->prepare("DELETE FROM deadlines WHERE user_id = :user_id AND deadline_id = :deadline_id");
    $stmt->bindParam(':user_id', $_SESSION['id']);
    $stmt->bindParam(':deadline_id', $_GET['id']);
    $stmt->execute();

    // Check it was successful
    if ($stmt->rowCount() != 1){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error";
		header("Location: http://www.google.com/");
		die();
    }

	// Success, redirect to index
	header("Location: ../../../index.php");
	die();

?>