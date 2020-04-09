
<?php

include 'database.php';

//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, $dbname);

 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }


if($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST['id'];
 
    $sql = "SELECT * FROM `buildingdata` LEFT JOIN staff ON buildingdata.SchoolHead=staff.StaffID WHERE BuildingID LIKE '$data' ";
    $sql2 = "SELECT RoomID, RoomType FROM roomdata WHERE BuildingID LIKE '$data' ";
    

    
    $result = mysqli_query($dbconnect, $sql);
    $result2 = mysqli_query($dbconnect, $sql2);

    
    $dataRes = array();

    $index = 0;
    while($row = mysqli_fetch_assoc($result)) {
    $dataRes[$index] = $row;
    $index++;
    //echo to spit out onto a page as is or use the Json encode below
    }
    while($row = mysqli_fetch_assoc($result2)) {
    $dataRes[$index] = $row;
    $index++;
    }
    echo json_encode($dataRes);
        
}



?>