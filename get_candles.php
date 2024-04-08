<?php
// Database configuration
include 'database.php';
// Fetch candle names and their total amounts from the database
$stmt = $conn->prepare("SELECT name, SUM(amount) as total_amount FROM candleinventory GROUP BY name");
$stmt->execute();
$result = $stmt->get_result();

$candles = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $candles[$row['name']] = $row['total_amount'];
    }
}

// Close connection
$stmt->close();
$conn->close();

// Return candle names and their total amounts as JSON
echo json_encode($candles);
?>
