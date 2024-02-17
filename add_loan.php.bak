<?php

$server_name = "localhost";
$user_name = "lielbn_sysuser";
$password = "sysuser1234!@";
$database_name = "lielbn_libraryManage";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// create connection
$conn = new mysqli($server_name, $user_name, $password, $database_name);
mysqli_set_charset($conn, "utf8");

// check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

$currentDate = date('Y-m-d H:i:s'); // Get the current date and time in "YYYY-MM-DD HH:MM:SS" format

// Prepare and execute the SQL query to insert data into the 'bookLoans' table
$sql = "INSERT INTO `bookLoans` (`loanId`, `bookIdF`, `customerIdF`, `loanStartDATE`, `loanEndDate`) 
        VALUES (NULL, '{$data['bookId']}', '{$data['customerId']}', '$currentDate', NULL);";
$sql .= "UPDATE `books` SET `loadStatus` = 'not available' WHERE `bookId` = '{$data['bookId']}'";

if ($conn->multi_query($sql) === FALSE) {
    $response = ["error" => "Error inserting data: " . $conn->error];
} else {
    $response = ["success" => "Form submitted successfully!"];
}

    
// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>