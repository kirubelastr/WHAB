<?php
include 'database.php';
// Fetch data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM sales ORDER BY id DESC ";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

// Delete a row
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    
    // Start transaction
    $conn->begin_transaction();

    try {
        // Get the amount and candle type from the sales table
        $sql = "SELECT amount, candle_type FROM sales WHERE id=$id";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $amount = $row['amount'];
        $candle_type = $row['candle_type'];

        // Delete the row from the sales table
        $sql = "DELETE FROM sales WHERE id=$id";
        $conn->query($sql);

        $sql = "SELECT id FROM candleinventory WHERE name = '$candle_type' ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $lastId = $row['id'];

        // Update the last matching row in the candleinventory table
        $sql = "UPDATE candleinventory SET amount = amount + $amount WHERE id = $lastId";
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
