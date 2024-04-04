<?php
include 'database.php';

$sql = "SELECT c.name as candle_type, IFNULL(SUM(s.amount), 0) as total_amount 
        FROM candles c 
        LEFT JOIN sales s ON c.name = s.candle_type
        GROUP BY c.name";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
} else {
  $data = array("message" => "No sales data available.");
}
echo json_encode($data);

$conn->close();
?>
