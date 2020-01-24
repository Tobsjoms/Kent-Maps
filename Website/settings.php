<?php

	include("inc/php/group-prerequisites/user.php");

	/***************************************************************************
		Checks
	****************************************************************************/

	// Make sure the user is logged out
	ensureLoggedIn();

	/***************************************************************************
		Handlers
	****************************************************************************/

	if(isset($_POST['submit'])){
		// User has submit new settings
		include 'inc/php/handlers/handle-settings-attempt.php';
		die();
	}

	/***************************************************************************
		Views
	****************************************************************************/
	
	// User wants to view the default signup menu
	include 'inc/php/views/settings.php';

?>