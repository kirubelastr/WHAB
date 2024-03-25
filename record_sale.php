<?php

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "whab";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$candleName = filter_input(INPUT_POST, 'candleName', FILTER_SANITIZE_STRING);
$quantity = filter_input(INPUT_POST, 'quantity', FILTER_SANITIZE_NUMBER_INT);
$saleplace = filter_input(INPUT_POST, 'saleplace', FILTER_SANITIZE_STRING);
// Start transaction
$conn->begin_transaction();

try {
    // Fetch candle details from the database
    $sql = "SELECT id, amount FROM candleinventory WHERE name=? ORDER BY date ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $candleName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Loop through each row
        while($row = $result->fetch_assoc()) {
            if ($quantity <= 0) {
                break;
            }

            if ($row['amount'] >= $quantity) {
                // Update the row amount
                $newAmount = $row['amount'] - $quantity;
                $updateSql = "UPDATE candleinventory SET amount=? WHERE id=?";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bind_param("ii", $newAmount, $row['id']);
                $updateStmt->execute();
                $quantity = 0;
            } else {
                // Subtract the row amount from the quantity
                $quantity -= $row['amount'];
                // Set the row amount to 0
                $updateSql = "UPDATE candleinventory SET amount=0 WHERE id=?";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bind_param("i", $row['id']);
                $updateStmt->execute();
            }
        }

        if ($quantity > 0) {
            throw new Exception("Not enough candles in the inventory.");
        } else {
            // Insert the sale into the sales table
            $insertSql = "INSERT INTO sales (candle_type, amount, place) VALUES (?, ?, ?)";
            $insertStmt = $conn->prepare($insertSql);
            $insertStmt->bind_param("sis", $candleName, $quantity, $saleplace);
            if ($insertStmt->execute() !== TRUE) {
                throw new Exception("Error recording sale: " . $conn->error);
            }
        }
    } else {
        throw new Exception("Candle not found in the database.");
    }

    // Commit the transaction
    $conn->commit();
    echo "Sale recorded successfully.";
} catch (Exception $e) {
    // An error occurred; rollback the transaction
    $conn->rollback();
    echo $e->getMessage();
}

// Close connection
$conn->close();

?>
