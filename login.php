<?php
session_start(); // Start the session at the beginning of your PHP script
session_unset();
include 'database.php';

// Check if MySQL server is running
if ($conn->connect_error) {
    // Display alert for MySQL server connection error
    echo json_encode(['success' => false, 'message' => 'MySQL server is not active. Please start the server.', 'type' => 'error']);
    exit();
}

// Get username and password from the request
$username = sanitizeInput($_POST['username']);
$password = sanitizeInput($_POST['password']); // Sanitize the password
$password = md5($password); // Hash the sanitized password with MD5

// Prepare SQL statement
$sql = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

// Check if there is a match in the database
if ($result->num_rows > 0) {
    // Correct login
    $_SESSION['loggedin'] = true; // Set a session variable to indicate successful login
    echo json_encode(['success' => true, 'message' => 'Login successful', 'type' => 'success']);
} else {
    // Incorrect login
    echo json_encode(['success' => false, 'message' => 'Username or password is incorrect', 'type' => 'error']);
}

// Close connection
$conn->close();

// Function to sanitize input
function sanitizeInput($input) {
    // Implement your sanitization logic here
    return trim($input); // Example: trim whitespace
}
?>
