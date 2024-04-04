<?php
// Database connection
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from candleinventory table
$sql_candleinventory = "SELECT * FROM candleinventory";
$result_candleinventory = $conn->query($sql_candleinventory);
$rows_candleinventory = '';
if ($result_candleinventory->num_rows > 0) {
    while($row = $result_candleinventory->fetch_assoc()) {
        $rows_candleinventory .= '<tr><td>'.$row["id"].'</td><td>'.$row["name"].'</td><td>'.$row["amount"].'</td><td>'.$row["date"].'</td><td><button class="delete_btn" data-table="candleinventory" data-id="'.$row["id"].'">Delete</button></td></tr>';
    }
} else {
    $rows_candleinventory = '<tr><td colspan="5">No data found</td></tr>';
}

// Similarly fetch data from inventory and sales tables
// ...

// Prepare JSON response
$response = array(
    'candleinventory' => $rows_candleinventory,
    // Add data from other tables to this array
);

echo json_encode($response);

$conn->close();
?>
