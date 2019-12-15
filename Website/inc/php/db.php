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
	    
	    // Check table exists
	    if (!tableExists($conn, "users")){
	    	// Create users table
	    	$createUsersStmt = $conn->prepare("
				CREATE TABLE users (
					user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
					user_email VARCHAR(30) NOT NULL,
					user_password CHAR(60) NOT NULL,
					user_timetable_url VARCHAR(50)
				)
	    	");
	    	$createUsersStmt->execute();
	    }

	}
	catch(PDOException $e){
	    echo "Error: " . $e->getMessage();
	}

?>