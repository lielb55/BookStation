<?php

require_once 'db_config.php';

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if required data is present
if (isset($data['bookId']) && isset($data['title']) && isset($data['max'])) {
    $bookId = $data['bookId'];
    $title = $data['title'];
    $pages = $data['pages'];
	$author = $data['author'];
	$genre = $data['genre'];
	$publisher = $data['publisher'];
	$max = $data['max'];
	$quantity = $data['quantity'];

    // Prepare and execute the SQL query to update the book record
    $sql = "UPDATE `books` SET `title` = '$title', `pages` = '$pages', `author` = '$author', `genre` = '$genre', `publisher` = '$publisher', `max` = '$max', `quantity` = '$quantity'
    WHERE `bookId` = $bookId";

    if ($conn->query($sql) === FALSE) {
        $response = ["status" => "error", "message" => "Error updating book record: " . $conn->error];
    } else {
        $response = ["status" => "success", "message" => "Book record updated successfully"];
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