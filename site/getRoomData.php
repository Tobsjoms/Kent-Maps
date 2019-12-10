My Drive

<?php
//database credentials
$dbusername = "";
$dbpassword = "";
$server = "127.0.0.1"; //local host

//connect to db
$dbconnect = new mysqli($server, $dbusername, $dbpassword, "databaseName");

 if (!$dbconnect) {
     die("connection failed" . mysqli_connect_error());
 }

$sql = "SELECT * FROM DATABASENAME";

$result = mysqli_query($dbconnect, $sql);

$data = array();

$index = 0;
while($row = mysqli_fetch_assoc($result)) {
    $data[$index] = $row;
    $index++;
}


echo json_encode($data);



?>