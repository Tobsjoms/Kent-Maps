<?php
include 'database.php';
//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, $dbname);
 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST['id'];
 
    $sql1 = "SELECT * FROM staff WHERE RoomID LIKE '$data' ";
    $sql2 = "SELECT * FROM roomdata WHERE RoomID LIKE '$data' ";
    
    
    $result1 = mysqli_query($dbconnect, $sql1);
    $result2 = mysqli_query($dbconnect, $sql2);

    $dataRes1 = array();

    $index = 0;
    while($row = mysqli_fetch_assoc($result1)) {
    $dataRes1[$index] = $row;
    $index++;
    //echo to spit out onto a page as is or use the Json encode below
    }
    while($row = mysqli_fetch_assoc($result2)) {
        $dataRes1[$index] = $row;
        $index++;
    }
    echo json_encode($dataRes1);                 
}



?>