<?php

	include("inc/php/group-prerequisites/user.php");

	/***************************************************************************
		Checks
	****************************************************************************/

	// Make sure the user is logged out
	ensureLoggedOut();

	/***************************************************************************
		Handlers
	****************************************************************************/

	if(isset($_POST['submit'])){
		// User has submit username/password combo for registration
		include 'inc/php/handlers/handle-signup-attempt.php';
		die();
	}

	/***************************************************************************
		Views
	****************************************************************************/
	
	// User wants to view the default signup menu
	include 'inc/php/views/signup.php';

?>