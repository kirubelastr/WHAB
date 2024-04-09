<?php
session_start(); // Start the session

if (isset($_SESSION['loggedin'])) {
  echo 'logged_in';
} else {
  echo 'not_logged_in';
}
?>
