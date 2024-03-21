<?php

// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "whab";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$candleName = $_POST['candleName'];
$quantity = $_POST['quantity'];

// Fetch candle details from the database
$sql = "SELECT id, amount FROM candles WHERE name='$candleName'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $candleId = $row['id'];
    $candleAmount = $row['amount'];
    
    // Calculate total
    $total = $candleAmount * $quantity;

    // Insert sale record into the database
    $sql = "INSERT INTO sales (date, candle_type, amount, total) VALUES (CURDATE(), '$candleName', $quantity, $total)";

    if ($conn->query($sql) === TRUE) {
        echo "Sale recorded successfully. Total amount: $total";
    } else {
        echo "Error recording sale: " . $conn->error;
    }
} else {
    echo "Candle not found in the database.";
}

// Close connection
$conn->close();

?>
