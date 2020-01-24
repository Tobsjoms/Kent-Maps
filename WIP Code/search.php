<?php 
    // XAMPP database info - host, username, password, database name
    $dbhost = "";
    $username = "";
    $password = "";
    $dbname = "";

    // Connect to database
    $connect = new mysqli($dbhost, $username, $password, $dbname); 

    // If connection failed...
    if ($connect === false) {
        die("Failed to connect to database: %s\n" . mysqli_connect_error());   
    }

    // POST passed from webpage searchbar...
    if ((isset($_POST['search'])) && !empty($_POST['search'])) {
        $search = $_POST['search'];
        
        // SQL statement - For retrieving specific searches (if needed) 
        // Replace with SQL statement....
        $sql = "SELECT * FROM table_name";
        
        // Query database...
        $result = $connect->query($sql);
        echo $result;   
        
        // For non-specific searches i.e room CWS132
        // Gor through each row retrieving all data (person, phone number, email, hours in office etc...)
        while($row = $result->fetch_assoc()) {
			echo "<tr><td>" . $row['column_name']. "</td><td>" . $row['column_name'] . "</td><td>" . $row['column_name'] . "</td></tr>"; // etc   
		} 
    }



?>