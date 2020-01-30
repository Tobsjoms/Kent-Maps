
<?php

include 'database.php';

//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, $dbname);

 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }


if($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST['value'];
 
    $sql = "SELECT * FROM staff WHERE StaffRoomID LIKE '%$data%' ";
    $sql2 = "SELECT * FROM roomdata WHERE RoomID LIKE '%$data%' ";
    $sql3 = "SELECT * FROM staff WHERE StaffName LIKE '%$data%' ";
    
    // SELECT * FROM staff INNER JOIN roomdata ON staff.RoomID=roomdata.RoomID 
    
    
    $result = mysqli_query($dbconnect, $sql);
    $result2 = mysqli_query($dbconnect, $sql2);
    $result3 = mysqli_query($dbconnect, $sql3);
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
    
     while($row = mysqli_fetch_assoc($result3)) {
        $dataRes[$index] = $row;
        $index++;
    }
    echo json_encode($dataRes);
        
}



?>