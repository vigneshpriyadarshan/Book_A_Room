<?php
//Samur's work
// these are to establish connection with database.
/*$dbServerName = "localhost";
$dbUserName = "root";
$dbPassword = "";
$dbName = "loginsystem"; */
/*$date = date('m/d/Y h:i:s a', time()); calling the current date and time*/
//echo($_GET["roomnum"]);
//end of Samur's work

/*
$conn = new mysqli("root@localhost", $dbuser, $dbpass,$db);
/*/
$conn = mysqli_connect("localhost", "root", "1", "appointment");
//*/

if (!$conn)
{
    die("Could not connect: " . mysqli_connect_error());
}

//Sanity checking, because none of us want to learn about prepared statements
if (is_int($_GET["roomnum"])) {
    die("roomnum is not an integer");
}

//mysqli_select_db("appointment", $con);
$roomnumber = $_GET["roomnum"];
//$query = "SELECT Datetime, availability FROM schedules WHERE roomnumber = " . $roomnumber . " AND (Datetime = convert(varchar(10), getdate(), 102)) >= (NOW() = convert(varchar(10), getdate(), 102)) ORDER BY (Datetime = convert(varchar(10), getdate(), 102)) ASC LIMIT 7;";
$query = "SELECT Datetime, availability FROM schedules WHERE roomnumber = $roomnumber AND Datetime BETWEEN NOW() AND NOW() + INTERVAL 7 DAY ORDER BY Datetime ASC;";

$comments = mysqli_query($conn, $query);

while ($row = mysqli_fetch_row($comments)) {
/*
    $array = $row[0];
    echo (substr($array,0,10));
/*/
    echo(";" . join(",", $row));
//*/
}

//NOTE: whatever is printed is what is sent back to front end
//This statement below is debug
//print $_GET["roomnum"];


 //Need to connect to $db

 //$db = new mysqli("localhost", "_user_", "_password_", "_database_name_")

//  $stmt = $db->prepare("SELECT * FROM schedules where datetime = : roomnum");
//  echo($stmt) 

// link for sql date and time separation
// https://stackoverflow.com/questions/17678551/splitting-date-into-2-columns-date-time-in-sql


?>