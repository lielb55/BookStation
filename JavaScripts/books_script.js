const editBookPopup = document.getElementById('EditBookContainer');
const submitEdit = document.getElementById('submitEdit');
const cancelEdit = document.getElementById('CancelEdit');
const cancelAdd = document.getElementById('cancelAdd');
const popupAddButton = document.getElementById('AddBookPopupButton');
const popupAddContainer = document.getElementById('AddContainer');
const submitButton = document.getElementById('submitButton');
const bookSearchResultFormL = document.getElementById('bookSearchResultFormL');
const bookSearchResultFormR = document.getElementById('bookSearchResultFormR');

// Get the edit button elements with a class
const editButtons = document.querySelectorAll('.edit-button');

// Define variables for snackbar message and flag for handling exceptions
let msg;
let isSuccess = false;

// Add click event listeners to all edit buttons
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bookId = button.getAttribute('data-book-id');
        openEditBookPopup(bookId);
    });
});

// Check if Book Exist in DB
async function CheckIfBooksExist(fullBookName) {
    // // Get the value of the book title

    // Define the data object for the request
    const data = {
        title: fullBookName
    };
    msg= "Server error. Please try again later."
    let isExist = false;
    try {
        // Configure the request to check book existence
        const existResponse = await fetch(`get_books_data.php?bookTitle=${encodeURIComponent(fullBookName)}`);

        if (existResponse.ok) {
            // Parse the response JSON
            const existData = await existResponse.json();

            // Check if the book already exists
            if (existData.error) {
                // Book already exists, show alert and exit
                showSnackbar("add", "Book already exists!", false);
                isExist = true;
                
            } 
        } else {
            // Failed to check book existence, show error message
            showSnackbar("add", msg, false);
        }
    } catch (error) {
        showSnackbar("add", msg, false);
    }
    return isExist;
};

// Function to display snackbar
function showSnackbar(popup, message, isSuccess) {
    var snackbarBooks;
    if (popup == "main"){
        snackbarBooks = document.getElementById("snackbarBooks");
    }else if (popup == "edit"){
        snackbarBooks = document.getElementById("snackbarBookEdit");
    }else if (popup == "add"){
        snackbarBooks = document.getElementById("snackbarBookAdd");
    }

    snackbarBooks.textContent = message;
    
    // Remove the hidden class initially
    snackbarBooks.classList.remove("snackbarHidden");

    // Add the show class to make it visible
    snackbarBooks.classList.add("snackbarShow");

    // After a delay, remove the show class to trigger the fade-out animation
    setTimeout(function() {
        snackbarBooks.classList.remove("snackbarShow");
        // Add back the hidden class after the fade-out animation is complete
        snackbarBooks.classList.add("snackbarHidden");
    }, 2000); // Adjust the delay time (in milliseconds) as needed

    // Set background color for error messages
    if (!isSuccess) {
        snackbarBooks.style.backgroundColor = '#BD5666';
    } else{
        snackbarBooks.style.backgroundColor = '#C3CDB4';
    }
}


//**** ADD book section **** 

// Function to reset ADD popup fields
function resetAddPopup(){
    bookSearchResultFormR.style.display = 'none';
    bookSearchResultFormL.style.display = 'none';
    submitButton.style.display = 'none';
    document.getElementById("bookName").value ='';
    searchButton.disabled = false;
    
    document.getElementById('bookNameError').textContent = '';
    document.getElementById('bookPagesError').textContent = '';
    document.getElementById('bookQuantityError').textContent = '';
    document.getElementById('maxQuantity').value = 1;

    // Make sure search snackbar is hidden
    snackbarBooks.classList.add("snackbarHidden");
}


// Cancel ADD event listener
cancelAdd.addEventListener('click', () => {
    popupAddContainer.style.display = 'none';
    resetAddPopup();
});


// define global parameters for the post request
const $searchButton = $('#searchButton'); 
const $bookName = $('#bookName');
const $bookAuthor = $('#author');
const $bookGenre = $('#genre');
const $bookPublisher = $('#publisher');
const $bookPages = $('#pages');
const $maxQuantity = $('#maxQuantity');


