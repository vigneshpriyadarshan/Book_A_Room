<?php
$conn = mysqli_connect("localhost", "root", "1", "appointment");

if (!$conn)
{
    die("Could not connect: " . mysqli_connect_error());
}

//Later, we can try to check if dates are already present in table
for ($days = 0; $days < 10; $days++) {
    for ($hours = 0; $hours < 24; $hours++) {
        $rooms = array(1, 2, 3, 4);
        foreach ($rooms as $room) {
            mysqli_query($conn, "INSERT INTO schedules VALUES ($room, ADDDATE(CURDATE(), INTERVAL '" . $days . " " . $hours . "' DAY_HOUR), 1)");
        }
    }
}
?>