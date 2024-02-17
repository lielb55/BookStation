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
if (isset($data['customerId']) && isset($data['fullName']) && isset($data['phone']) && isset($data['email'])) {
    $customerId = $data['customerId'];
    $fullName = $data['fullName'];
    $phone = $data['phone'];
    $email = $data['email'];

    // Prepare and execute the SQL query to update the customer record
    $sql = "UPDATE `customers` SET `fullName` = '$fullName', `phone` = '$phone', `email` = '$email' WHERE `customerId` = $customerId";

    if ($conn->query($sql) === FALSE) {
        $response = ["status" => "error", "message" => "Error updating customer record: " . $conn->error];
    } else {
        $response = ["status" => "success", "message" => "Customer record updated successfully"];
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
