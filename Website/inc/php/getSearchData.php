
<?php

include 'database.php';

//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, $dbname);

 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }


if($_SERVER["REQUEST_METHOD"] == "POST") {
    //POST = RECIEVING FROM FROM JS TO THEN BE APPLIED TO QUERY
    
    $data = $_POST['value']; //SEARCH VALUE FROM WEB PAGE
 
    $sql = "SELECT * FROM `buildingdata` 
    WHERE `BuildingID` LIKE '%$data%' 
    OR `BuildingName` LIKE '%$data%'
    OR `BuildingDescription` LIKE '%$data%'
    OR `SchoolHead` LIKE '%$data%'";
    
    $sql2 = "SELECT * FROM `roomdata` WHERE `RoomID` LIKE '%$data%' OR `BuildingID` LIKE '%$data%' OR `RoomType` LIKE '%$data%'";
    
    
    $sql3 = "SELECT * FROM `staff` WHERE 
`StaffID` LIKE '%$data%'
OR `StaffDepartment`LIKE '%$data%'
OR `StaffName`LIKE '%$data%'
OR `StaffDescription`LIKE '%$data%'
OR `StaffEmail` LIKE '%$data%'
OR `StaffRoomID`LIKE '%$data%'";
    
    // SELECT * FROM staff INNER JOIN roomdata ON staff.RoomID=roomdata.RoomID 
    
    
    $result = mysqli_query($dbconnect, $sql); //Building Data
    $result2 = mysqli_query($dbconnect, $sql2); //Room Data
    $result3 = mysqli_query($dbconnect, $sql3);  //Staff Data
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