// Opens add new book popup
popupAddButton.addEventListener('click', () => {
    popupAddContainer.style.display = 'block';
});


// Add event listener to the search button - ADD popup
$searchButton.click(function() {
    // Get the value from the input field
    const fullBookName = document.getElementById("bookName").value; //Should be changed fullBookNameInput.value;

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // Define the PHP script URL with the query parameter
    const phpScriptURL = `get_book_API.php`;

    // Configure the request
    xhr.open('POST', phpScriptURL, true);

    // Set up a callback function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            // The request was successful, and you can handle the response here
            const response = JSON.parse(xhr.responseText);
            if (response.Title !== "") {
                // Fill the Author field with the data from the response
                $bookAuthor.val(response.Author);
                $bookGenre.val(response.Genre).prop;
                $bookPublisher.val(response.Publisher);
                $bookPages.val(response.Height).prop;

                bookSearchResultFormR.style.display = "block";
                bookSearchResultFormL.style.display = "block";
                submitButton.style.display = "block";
                document.getElementById('submitButton').disabled = false; // Enable the submit button
                submitButton.disabled = false;
                document.getElementById('submitButton').style.backgroundColor = '#C3CDB4'; // Remove the greyed-out style
            } else {
                showSnackbar("add", "No book was found!", false);
            }
        } else {
            // Handle the request error
            console.error('Error: ' + xhr.status);
        }
    };
    // Send the request
    xhr.send(JSON.stringify({ Title: fullBookName }));

    // Attach the validateForm function to the form submission event
    const bookForm = document.querySelector('#bookForm');
    bookForm.addEventListener('submit', function(event) {
        if (!validateBookForm()) {
            event.preventDefault(); // Prevent form submission if there are errors
        }
    });
});


// ADD book - is beeen called form submitButton event listener
async function addNewBook() {
    var data = {
        title: $bookName.val(),
        author: $bookAuthor.val(),
        genre: $bookGenre.val(),
        publisher: $bookPublisher.val(),
        pages: $bookPages.val(),
        max: $maxQuantity.val()
    };

    // Define variables to hold snackbar message and success status
    isSuccess = false;

    try {
        // Make an AJAX call to the server
        const response = await fetch('add_book.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Set success message and flag
            msg = "Book added successfully.";
            isSuccess = true;
            
            // Reload the page after 1000 milliseconds
            setTimeout(function() {
            location.reload();
        }, 1000);
    
        } else {
            // Set error message and flag based on response status
            msg = "Server error. Please try again later.";
        }
    } catch (error) {
        msg = "Unexpected error.";
    }
    // Show the snackbar message
    showSnackbar("main", msg, isSuccess);
    // Close the popup after 300 milliseconds
    setTimeout(function() {
        popupAddContainer.style.display = "none";
        resetAddPopup();
    }, 300);
};


// Add event listener to the submit button - ADD popup
document.getElementById('submitButton').addEventListener('click', async function () {
    const fullBookName = document.getElementById("bookName").value.trim();
    const isExist = await CheckIfBooksExist(fullBookName); // Wait for the result of CheckIfBooksExist
    if (!isExist){
        addNewBook();
    }
});


// ** Validation for ADD book popup **
validationBookName = true;
validationBookMaxQauntity = true;

// Function to validate book name field - ADD popup
function validateBookName() {
    const bookNameInput = document.getElementById('bookName');
    const bookNameError = document.getElementById('bookNameError');
    const bookName = bookNameInput.value.trim();

    // Check if book name field is empty
    if (bookName.length === 0) {
        bookNameError.textContent = 'Book title cannot be empty.';
        document.getElementById('submitButton').disabled = true; // Disable the submit button
        document.getElementById('submitButton').style.backgroundColor = '#cccccc'; // Grey out the submit button
        validationBookName = false;
    } else {
        bookNameError.textContent = ''; // Remove the error message
        validationBookName = true;
        if (validationBookName && validationBookMaxQauntity){
        // if (validationBookName){
            document.getElementById('submitButton').disabled = false; // Enable the submit button
            document.getElementById('submitButton').style.backgroundColor = '#C3CDB4'; // Remove the greyed-out style
        }
    }
}

