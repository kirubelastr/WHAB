<?php

include 'database.php';

// Get POST data and sanitize
$maxwax = filter_input(INPUT_POST, 'maxwax', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
$candleName = filter_input(INPUT_POST, 'candleName', FILTER_SANITIZE_STRING);
$quantity = filter_input(INPUT_POST, 'quantity', FILTER_SANITIZE_NUMBER_INT);

// Retrieve the amount for the given candle name from the candles table
$sql = "SELECT amount FROM candles WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $candleName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the amount
    $row = $result->fetch_assoc();
    $amount = $row['amount'];

    // Multiply this amount by the quantity
    $total = $amount * $quantity;

    // Check if maxwax is enough
    if ($maxwax < $total) {
        echo "Error: Not enough wax";
        $conn->close();
        exit();
    }

    // Subtract this total from maxwax
    $maxwax -= $total;

    // Distribute this total across the rows in the inventory table, starting from the oldest ones
    $sql = "SELECT * FROM inventory ORDER BY date ASC";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        if ($total <= 0) {
            break;
        }

        // Calculate the amount to subtract from this row
        $subtract = min($total, $row['total']);
        $total -= $subtract;

        // Update the total for this row
        $sql = "UPDATE inventory SET total = GREATEST(total - ?, 0) WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("di", $subtract, $row['id']);
        if ($stmt->execute() !== TRUE) {
            echo "Error updating inventory: " . $conn->error;
        }
    }

    // Insert into candleinventory
    $sql = "INSERT INTO candleinventory (name, amount) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $candleName, $quantity);
    if ($stmt->execute() === TRUE) {
        echo "Candle inventory recorded successfully. $candleName candle Total amount inserted: $quantity";
    } else {
        echo "Error recording candle inventory: " . $conn->error;
    }
} else {
    echo "Error: Candle not found";
}

// Close connection
$conn->close();

?>
