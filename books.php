<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" />
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

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
                    
                    <!--Add book popup-->
                    <div class="popupContainer" id="AddContainer">
                        <div class="popupContent"> 
                            <div style="text-align: center;">
                                <h2>Add book</h2>

                                <div style="margin: auto; display: flex; justify-content: center; align-items: center;  padding: 2%">
                                    <div class="inputGroup" style="display: flex; align-items: center;">
                                        <input type="text" required="" autocomplete="off" placeholder="Full book name" id="bookName">

                                        <!--Button that sends the full book name and author of the book to the API-->
                                        <button id ='searchButton' class="actionButton">Search book</button>
                                    </div>
                                    </div>

                        <form id="bookForm" class= "container" style="display:flex;justify-content: space-evenly;align-items:center;">
                                <div id="bookSearchResultFormL" class="leftSide" style= "display: none;">
                                    <div class="">
                                        <label for="input" class="text">Author:</label>
                                        <input type="text" id="author" class="input" autocomplete="off">
                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Genre:</label>
                                        <input type="text" id="genre" class="input" autocomplete="off">
                                    </div>
                                </div>

                                <div id="bookSearchResultFormR" class="rightSide" style= "display: none;">
                                    <div class="">
                                        <label for="input" class="text">Publisher:</label>
                                        <input type="text" id="publisher" class="input" autocomplete="off">
                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Pages:</label>
                                        <input type="text" id="pages" class="input" autocomplete="off">
                                    </div>
                                </div>
                            </form>
                            </div>
                            
                            <div class ="buttonsSections" style="padding: 4%" >
                                <button class="pButton pButtonSubmit" id="submitButton" style= "display: none;">Submit</button>
                                <button class="pButton pButtonCancel" id="cancelAdd">Cancel</button>
                            </div>
                            
                            <div id="errorsDiv">
                                <p><span id="bookNameError" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="bookPagesError" class="error" style="display: block; text-align: center;"></span></p>
                            </div>
                            
                        </div>
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
                                <th>Edit Book</th>

                            </tr>
                        </thead>
                        <tbody>
                        <?php include 'get_books_data.php'; ?>
                        </tbody>
                    </table>
<<<<<<< HEAD
                    
                    
                    <!-- Edit book popup -->
                    <div id="EditBookContainer" class="popupContainer">

                        <div class="popupContent">
                            
                          <div id ="EditbookForm">
                            <h2 style="text-align: center; margin-bottom: 5%">Edit book details</h2> 
                                    
                            <form class= "container" style="display:flex;justify-content: space-evenly;align-items:center;">
                                <div class="leftSide">
                                    <div class="">
                                        <label for="input" class="text">Book Id:</label>
                                        <input type="text" id="editBookId" class="input" autocomplete="off" disabled>

                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Book Title:</label>
                                        <input type="email" id="editBookName" class="input" autocomplete="off">
                                    </div>
                                    
                                    <div class="">
                                        <label for="input" class="text">Author:</label>
                                        <input type="text" id="editAuthor" class="input" autocomplete="off">
                                    </div>
                                </div>

                                <div class="rightSide">
                                    <div class="">
                                        <label for="input" class="text">Genre:</label>
                                        <input type="text" id="editGenre" class="input" autocomplete="off">
                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Publisher:</label>
                                        <input type="email" id="editPublisher" class="input" autocomplete="off">
                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Pages:</label>
                                        <input type="email" id="editPages" class="input" autocomplete="off">
                                    </div>
                                </div>
                            </form>

                                </div>
                                <div class ="buttonsSections" style="padding: 4%" >
                                <button class="pButton pButtonCancel" id="CancelEdit">Cancel</button>
                                <button class="pButton pButtonSubmit" id="submitEdit">Update</button>
                                </div>
                                
                            <div id="errorsDivEdit">
                                <p><span id="bookNameErrorEdit" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="bookPagesErrorEdit" class="error" style="display: block; text-align: center;"></span></p>
=======
                    <!-- Confirmation Modal -->
                    <div id="deleteConfirmationPopup" class="modal">
                        <!--id="deleteConfirmationPopupContent"-->
                        <div class="modalContent popupContent">
                            <h2 style="margin-bottom: 5%">Confirm if you want to proceed with deleting this book?</h2>
                            <div style="display: inline-block;">
                                <button id="cancelDeleteButton" class="actionButton pButton pButtonCancel">Cancel</button>
                                <button id="confirmDeleteButton" class="actionButton pButton">Confirm</button>
>>>>>>> a433f838a2f7b69a83a33746d3be5bc6fd1172b9
                            </div>
                            
                            
                        </div>
                    </div>
                </main>
             </div>
</body>
<script type="text/javascript" src="JavaScripts/books_script.js"></script>


</html>