// Attach event listener to the book name field to trigger validation on blur - ADD popup
document.getElementById('bookName').addEventListener('blur', validateBookName);

// Function to validate max quantity - ADD popup
function validateBookMaxQuantityAdd() {
    const bookNewMaxQuantity = document.getElementById('maxQuantity');
    const bookQuantityError = document.getElementById('bookQuantityError');
    const bookNewMaxQuantityValue = bookNewMaxQuantity.value;
    const bookNewMaxQuantityValueTrim = bookNewMaxQuantityValue.trim();
    const newMaxQuantity = parseInt(bookNewMaxQuantityValue, 10);

    // Check if book new max quantity field is empty
    if (bookNewMaxQuantityValueTrim.length === 0) {
        validationBookMaxQauntity = false;
        bookQuantityError.textContent = 'Book quantity cannot be empty.';
        document.getElementById('submitButton').disabled = true; // Disable the submit button
        document.getElementById('submitButton').style.backgroundColor = '#cccccc'; // Grey out the submit button
    // Check if book new max quantity field is negative number
    } else if (newMaxQuantity < 0){
        validationBookMaxQauntity = false;
        bookQuantityError.textContent = 'Book quantity cannot be negative number.';
        document.getElementById('submitButton').disabled = true; // Disable the submit button
        document.getElementById('submitButton').style.backgroundColor = '#cccccc'; // Grey out the submit button
    } else {
        bookQuantityError.textContent = ''; // Remove the error message
        validationBookMaxQauntity = true;

        if (validationBookName && validationBookMaxQauntity){
            document.getElementById('submitButton').disabled = false; // Enable the submit button
            document.getElementById('submitButton').style.backgroundColor = '#C3CDB4'; // Remove the greyed-out style
        }
    }
}

// Attach event listener to the book max quantity field to trigger validation on blur - ADD popup
document.getElementById('maxQuantity').addEventListener('blur', validateBookMaxQuantityAdd);


//**** EDIT book section **** 
var currentMaxQuantity;
var currentQuantity;
var currentTitle;

// Function to open the EDIT Book Popup
function openEditBookPopup(bookId) {
    bookIdToEdit = bookId;
    editBookPopup.style.display = 'block';
    
    document.getElementById('submitEdit').disabled = false; // Enable the submit button
    document.getElementById('submitEdit').style.backgroundColor = '#C3CDB4'; // Remove the greyed-out style
    
     fetch(`get_books_data.php?bookId=${bookId}`)
        .then(response => response.json())
        .then(data => {
            // Check if book details were retrieved successfully
            if (data.error) {
                console.error("Error fetching book details:", data.error);
                return;
            }
            // Populate edit popup fields with book details that we received from response.json from get_books_data
            document.getElementById('editBookId').value = bookId;
            document.getElementById('editBookName').value = data.title;
            document.getElementById('editAuthor').value = data.author;
            document.getElementById('editGenre').value = data.genre;
            document.getElementById('editPublisher').value = data.publisher;
            document.getElementById('editPages').value = data.pages;
            document.getElementById('editMaxQuantity').value = data.max;
            document.getElementById('editQuantity').value = data.quantity;
            currentMaxQuantity = data.max;   // var for the currentMaxQuantity that received from the server, once the popup was open
            currentQuantity = data.quantity; // var for the currentQuantity that received from the server, once the popup was open
            currentTitle = data.title;       // var for the currentTitle that received from the server, once the popup was open (to know what was the value before the customer edit it)
        })
        .catch(error => console.error("Error fetching book details:", error));
}


// Submit EDIT book event listener
submitEdit.addEventListener('click', async function() {
    var title = document.getElementById('editBookName').value;  // get the updated title
    
    if (currentTitle.toUpperCase().trim() == title.toUpperCase().trim()){ // check if the updated title is the same as the title that was before- when the popup was opened
        editBook();  // if its the same title, means the title wasnt changed and we can send the book for edit function
    }else{
        const isExist = await CheckIfBooksExist(title.trim()); // Wait for the result of CheckIfBooksExist
        if (!isExist){  // the new title doesnt exist so we can send the book for edit
            editBook();
        } else{
            showSnackbar("edit", "Book already exists!", false);  // this title already exist, we cant use this name so the user should change it and cant continue for editing
        }
    }
});


