<?php

	session_start();
	session_unset();
	session_destroy();

	// Redirect them to index
	header("Location: index.php");
	die();

?>