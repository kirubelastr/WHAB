<?php
include 'database.php';
// Fetch data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM candleinventory ORDER BY id DESC ";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
// Delete a row
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    
    // Start transaction
    $conn->begin_transaction();

    try {
        // Get the amount and candle type from the candleinventory table
        $sql = "SELECT amount, name FROM candleinventory WHERE id=$id";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $amount = $row['amount'];
        $candle_type = $row['name'];

        // Delete the row from the candleinventory table
        $sql = "DELETE FROM candleinventory WHERE id=$id";
        $conn->query($sql);

        // Get the amount corresponding to the candle name in the candles table
        $sql = "SELECT amount FROM candles WHERE name = '$candle_type'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $candle_amount = $row['amount'];

        // Calculate the total
        $total = $amount * $candle_amount;

        // Get the last row of total in the inventory table
        $sql = "SELECT id FROM inventory ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $lastId = $row['id'];

        // Update the last row of total in the inventory table
        $sql = "UPDATE inventory SET total = total + $total WHERE id = $lastId";
        $conn->query($sql);

        // Commit the transaction
        $conn->commit();
    } catch (Exception $e) {
        // An exception has been thrown
        // We must rollback the transaction
        $conn->rollback();
    }
}


$conn->close();
?>
