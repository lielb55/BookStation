<?php
// Establish a connection to your MySQL database
$server_name = "localhost";
$user_name = "lielbn_sysuser";
$password = "sysuser1234!@";
$database_name = "lielbn_libraryManage";

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$conn = new mysqli($server_name, $user_name, $password, $database_name);
mysqli_set_charset($conn, "utf8");

// check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//$response = []; // Initialize an array to hold the response data

if (isset($_GET['bookid'])) {
    // Get the book ID from the query parameters
    $bookId = $_GET['bookid'];

    // Perform the deletion of the book using the provided book ID
    $sql = "DELETE FROM books WHERE bookId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bookId); // Assuming book_id is an integer, adjust the "i" if it's a different type

    if ($stmt->execute()) {
        // Deletion successful
        $response = ["status" => "success", "message" => "Book deleted successfully"];
    } else {
        // Deletion failed
        $response = ["status" => "error", "message" => "Error deleting book"];
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // If book ID is not provided in the query parameters
    $response = ["status" => "error", "message" => "Book ID not provided"];
}

// Return JSON response
header("Content-Type: application/json");
echo json_encode($response);

// Close the database connection
$conn->close();
?>
