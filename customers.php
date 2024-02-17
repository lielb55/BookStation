<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customers</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" />

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
                    <div id="titleDiv"> <h1>All Customers</h1> </div>
                    <button id="AddCustomerPopupButton" class="actionButton"> <span> &#43; </span>Add Customer</button>

                    <div  style="display: inline-block;">
                        <input id="customerNameInput" placeholder="Search by Customer Name" type="search" class="input searchInput" oninput="searchByNameFunction()">
                      </div>

                    <!--Add customer popup-->
                    <div class="popupContainer" id="customerContainer">
                        <div class="popupContent" style="text-align: center;">
                        <h2>Add customer</h2>

                        <form class= "container" style="display:flex;justify-content: space-evenly;align-items:center;">
                                <div class="leftSide">
                                    <div class="">
                                        <label for="input" class="text">Customer Id:</label>
                                        <!--<input type="text" id="customerId" class="input" autocomplete="off">-->
                                        
                                        <input type="text" id="customerId" class="input" autocomplete="off" required pattern="\d+">
                                        <!-- Add a custom error message -->
                                        <!--<div class="invalid-feedback">Please enter a non-empty sequence of digits.</div>-->


                                    </div>
                                    <div class="">
                                        <label for="fullName" class="text">Full Name:</label>
                                        <input type="text" id="fullName" class="input" autocomplete="off">
                                    </div>
                                </div>

                                <div class="rightSide">
                                    <div class="">
                                        <label for="phoneNumber" class="text">Phone:</label>
                                        <input type="text" id="phoneNumber" class="input" autocomplete="off">
                                    </div>
                                    <div class="">
                                        <label for="email" class="text">Email:</label>
                                        <input type="email" id="email" class="input" autocomplete="off">
                                    </div>
                                </div>
                            </form>
                            <div class ="buttonsSections">
                                <button class="pButton pButtonCancel" id="cancelCust">Cancel</button>
                                <button class="pButton pButtonSubmit" id="submitCust">Submit</button>
                            </div>
                            
                            <div id="errorsDiv">
                                <p><span id="customerIdError" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="customerNameError" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="customerPhoneError" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="customerEmailError" class="error" style="display: block; text-align: center;"></span></p>
                            </div>
                        </div>
                    </div>
                    
                    <!--Edit customer popup-->
                    <div class="popupContainer" id="editCustomerContainer">
                            <div class="popupContent">

                                <div id ="BookForm">
                                    <h2 style="text-align: center; margin-bottom: 5%">Edit customer details</h2> 
                                    
                            <form class= "container" style="display:flex;justify-content: space-evenly;align-items:center;">
                                <div class="leftSide">
                                    <div class="">
                                        <label for="input" class="text">Customer Id:</label>
                                        <input type="text" id="editCustomerId" class="input" autocomplete="off" disabled>

                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Full Name:</label>
                                        <input type="email" id="editFullName" class="input" autocomplete="off">
                                    </div>
                                </div>

                                <div class="rightSide">
                                    <div class="">
                                        <label for="input" class="text">Phone:</label>
                                        <input type="text" id="editPhone" class="input" autocomplete="off">
                                    </div>
                                    <div class="">
                                        <label for="Email" class="text">Email:</label>
                                        <input type="email" id="editEmail" class="input" autocomplete="off">
                                    </div>
                                </div>
                            </form>

                                </div>
                                <div class ="buttonsSections" style="padding: 4%" >
                                <button class="pButton pButtonCancel" id="CancelEdit">Cancel</button>
                                <button class="pButton pButtonSubmit" id="submitEdit">Update</button>
                                </div>
                                
                            <div id="errorsDivEdit">
                                <p><span id="customerNameErrorEdit" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="customerPhoneErrorEdit" class="error" style="display: block; text-align: center;"></span></p>
                                <p><span id="customerEmailErrorEdit" class="error" style="display: block; text-align: center;"></span></p>
                            </div>
                        </div>
                    </div>


                    <table id="customerTable">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Edit Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                           <?php include 'get_customers_data.php'; ?>
                        </tbody>
                    </table>
                    
            
                </main>
            </div>   
</body>
<script type="text/javascript" src="JavaScripts/customers_script.js"></script>
</html>