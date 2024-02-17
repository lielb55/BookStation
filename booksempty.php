<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>
<body>
    <div class="container-fluid" >
        <div class="row" >
            <div class="col-lg-2">

                <div id="logoDiv"><img id="logo" src="images/logo.png" alt="logo"></div>
                <nav class="nav flex-column">
                    <button class="navButton" onclick="window.location.href='home.php';">Home</button>
                    <button class="navButton" onclick="window.location.href='books.php';">Books</button>
                    <button class="navButton" onclick="window.location.href='loans.php';">Loans</button>
                    <button class="navButton" onclick="window.location.href='customers.php';">Customers</button>
                </nav>
            </div>
			<?php echo "hello" ; ?>
			<div class="col-lg-10">
                <main>
                    <div id="titleDiv"><h1>All Books</h1></div>
                    <button id="AddBookPopupButton" class="actionButton"> <span> &#43; </span>Add Book</button>
                    
                    <div style="display: inline-block;">
                        <legend style="font-size:18px; padding-left: 9%;">Filter by availability</legend>
                        <select id="availabilityDropdown" oninput="filterTable()"  style="border-radius: 15px;margin: auto; padding: 15px 50px; border-style: solid; background-color: #E8DCD3;">
                            <option>Any</option>
                            <option>Available</option>
                            <option>Not available</option>
                        </select>
                    </div>
                    <table id="booksTable">
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Pages</th>
                                <th>Publisher</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php echo "hello" ; ?>
                        <?php include 'get_books_data.php'; ?>
                        </tbody>
                    </table>
                </main>
             </div>
		</div>
</body>
<script type="text/javascript" src="books_script.js"></script>

</html>