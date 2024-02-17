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
$data = $_POST;

// Prepare and execute the SQL query to insert data into the 'customers' table
$sql = "INSERT INTO `customers` (`customerId`, `fullName`, `phone`, `email`) 
        VALUES ('{$data['customerId']}', '{$data['fullName']}', '{$data['phone']}', '{$data['email']}')";

// Execute the query and check for errors
if ($conn->query($sql) === FALSE) {
    echo '<h1 class="error-message">Cannot submit form. Error is: ' . $conn->error . '</h1>';
    exit();
} else {
    //echo '<h1 class="success-message">Form submitted successfully!</h1>';
    echo '<h1 class="success-message">Form submitted successfully! Data: Customer ID=' . $data['customerId'] . ', Full Name=' . $data['fullName'] . '</h1>';

}

// Close the database connection
mysqli_close($conn);
?>