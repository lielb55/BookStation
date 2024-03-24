<?php

require_once 'db_config.php';

// Check if a specific book ID is provided in the query parameters
if (isset($_GET['bookId'])) {
    $bookId = $_GET['bookId'];

    // Fetch data for the specific customer
    $sql = "SELECT * FROM `books` WHERE `bookId` = $bookId;";
    $result = mysqli_query($conn, $sql);
    
    // Return JSON response with customer details
    if ($row = mysqli_fetch_assoc($result)) {
        header("Content-Type: application/json");
        echo json_encode($row);
    } else {
        // Customer not found
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "book not found"]);
    }
}

// Check if a specific book title is provided in the query parameters
else if (isset($_GET['bookTitle'])) {
    $bookTitle = $_GET['bookTitle'];

    // Fetch data for the book with the provided title
    $sql = "SELECT * FROM `books` WHERE `title` = '$bookTitle';";
    $result = mysqli_query($conn, $sql);

    // Check if a book with the same title already exists
    if (mysqli_num_rows($result) > 0) {
        // Book with the same title already exists (bad scenario)
        header("HTTP/1.1 200 OK");
        echo json_encode(["error" => "Book with the same title already exists"]);
    } else {
        // No book with the same title found (good scenario)
        header("HTTP/1.1 200 OK");
        echo json_encode(["message" => "No book with the same title found"]);
    }
}

else {
    // Fetch data for all books
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
    echo "<td>{$row['max']}</td>";      // Quantity
    echo "<td>{$row['quantity']}</td>"; // Available for loan
    echo "<td>";
    echo "<button class='edit-button' style='border-radius: 50px;'data-book-id='{$row['bookId']}'><i class='fas fa-edit'></i></button>";
    echo "</td>";
    echo "</tr>";
    }
}

// Close the database connection
closeConnection($conn);
?>