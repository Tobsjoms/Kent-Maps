<?php

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "ukcguru";

	function tableExists($conn, $table) {
		// Check if we can get something from the table
	    try {
	        $result = $conn->query("SELECT 1 FROM $table LIMIT 1");
	    } catch (Exception $e) {
	        // Table not found
	        return FALSE;
	    }
	    // Return true or false
	    return $result !== FALSE;
	}

	try {
		// Create connection
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    // Set PDO error mode
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    
	    // Check tables exist, create if not
	    if (!tableExists($conn, "users")){
	    	// Create users table
	    	$createUsersStmt = $conn->prepare("
				CREATE TABLE users (
					user_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
					user_email VARCHAR(30) NOT NULL,
					user_password CHAR(60) NOT NULL,
					user_timetable_url VARCHAR(50),
					user_colour_mode VARCHAR(30)
				)
	    	");
	    	$createUsersStmt->execute();
	    }

	   	if (!tableExists($conn, "user_reset")){
	    	// Create user reset table
	    	$createUsersStmt = $conn->prepare("
				CREATE TABLE user_reset (
					user_reset_key VARCHAR(30) NOT NULL,
					user_reset_expires datetime,
					user_id INT(10) UNSIGNED,
					PRIMARY KEY (user_reset_key, user_reset_expires),
					FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
				)
	    	");
	    	$createUsersStmt->execute();
	    }

	    if (!tableExists($conn, "deadlines")){
	    	// Create deadlines table
	    	$createDeadlineStmt = $conn->prepare("
				CREATE TABLE deadlines (
					deadline_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
					user_id INT(10) UNSIGNED,
					deadline_title VARCHAR(100) NOT NULL,
					deadline_link VARCHAR(1000) NOT NULL,
					deadline_datetime DATETIME NOT NULL,
					FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
				)
	    	");
	    	$createDeadlineStmt->execute();
	    }

	}
	catch(PDOException $e){
	    echo "Error: " . $e->getMessage();
	}

?>