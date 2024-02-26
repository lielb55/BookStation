<?php
// Establish a connection to your MySQL database
$server_name = "localhost";
$user_name = "lielbn_sysuser";
$password = "sysuser1234!@";
$database_name = "lielbn_libraryManage";

$conn = new mysqli($server_name, $user_name, $password, $database_name);
mysqli_set_charset($conn, "utf8");

// check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if required data is present
if (isset($data['bookId']) && isset($data['title']) && isset($data['pages'])) {
    $bookId = $data['bookId'];
    $title = $data['title'];
    $pages = $data['pages'];
	$author = $data['author'];
	$genre = $data['genre'];
	$publisher = $data['publisher'];

    // Prepare and execute the SQL query to update the book record
    $sql = "UPDATE `books` SET `title` = '$title', `pages` = '$pages', `author` = '$author', `genre` = '$genre', `publisher` = '$publisher' WHERE `bookId` = $bookId";

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
mysqli_close($conn);
?>
