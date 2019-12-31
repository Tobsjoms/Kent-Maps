<?php

	session_start();
	include(dirname(__FILE__) . '/../db.php');

	function displayMessages(){
		// Display any messages we have
		if (isset($_SESSION["message"])){
			// Output message
			echo "<div id='message'>" . $_SESSION["message"] . "</div>";
			// Unset it
			unset($_SESSION["message"]);
		}
	}

	// For pages which require the user to be logged out
	function ensureLoggedOut(){
		if(isset($_SESSION['id'])){
			// Already logged in
			header("Location: index.php");
			die();
		}
	}

	// For pages which require the user to be logged in
	function ensureLoggedIn(){
		if(!isset($_SESSION['id'])){
			// Not logged in 
			header("Location: index.php");
			die();
		}
	}
?>