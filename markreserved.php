<?php
$conn = mysqli_connect("localhost", "root", "1", "appointment");

if (!$conn)
{
    die("Could not connect: " . mysqli_connect_error());
}

mysqli_query($conn, "UPDATE schedules SET availability = 0 WHERE roomnumber = " . $_GET["roomnum"] . " AND Datetime = '" . $_GET["date"] . " " . $_GET['time'] . "'");
?>