<?php
// Database configuration
$servername = "localhost"; // Change this to your database server name
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "whab"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch candle names from the database
$sql = "SELECT name FROM candles"; // Assuming 'candles' table has a column named 'name' for candle names
$result = $conn->query($sql);

$candles = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $candles[] = $row;
    }
}

// Close connection
$conn->close();

// Return candle names as JSON
echo json_encode($candles);
?>
