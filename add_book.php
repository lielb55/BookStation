<?php
$server_name = "localhost";
$user_name = "lielbn_sysuser";
$password = "sysuser1234!@";
$database_name = "lielbn_libraryManage";

// create connection
$conn = new mysqli($server_name, $user_name, $password, $database_name);
mysqli_set_charset($conn, "utf8");

// check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Prepare and execute the SQL query to insert data into the 'books' table
$sql = "INSERT INTO `books` (`bookId`, `title`, `author`, `genre`, `pages`, `publisher`, `loadStatus`) 
        VALUES (NULL, '{$data['title']}', '{$data['author']}', '{$data['genre']}', '{$data['pages']}', '{$data['publisher']}', 'available')";



// $sql = "insert into workShops (name, age, phone, mail, amount, date, combi, kosher,veggy, notes, dishes)
        // VALUES ('$name', '$age', '$phone', '$mail', '$amount', '$date', '$combi', '$kosher', '$veggy', '$notes', '$dishes')";

if ($conn->query($sql) === FALSE) {
    echo '<h1 class="error-message">Cannot submit form. Error is: ' . $conn->error . '</h1>';
    exit();
} else {
    echo '<h1 class="success-message">Form submitted successfully!</h1>';
}
?>