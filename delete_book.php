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

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



if (isset($_GET['bookId'])) {
    $bookId = $_GET['bookId'];

    // Prepare and execute a DELETE query to remove the diamond from the database
    $deleteQuery = "DELETE FROM books WHERE bookId = ?";
    $stmt = mysqli_prepare($conn, $deleteQuery);
    mysqli_stmt_bind_param($stmt, "i", $bookId);

    if (mysqli_stmt_execute($stmt)) {
        // Deletion was successful
        $response = ['success' => true];
    } else {
        // Deletion failed
        $response = ['success' => false, 'error' => mysqli_error($conn)];
    }

    // Close the prepared statement
    mysqli_stmt_close($stmt);
} else {
    // Invalid or missing diamond ID
    $response = ['success' => false, 'error' => 'Invalid or missing book ID'];
}



// if (isset($_GET['bookid'])) {
//     $bookId = $_GET['bookid'];

//     $sql = "DELETE FROM books WHERE bookId = ?";
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param("i", $bookId);

//     if ($stmt->execute()) {
//         // Deletion successful
//         $response = ["status" => "success", "message" => "Book deleted successfully"];
//     } else {
//         // Deletion failed
//         $response = ["status" => "error", "message" => "Error deleting book: " . $conn->error];
//         http_response_code(500); // Internal Server Error
//     }

//     $stmt->close();
// } else {
//     $response = ["status" => "error", "message" => "Book ID not provided"];
//     http_response_code(400); // Bad Request
// }

header("Content-Type: application/json");
echo json_encode($response);

mysqli_close($conn);
// $conn->close();
?>