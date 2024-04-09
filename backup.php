<?php
require_once 'mysqldump-php-master/src/Ifsnop/Mysqldump/Mysqldump.php';

// Include 'database.php' at the top of the file
include 'database.php';

$backupDir = './backup/';
if (!file_exists($backupDir)) {
    mkdir($backupDir, 0777, true);
}

$backupFile = $backupDir . $dbname . '_' . date("Y-m-d") . '.sql';

try {
    $dumpSettings = array(
        'exclude-tables' => array('login') // Exclude the 'login' table
    );
    $dump = new Ifsnop\Mysqldump\Mysqldump("mysql:host=$servername;dbname=$dbname", $username, $password, $dumpSettings);
    $dump->start($backupFile);
} catch (\Exception $e) {
    $errorFile = $backupDir . 'error.txt';
    $errorMessage = date("Y-m-d H:i:s") . ' - mysqldump-php error: ' . $e->getMessage() . "\n";
    file_put_contents($errorFile, $errorMessage, FILE_APPEND);
}

$files = glob($backupDir . '*.sql');
if (count($files) > 30) {
    usort($files, function($a, $b) {
        return strtotime(substr($a, strlen($dbname) + 3, 10)) - strtotime(substr($b, strlen($dbname) + 3, 10));
    });
    unlink($files[0]);
}
?>
