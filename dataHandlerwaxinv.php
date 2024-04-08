<?php
include 'database.php';

// Fetch data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM inventory ORDER BY id DESC ";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

// Delete a row
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    
    // Start transaction
    $conn->begin_transaction();

    try {
        // Delete the row from the inventory table
        $sql = "DELETE FROM inventory WHERE id=$id";
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
