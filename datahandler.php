<?php
include 'database.php';
// Fetch data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM sales";
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

        // Update the candleinventory table
        $sql = "UPDATE candleinventory SET amount = amount + $amount WHERE name = '$candle_type'";
        $conn->query($sql);

        // Commit the transaction
        $conn->commit();
    } catch (Exception $e) {
        // An exception has been thrown
        // We must rollback the transaction
        $conn->rollback();
    }
}

// Update a row
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"),$post_vars);
    $id = $post_vars['id'];
    $newAmount = $post_vars['newData'];
    
    // Start transaction
    $conn->begin_transaction();

    try {
        // Get the current amount and candle type from the sales table
        $sql = "SELECT amount, candle_type FROM sales WHERE id=$id";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $currentAmount = $row['amount'];
        $candle_type = $row['candle_type'];

        // Check if the new amount is negative
        if ($newAmount < 0) {
            throw new Exception('The new amount must not be negative');
        }

        // Update the sales table
        $sql = "UPDATE sales SET amount=$newAmount WHERE id=$id";
        $conn->query($sql);

        // Update the candleinventory table
        $difference = $currentAmount - $newAmount;
        $sql = "UPDATE candleinventory SET amount = amount + $difference WHERE name = '$candle_type'";
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
