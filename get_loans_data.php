<?php

require_once 'db_config.php';

// Check if a specific loan ID is provided in the query parameters
if (isset($_GET['loanId'])) {
    $loanId = $_GET['loanId'];

    // Fetch data for the specific loan
     $sql = "SELECT `bookLoans`.*, `books`.title as bookTitle, `customers`.fullName as customerName 
            FROM `bookLoans`
            JOIN `customers` ON `bookLoans`.customerIdF = `customers`.customerId
            JOIN `books` ON `bookLoans`.bookIdF = `books`.bookId
            WHERE `loanId` = $loanId;";
    $result = mysqli_query($conn, $sql);

    // Return JSON response with loan details
    if ($row = mysqli_fetch_assoc($result)) {
        header("Content-Type: application/json");
        echo json_encode($row);
    } else {
        // Loan not found
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Loan not found"]);
    }
} else {
    // Fetch data for all loans
    $sql = "SELECT `bookLoans`.loanId, `bookLoans`.bookIdF, `books`.title as bookTitle, `customers`.fullName as customerName, `bookLoans`.loanStartDATE, `bookLoans`.loanEndDate
        FROM `bookLoans`
        JOIN `customers` ON `bookLoans`.customerIdF = `customers`.customerId 
        JOIN `books` ON `bookLoans`.bookIdF = `books`.bookId
        ORDER BY `bookLoans`.loanStartDATE DESC;";

    $result = mysqli_query($conn, $sql);

    // Loop through the results and populate the table
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>{$row['loanId']}</td>";
        echo "<td>{$row['bookIdF']}</td>";
        echo "<td>{$row['bookTitle']}</td>";
        echo "<td>{$row['customerName']}</td>";
        echo "<td>{$row['loanStartDATE']}</td>";
        echo "<td>{$row['loanEndDate']}</td>";
        echo "<td>";
        echo "<button class='endLoan-button' style='border-radius: 50px;' data-loan-id='{$row['loanId']}'><i class='fa fa-arrow-right'></i></button>";
        echo "</td>";
        echo "</tr>";
    }
}

// Close the database connection
closeConnection($conn);
?>