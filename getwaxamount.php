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

// Initialize total sum
$total_sum = 0;

// Fetch total from the inventory table and sum them up
$sql = "SELECT SUM(total) as total_sum FROM inventory";
if ($result = $conn->query($sql)) {
    if ($row = $result->fetch_assoc()) {
        $total_sum = $row['total_sum'];
    }
    $result->free();
} else {
    echo "Error: " . $conn->error;
}

// Fetch all rows from the candles table
$sql = "SELECT * FROM candles";
$candleseach = array();
if ($result = $conn->query($sql)) {
    while ($row = $result->fetch_assoc()) {
        // Calculate the maximum number of this type of candle that can be produced
        $max_producible = floor($total_sum / $row['amount']);
        $row['max_producible_cartons'] = floor($max_producible / 30);
        $row['max_producible_pieces'] = $max_producible % 30;
        $candleseach[] = $row;
    }
    $result->free();
} else {
    echo "Error: " . $conn->error;
}

// Close connection
$conn->close();

// Return total sum and candle details as JSON
echo json_encode(array('total_sum' => $total_sum, 'candleseach' => $candleseach));

?>
