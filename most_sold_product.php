<?php
include 'database.php';

$sql = "SELECT candle_type, SUM(amount) as total_amount FROM sales WHERE MONTH(date) = MONTH(CURRENT_DATE()) AND YEAR(date) = YEAR(CURRENT_DATE()) GROUP BY candle_type";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
} else {
  echo "No sales data for this month.";
}
echo json_encode($data);

$conn->close();
?>