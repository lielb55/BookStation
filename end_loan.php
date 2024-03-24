<?php

require_once 'db_config.php';

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if required data is present
if (isset($data['loanToEdit']) && isset($data['bookIdEnd'])) {
    $loanId = $data['loanToEdit'];
    $bookId = $data['bookIdEnd'];
    
    $currentDate = date('Y-m-d H:i:s'); // Get the current date and time in "YYYY-MM-DD HH:MM:SS" format

    // Prepare and execute the SQL query to update the customer record
    $sql = "UPDATE `bookLoans` SET `loanEndDate` = '$currentDate' WHERE `loanId` = $loanId;";
    $sql .= "UPDATE `books` SET `quantity` = `quantity` + 1 WHERE `bookId` = $bookId";

    if ($conn->multi_query($sql) === FALSE) {
        $response = ["status" => "error", "message" => "Error updating customer record: " . $conn->error];
    } else {
        $response = ["status" => "success", "message" => "loanId: $loanId, bookId: $bookId"];
    }
} else {
    $response = ["status" => "error", "message" => "Invalid data provided"];
}

// Return JSON response
header("Content-Type: application/json");
echo json_encode($response);

// Close the database connection
closeConnection($conn);
?>