// EDIT book - is been called frm submitButton event listener
async function editBook() {
    // Get values from input fields
    var bookId = document.getElementById('editBookId').value; 
    var title = document.getElementById('editBookName').value;
    var pages = document.getElementById('editPages').value;
    var author = document.getElementById('editAuthor').value;
    var genre = document.getElementById('editGenre').value;
    var publisher = document.getElementById('editPublisher').value;
    var max = document.getElementById('editMaxQuantity').value;
    var quantity = document.getElementById('editQuantity').value;

    // Create an object with the data
    var data = {
        bookId: bookId,
        title: title,
        pages: pages,
        author: author,
        genre: genre,
        publisher: publisher,
        max: max,
        quantity: quantity
    };

    // assign variables for snackbar message
    isSuccess = false;

    // Try part from the fetch operation
    try{
        // Make an AJAX call to the server
        const response = await fetch('update_book.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Set success message and flag
            msg = "Book updated successfully.";
            isSuccess = true;
            
            // Reload the page after 1000 milliseconds
            setTimeout(function() {
            // Reload the page after the API call is completed
            location.reload();
        }, 1000);
        } else {
            // Set error message and flag based on response status
            msg = "Server error. Please try again later.";
        }
    } catch (error) {
        // Set error message and flag
        msg = "Unexpected error.";
        resetEditPopup();
    }
    // Show the snackbar message
    showSnackbar("main", msg, isSuccess);

    // Close the popup after 300 milliseconds
    setTimeout(function() {
        editBookPopup.style.display = "none";
        resetEditPopup();
    }, 300);
};


// Function to reset EDIT popup errors (no need to reset the fields here)
function resetEditPopup(){
    document.getElementById('bookNameErrorEdit').textContent = '';
    document.getElementById('bookPagesErrorEdit').textContent = '';
    document.getElementById('bookQuantityErrorEdit').textContent = '';
}


// cancel EDIT book event listener
cancelEdit.addEventListener('click', () => {
    // Close the EditBookPopup if the user clicks "Cancel"
    editBookPopup.style.display = 'none';
    resetEditPopup();
});


// ** Validation for EDIT book popup **
validationBookNameEdit = true;
validationBookMaxQuantityEdit = true;


// Function to validate book name field - EDIT popup
function validateBookNameEdit() {
    const bookNameInput = document.getElementById('editBookName');
    const bookNameErrorEdit = document.getElementById('bookNameErrorEdit');
    const bookName = bookNameInput.value.trim();

    // Check if book name field is empty
    if (bookName.length === 0) {
        bookNameErrorEdit.textContent = 'Book title cannot be empty.';
        document.getElementById('submitEdit').disabled = true; // Disable the submit button
        document.getElementById('submitEdit').style.backgroundColor = '#cccccc'; // Grey out the submit button
        validationBookNameEdit = false;
    } else {
        bookNameErrorEdit.textContent = ''; // Remove the error message
        validationBookNameEdit = true;
        if (validationBookNameEdit && validationBookMaxQuantityEdit){
            document.getElementById('submitEdit').disabled = false; // Enable the submit button
            document.getElementById('submitEdit').style.backgroundColor = ''; // Remove the greyed-out style
        }
    }
}


// Attach event listener to the book name field to trigger validation on blur - EDIT popup
document.getElementById('editBookName').addEventListener('blur', validateBookNameEdit);


// Function to handle case of book max quantity edit validation failed
function validateBookMaxQuantityEditFailed() {
    const bookNewQuantity = document.getElementById('editQuantity');
    document.getElementById('submitEdit').disabled = true; // Disable the submit button
    document.getElementById('submitEdit').style.backgroundColor = '#cccccc'; // Grey out the submit button
    validationBookMaxQuantityEdit = false;
    bookNewQuantity.value = '';
}


