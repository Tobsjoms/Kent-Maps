<?php
	include(dirname(__FILE__) . '/../group-prerequisites/user.php');

	ensureLoggedIn();

	if (!isset($_POST['submit'])){
		header("Location: ../../../index.php");
		die();
	}

	// Insert new user
   	$stmt = $conn->prepare("DELETE FROM users WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $_SESSION['id']);
    $stmt->execute();

    // Check it was successful
    if ($stmt->rowCount() != 1){
		// This should never happen btw
		$_SESSION["message"] = "Unknown Error";
		header("Location: http://www.google.com/");
		die();
    }

	// Success, redirect to logout
	header("Location: ../../../logout.php");
	die();
?>