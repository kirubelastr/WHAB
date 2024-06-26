<?php
include 'database.php';
// Check if request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get POST data
  $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_STRING);
  $bagNumber = filter_input(INPUT_POST, 'bagNumber', FILTER_VALIDATE_INT);
  $weight = filter_input(INPUT_POST, 'weight', FILTER_VALIDATE_FLOAT);
  $total = filter_input(INPUT_POST, 'total', FILTER_VALIDATE_FLOAT);
  $place = filter_input(INPUT_POST, 'place', FILTER_SANITIZE_STRING);
  $remark = filter_input(INPUT_POST, 'remark', FILTER_SANITIZE_STRING);

  // Check if inputs are of correct type
  if ($bagNumber === false || $weight === false || $total === false) {
    echo 'Invalid input. Please enter a number for bag number, weight, and total.';
    exit;
  }
  // Start transaction
  $conn->begin_transaction();

  try {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO inventory (discription, bag_number, weight, total, place, remark, date) VALUES (?, ?, ?, ?, ?, ?, CURDATE())");
    $stmt->bind_param("siidss", $description, $bagNumber, $weight, $total, $place, $remark);

    // Execute query
    if ($stmt->execute()) {
      // Get the last inserted ID and the current date
      $id = $conn->insert_id;
      $date = date('Y-m-d');
      // Return the inserted data as a JSON object
      echo json_encode(array('id' => $id, 'description' => $description, 'bagNumber' => $bagNumber, 'weight' => $weight, 'total' => $total, 'place' => $place, 'remark' => $remark, 'date' => $date));
    } else {
      throw new Exception("Error: " . $stmt->error);
    }

    // Commit the transaction
    $conn->commit();
  } catch (Exception $e) {
    // An error occurred; rollback the transaction
    $conn->rollback();
    echo $e->getMessage();
  }

  // Close connection
  $stmt->close();
  
} else {
  echo "Invalid request";
}
$conn->close();
?>
