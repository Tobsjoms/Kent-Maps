<?php
include 'database.php';

//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, "maps_test");

 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }


function searchFunc($data) {
    $sql = "SELECT top 50 * FROM buildingdata, roomdata, staff, staff_room, users....  "
    $result = mysqli_query($dbconnect, $sql);

    $data = array();

    $index = 0;
    while($row = mysqli_fetch_assoc($result)) {
    $data[$index] = $row;
    $index++;
    //echo to spit out onto a page as is or use the Json encode below
    }
    echo json_encode($data);     
        
}


//econdes as JSON Array



?>