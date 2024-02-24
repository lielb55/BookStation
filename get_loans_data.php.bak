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

// Check if a specific loan ID is provided in the query parameters
if (isset($_GET['loanId'])) {
    $loanId = $_GET['loanId'];

    // Fetch data for the specific loan
     $sql = "SELECT `bookLoans`.*, `customers`.fullName as customerName 
            FROM `bookLoans`
            JOIN `customers` ON `bookLoans`.customerIdF = `customers`.customerId
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
    $sql = "SELECT `bookLoans`.loanId, `bookLoans`.bookIdF, `customers`.fullName as customerName, `bookLoans`.loanStartDATE, `bookLoans`.loanEndDate
        FROM `bookLoans`
        JOIN `customers` ON `bookLoans`.customerIdF = `customers`.customerId;";

    $result = mysqli_query($conn, $sql);

    // Loop through the results and populate the table
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>{$row['loanId']}</td>";
        echo "<td>{$row['bookIdF']}</td>";
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
mysqli_close($conn);
?>
