<?php
header('Content-Type: application/json');
include 'database.php';

$sql = "SELECT name, SUM(amount) as total_amount FROM candleinventory GROUP BY name";
$result = $conn->query($sql);

$candles = [];
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $candles[] = $row;
  }
}
$sql = "SELECT SUM(total) as total_wax FROM inventory WHERE discription = 'waxandoil'";
$result = $conn->query($sql);

$total_wax = 0;
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $total_wax = $row['total_wax'];
  }
}


echo json_encode(['candles' => $candles, 'total_wax' => $total_wax]);

$conn->close();
?>
