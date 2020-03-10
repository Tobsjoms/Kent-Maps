<?php
	$servername = "krelly.com.mysql";
	$username = "krelly_com";
	$password = "DKdKX4mtPLCDUhv6Tf237xjc";
	$dbname = "krelly_com";


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
					user_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
					user_email VARCHAR(30) NOT NULL,
					user_password CHAR(60) NOT NULL,
					user_timetable_url VARCHAR(50),
					user_colour_mode VARCHAR(30)
				)
	    	");
	    	$createUsersStmt->execute();
	    }

	    // Check table exists
	    if (!tableExists($conn, "deadlines")){
	    	// Create users table
	    	$createDeadlineStmt = $conn->prepare("
				CREATE TABLE deadlines (
					deadline_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
					user_id INT(10) UNSIGNED,
					deadline_title VARCHAR(100) NOT NULL,
					deadline_link VARCHAR(1000) NOT NULL,
					deadline_datetime DATETIME NOT NULL,
					FOREIGN KEY (user_id) REFERENCES users(user_id)
				)
	    	");
	    	$createDeadlineStmt->execute();
	    }

	}
	catch(PDOException $e){
	    echo "Error: " . $e->getMessage();
	}

?>