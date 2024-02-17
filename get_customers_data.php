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

// Check if a specific customer ID is provided in the query parameters
if (isset($_GET['customerid'])) {
    $customerId = $_GET['customerid'];

    // Fetch data for the specific customer
    $sql = "SELECT * FROM `customers` WHERE `customerId` = $customerId;";
    $result = mysqli_query($conn, $sql);
    
    // Return JSON response with customer details
    if ($row = mysqli_fetch_assoc($result)) {
        header("Content-Type: application/json");
        echo json_encode($row);
    } else {
        // Customer not found
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["error" => "Customer not found"]);
    }
} 

else {
    // Fetch data for all customers
    $sql = "SELECT * FROM `customers`;";
    $result = mysqli_query($conn, $sql);

    // Loop through the results and populate the table
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>{$row['customerId']}</td>";
        echo "<td>{$row['fullName']}</td>";
        echo "<td>{$row['phone']}</td>";
        echo "<td>{$row['email']}</td>";
        echo "<td>";
        echo "<button class='edit-button' style='border-radius: 50px;' data-customer-id='{$row['customerId']}'><i class='fas fa-edit'></i></button>";
        echo "</td>";
        echo "</tr>";
    }
}


// Close the database connection
mysqli_close($conn);
?>
