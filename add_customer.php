<?php

// Get the DB credentials 
require_once 'db_config.php';

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Prepare and execute the SQL query to insert data into the 'customers' table '{$data['customerId']}'
$sql = "INSERT INTO `customers` (`customerId`, `fullName`, `phone`, `email`) 
        VALUES ('{$data['customerId']}', '{$data['fullName']}', '{$data['phone']}', '{$data['email']}')";

if ($conn->query($sql) === FALSE) {
    echo '<h1 class="error-message">Cannot submit form. Error is: ' . $conn->error . '</h1>';
    exit();
} else {
    echo '<h1 class="success-message">Form submitted successfully!</h1>';
}

// Close the database connection
closeConnection($conn);
?>