// Function to validate book max quantity field - EDIT popup
function validateBookMaxQuantityEdit() {
    const minValidNewMaxQuantity = currentMaxQuantity - currentQuantity;
    const bookNewMaxQuantity = document.getElementById('editMaxQuantity');
    const bookNewQuantity = document.getElementById('editQuantity');
    const bookQuantityErrorEdit = document.getElementById('bookQuantityErrorEdit');
    const bookNewMaxQuantityValue = bookNewMaxQuantity.value;
    const bookNewMaxQuantityValueTrim = bookNewMaxQuantityValue.trim();
    const newMaxQuantity = parseInt(bookNewMaxQuantityValue, 10);

    // Check if book new max quantity field is empty
    if (bookNewMaxQuantityValueTrim.length === 0) {
        bookQuantityErrorEdit.textContent = 'Book quantity cannot be empty.';
        validateBookMaxQuantityEditFailed();
    // Check if book new max quantity field is negative number
    } else if (newMaxQuantity < 0){
        bookQuantityErrorEdit.textContent = 'Book quantity cannot be negative number.';
        validateBookMaxQuantityEditFailed();
    } else if (newMaxQuantity < minValidNewMaxQuantity){
        bookQuantityErrorEdit.textContent = `Book quantity cannot be smaller than the actual active loans of the book. Active loans of this book: ${minValidNewMaxQuantity}`;
        validateBookMaxQuantityEditFailed();
    } else {
        bookQuantityErrorEdit.textContent = ''; // Remove the error message
        validationBookMaxQuantityEdit = true;
        bookNewQuantity.value = newMaxQuantity - minValidNewMaxQuantity;
        
        if (validationBookNameEdit && validationBookMaxQuantityEdit){
            document.getElementById('submitEdit').disabled = false; // Enable the submit button
            document.getElementById('submitEdit').style.backgroundColor = ''; // Remove the greyed-out style
        }
    }
}


// Attach event listener to the book max quantity EDIT field to trigger validation on blur
document.getElementById('editMaxQuantity').addEventListener('blur', validateBookMaxQuantityEdit);


// **** Availability Dropdown section **** 

// Add event listener to the availabilityDropdown
const availabilityDropdown = document.getElementById("availabilityDropdown");

availabilityDropdown.addEventListener("change", function () {
    const selectedValue = this.value;  // Get the selected value
    localStorage.setItem("availabilityFilterBooks", selectedValue);  // Store the selected value in localStorage
    filterTable(selectedValue);  // Pass the selected value to filterTable
});

// Retrieve the filter value from localStorage when the page loads
const storedAvailabilityFilter=localStorage.getItem("availabilityFilterBooks");
if (storedAvailabilityFilter) {
    availabilityDropdown.value = storedAvailabilityFilter;
    filterTable(storedAvailabilityFilter);
} else {
    // If no filter is stored, set the default filter
    availabilityDropdown.value = "Any";
    filterTable("Any");
}

// Function that enables to filter by status from the dropdown
function filterTable(selectedValue) {
    var filter, table, tr, td, i;
    if(selectedValue){
        filter = selectedValue.toUpperCase().trim(); //Trim & make it case-insensitive
    }

    table = document.getElementById("booksTable");  // Get Table Element
    tr = table.getElementsByTagName("tr");  // Get Table Rows

    for (i = 0; i < tr.length; i++) {  // Run for each row
        td = tr[i].getElementsByTagName("td")[7]; // Get "Loan Quantity" Column Value (should be positive or 0)
        if (td) {  // Check If "Availability" Value Matches Filter
            const availability = parseInt(td.textContent || td.innerText); // Parse availability as integer (if Loan Quantity > 0 means customer can loan this book, else - all the books are currently in loan)
            if (filter === 'ANY' || // Show all table results
                (filter === 'AVAILABLE' && availability > 0) || // Show if available (availability > 0)
                (filter === 'NOT AVAILABLE' && availability === 0)) { // Show if not available (availability === 0)
                tr[i].style.display = "";     // show row
            } else {
                tr[i].style.display = "none"; // dont show row
            }
        }
    }
}