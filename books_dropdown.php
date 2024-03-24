<?php
$server_name = "localhost";
$user_name = "lielbn_sysuser";
$password = "sysuser1234!@";
$database_name = "lielbn_libraryManage";

// Create connection
$conn = new mysqli($server_name, $user_name, $password, $database_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve customer data
$sql = "SELECT bookId, title FROM books WHERE quantity > '0'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $selectedCosCust = $_GET['selected_cos_cust']; // Get the selected_cos_cust from the URL parameter
    while ($row = $result->fetch_assoc()) {
        $bookId = $row["bookId"];
        $title = $row["title"];
        echo "<li data-bookinfo='$bookId'>$bookId - $title</li>";

    }
} else {
    echo "No book was found.";
}

// Close the database connection


$conn->close();
?>
