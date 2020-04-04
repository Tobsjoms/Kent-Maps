
<?php

include 'database.php';

//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, $dbname);

 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }


if($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST['id'];
 
    $sql = "SELECT RoomID, RoomType FROM roomdata WHERE RoomID LIKE '$data' ";
    
    
    $result = mysqli_query($dbconnect, $sql);

    $dataRes = array();

    $index = 0;
    while($row = mysqli_fetch_assoc($result)) {
    $dataRes[$index] = $row;
    $index++;
    //echo to spit out onto a page as is or use the Json encode below
    }
    echo json_encode($dataRes);
        
}



?>