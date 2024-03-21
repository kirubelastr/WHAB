<?php

// Database configuration
$servername = "localhost"; // Change this to your database server name
$username = "username"; // Change this to your database username
$password = "password"; // Change this to your database password
$dbname = "database"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to add a record
function addRecord($product, $quantity) {
    global $conn;
    
    $sql = "INSERT INTO inventory (product, quantity) VALUES ('$product', $quantity)";
    
    if ($conn->query($sql) === TRUE) {
        return "Record added successfully";
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Function to update a record
function updateRecord($id, $quantity) {
    global $conn;
    
    $sql = "UPDATE inventory SET quantity=$quantity WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        return "Record updated successfully";
    } else {
        return "Error updating record: " . $conn->error;
    }
}

// Function to fetch all records
function getAllRecords() {
    global $conn;
    
    $sql = "SELECT id, product, quantity FROM inventory";
    $result = $conn->query($sql);
    
    $records = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
    }
    
    return $records;
}

// Example usage:

// Add a record
// echo addRecord("Candle A", 10);

// Update a record
// echo updateRecord(1, 15);

// Fetch all records
// $records = getAllRecords();
// print_r($records);

// Close connection
$conn->close();

?>
