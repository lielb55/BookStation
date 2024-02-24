<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loans</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">



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
                    <button class="navButton" onclick="window.location.href='customers.php';">Customers</button>                </nav>
            </div>

            <div class="col-lg-10">
                <main>
                    <div id="titleDiv"> <h1>Loans</h1> </div>
                        <button id="newLoanPopupButton"  class="actionButton"> <span> &#43; </span>New Loan </button>

                        <input id="customerNameInput" placeholder="Search by Customer Name" type="search" class="input searchInput" oninput="searchByNameFunction()">

                        
                        <div style="display: inline-block;">
                            <legend style="font-size:18px; padding-left: 6%;">Filter by loan status</legend>
                            <select id="availabilityDropdown" onchange="filterTable()" style="border-radius: 15px;margin: auto; padding: 15px 50px; border-style: solid; background-color: #E8DCD3;">
                                <option>Active</option>
                                <option>Not active</option>
                            </select>
                        </div>

                        <div class="popupContainer" id="loanContainer">
                            <div class="popupContent" style="text-align: center;">
                                <h2>Add loan</h2>


                                <div style="padding-top: 5%;">
                                    <label style="font-size:x-large;" for="bookIdNewLoan">Select a book:</label>
                                    <select name="bookIdNewLoan" id="bookIdNewLoan" class="custom-select">
                                        <option value="none">None</option>
                                        <?php include('books_dropdown.php'); ?>
                                    </select>
                                </div>
                                


                                <div style="padding-top: 5%;">
                                    <label style="font-size:x-large;" for="customerIdNewLoan">Select a customer:</label>
                                    <select name="customerIdNewLoan" id="customerIdNewLoan" class="custom-select">
                                        <option value="none">None</option>
                                        <?php include('customers_dropdown.php'); ?>
                                    </select>
                                </div>

                                <div class ="buttonsSections">
                                    <button class="pButton pButtonSubmit" id="submitLoanButton">Submit</button>
                                    <button class="pButton pButtonCancel" id="cancelLoan">Cancel</button>
                                </div>
                                
                            <div id="errorsDiv">
                                <p><span id="loanError" class="error" style="display: block; text-align: center;"></span></p>
                            </div>
                            
                            </div>
                        </div>

                        <div class="popupContainer" id="endLoanContainer">
                            <div class="popupContent" style="text-align: center;">
                                <h2>Return a book</h2>

                                <div style="padding-top: 5%;">
                                    <p id="bookIdEndLoan" class="EndLoanBookDetails"><label for="bookIdEndLoan">Book ID: </label><span id="displayBookId"></span></p>
                                </div>
                                
                                <div style="padding-top: 2%;">
                                    <p id="bookTitleEndLoan" class="EndLoanBookDetails"><label for="bookTitleEndLoan">Book Title: </label><span id="displayBookTitle"></span></p>
                                </div>

                                
                                <div style="padding-top: 2%;">
                                    <p id="customerIdEndLoan" class="EndLoanBookDetails"><label for="customerIdEndLoan">Customer ID: </label><span id="displayCustomerId"></span></p>
                                </div>
                                
                                <div style="padding-top: 2%;">
                                    <p id="customerNameEndLoan" class="EndLoanBookDetails"><label for="customerNameEndLoan">Customer Name: </label><span id="displayCustomerName"></span></p>
                                </div>

                                <div class ="buttonsSections">
                                    <button class="pButton pButtonSubmit" id="submitEndLoanButton">Return</button>
                                    <button class="pButton pButtonCancel" id="cancelEndLoan">Cancel</button>
                                </div>
                            </div>
                        </div>

                        <table id="loansTable">
                            <thead>
                                <tr>
                                    <th>Loan ID</th>
                                    <th>Book ID</th>
                                    <th>Book Title</th>
                                    <th>Customer Full Name</th>
                                    <th>Loan start date</th>
                                    <th>Loan end date</th>
                                    <th id="endLoanHeader">End loan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php include 'get_loans_data.php'; ?>
                            </tbody>
                        </table>
                        
            
                </main>
            </div>
        </div>   
    </div>  
</body>

<script type="text/javascript" src="JavaScripts/loans_script.js"></script>

</html>