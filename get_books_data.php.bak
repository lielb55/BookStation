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

// Fetch data from the database
$sql = "SELECT * FROM `books`;";
$result = mysqli_query($conn, $sql);

// Loop through the results and populate the table
while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr class='" . strtolower($row['loadStatus']) . "'>"; // Add class based on availability status
    echo "<td>{$row['bookId']}</td>";
    echo "<td>{$row['title']}</td>";
    echo "<td>{$row['author']}</td>";
    echo "<td>{$row['genre']}</td>";
    echo "<td>{$row['pages']}</td>";
    echo "<td>{$row['publisher']}</td>";
    echo "<td>{$row['loadStatus']}</td>";
    echo "<td>";
    echo "<button class='delete-button' style='border-radius: 50px;'data-book-id='{$row['bookId']}'><i class='fas fa-trash'></i></button>";
    echo "</td>";
    echo "</tr>";
}


// Close the database connection
mysqli_close($conn);
?>
