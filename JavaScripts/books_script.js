// Get the delete button elements with a class (adjust this selector accordingly)
const deleteButtons = document.querySelectorAll('.delete-button');

console.log("hello");
// Get the confirmation modal and its buttons
const deleteConfirmationPopup = document.getElementById('deleteConfirmationPopup');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
const cancelAdd = document.getElementById('cancelAdd');
const popupAddButton = document.getElementById('AddBookPopupButton');
const popupAddContainer = document.getElementById('AddContainer');
const submitButton = document.getElementById('submitButton');
const bookSearchResultFormL = document.getElementById('bookSearchResultFormL');
const bookSearchResultFormR = document.getElementById('bookSearchResultFormR');

// Add event listener to the availabilityDropdown
const availabilityDropdown = document.getElementById("availabilityDropdown");
availabilityDropdown.addEventListener("change", filterTable);

// Initial table setup
filterTable();

// Variable to store the ID of the book to be deleted
let bookIdToDelete;


// Function to open the confirmation modal
function openDeleteConfirmationPopup(bookId) {
    bookIdToDelete = bookId;
    deleteConfirmationPopup.style.display = 'block';
}

// Function to close the confirmation modal
function closeDeleteConfirmationPopup() {
    deleteConfirmationPopup.style.display = 'none';
}

// Add click event listeners to all delete buttons
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bookId = button.getAttribute('data-book-id');
        openDeleteConfirmationPopup(bookId);
    });
});

// Add click event listeners to the popup buttons
confirmDeleteButton.addEventListener('click', () => {
    // Make an AJAX call to trigger the PHP file to delete the book
    fetch(`delete_book.php?bookid=${bookIdToDelete}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response from the PHP file (e.g., display a success message)
            console.log(data);
            // You can add further handling or notifications here

            // Close the confirmation modal
            closeDeleteConfirmationPopup();

            // Reload the inventory page or perform any other desired actions
            location.reload();
        })
        .catch(error => console.error("Error deleting book:", error));
});

cancelDeleteButton.addEventListener('click', () => {
    // Close the confirmation modal if the user clicks "No"
    closeDeleteConfirmationPopup();
});


// Function that enables to filter by status from the dropdown
function filterTable() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("availabilityDropdown").value;  // Get Dropdown Value
    filter = input.toUpperCase().trim(); // Trim and make it case-insensitive
    console.log(filter);
    table = document.getElementById("booksTable");  // Get Table Element
    tr = table.getElementsByTagName("tr");  // Get Table Rows

    for (i = 0; i < tr.length; i++) {  // Run for each row
        td = tr[i].getElementsByTagName("td")[6]; // Get "Availability" Column Value
        if (td) {  // Check If "Availability" Value Matches Filter
            txtValue = td.textContent || td.innerText;
            const trimmedTxtValue = txtValue.trim().toUpperCase(); // Trim and make it case-insensitive
            if (trimmedTxtValue === filter || filter === 'ANY') {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}




// Opens add new book popup
// Add this line to check if the event is triggered
console.log('Add Book button clicked');

popupAddButton.addEventListener('click', () => {
    popupAddContainer.style.display = 'block';
    submitButton.style.display = 'none';

    const $searchButton = $('#searchButton');
    const $bookTable = $('#bookdTable');
    const $bookName = $('#bookName');
    const $bookAuthor = $('#author');
    const $bookGenre = $('#genre');
    const $bookPublisher = $('#publisher');
    const $bookPages = $('#pages');



    // Add event listener to the "Get" button
    $searchButton.click(function() {
        
        // liel test 27.1:
        // Get the value from the input field
        const fullBookName = document.getElementById("bookName").value; //Should be changed fullBookNameInput.value;
    
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        console.log("fullBookName=" + fullBookName);
        // Define the PHP script URL with the query parameter
        const phpScriptURL = `get_book_API.php`;

        // Configure the request
        xhr.open('POST', phpScriptURL, true);

        // Set up a callback function to handle the response
        xhr.onload = function () {
            if (xhr.status === 200) {
                // The request was successful, and you can handle the response here
                console.log(xhr.responseText); // You can customize this based on your needs
                const response = JSON.parse(xhr.responseText);
                
                if (response.Title !== "") {
                    // Fill the Author field with the data from the response
                    $bookAuthor.val(response.Author);
                    $bookGenre.val(response.Genre).prop;
                    $bookPublisher.val(response.Publisher);
                    $bookPages.val(response.Height).prop;
                    console.log(response.Author);
                    
                    bookSearchResultFormR.style.display = "block";
                    bookSearchResultFormL.style.display = "block";
                    submitButton.style.display = "block";
                    // document.getElementById('submitButton').disabled = false; // Enable the submit button
                    submitButton.disabled = false;

                    
                } else {
                    alert('No book was found!');
                }

            } else {
                // Handle the request error
                console.error('Error: ' + xhr.status);
            }
        };
        // Send the request
        xhr.send(JSON.stringify({ Title: fullBookName }));
        
            // Add event listeners to each input field to trigger validation on blur
    document.getElementById('bookName').addEventListener('blur', validateBookName);
    document.getElementById('pages').addEventListener('blur', validatePages);

    // Attach the validateForm function to the form submission event
    const bookForm = document.querySelector('#bookForm');
    bookForm.addEventListener('submit', function(event) {
        if (!validateBookForm()) {
            event.preventDefault(); // Prevent form submission if there are errors
        }
    });
    
    
    //Liel
    // Add click event listener to the submit button
    document.getElementById('submitButton').addEventListener('click', function () {
        // Get values from input fields
        var title = document.getElementById('bookName').value; // Assuming your book name input has the id 'bookName'
        var author = document.getElementById('author').value;
        var genre = document.getElementById('genre').value;
        var publisher = document.getElementById('publisher').value;
        var pages = document.getElementById('pages').value;
    
        // Create an object with the data
        var data = {
            title: title, // Add the title field
            author: author,
            genre: genre,
            publisher: publisher,
            pages: pages
            // Add other fields as needed
        };
    
        // Make an AJAX call to the server
        fetch('add_book.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            // Handle the result from the server
            console.log(result);
            // You can add further handling or notifications here
        })
        .catch(error => console.error("Error submitting form:", error));
        
        // popupAddContainer.style.display = "none";
        // sleep(2000);  // wait the record to be created
        location.reload()
        setTimeout(function() {
            popupLoanContainer.style.display = "none";
            location.reload();
        }, 1500); // Adjust the delay time (in milliseconds) as needed

    });

    //End Liel
    cancelAdd.addEventListener('click', () => {
        console.log("cancel add popup");

        popupAddContainer.style.display = 'none';

        document.getElementById("bookName").value ='';
        document.getElementById("author").value ='';
        searchButton.disabled = false;


        bookSearchResultFormR.style.display = 'none';
        bookSearchResultFormL.style.display = 'none';
        
        document.getElementById('bookNameError').textContent = '';
        document.getElementById('bookPagesError').textContent = '';
    });
    
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openAddBookPopup() {
    console.log("add popup");
    document.getElementById('AddContainer').style.display = 'block';
}



validationBookName = true;
validationBookPages = false;

// Function to validate book name field
function validateBookName() {
    const bookNameInput = document.getElementById('bookName');
    const bookNameError = document.getElementById('bookNameError');
    const bookName = bookNameInput.value.trim();

    // Check if book name field is empty
    if (bookName.length === 0) {
        bookNameError.textContent = 'Book name cannot be empty.';
        document.getElementById('submitButton').disabled = true; // Disable the submit button
        document.getElementById('submitButton').style.backgroundColor = '#cccccc'; // Grey out the submit button
        validationBookName = false;
    } else {
        bookNameError.textContent = ''; // Remove the error message
        validationBookName = true;
        
        if (validationBookName && validationBookPages){
            document.getElementById('submitButton').disabled = false; // Enable the submit button
            document.getElementById('submitButton').style.backgroundColor = ''; // Remove the greyed-out style

        }
        
    }
}


// Function to validate book pages field - only digits or empty, no negatives, no chars
function validatePages() {
    const pagesInput = document.getElementById('pages');
    const pagesError = document.getElementById('bookPagesError');
    const pagesValue = pagesInput.value.trim();

    // Parse the input value as an integer
    const pages = parseInt(pagesValue, 10);

    // Check if the input is empty
    if (pagesValue === '') {
        pagesError.textContent = 'Pages field cannot be empty.';
        document.getElementById('submitButton').disabled = true; // Disable the submit button
        document.getElementById('submitButton').style.backgroundColor = '#cccccc'; // Grey out the submit button
        validationBookPages = false;
        return; // Exit the function early if the input is empty
    }

    // Check if pages field validation fails
    if (isNaN(pages) || pages < 0 || !/^\d+$/.test(pagesValue)) {
        pagesError.textContent = 'Pages must be a positive number greater than zero.';
        document.getElementById('submitButton').disabled = true; // Disable the submit button
        document.getElementById('submitButton').style.backgroundColor = '#cccccc'; // Grey out the submit button
        validationBookPages = false;
    } else {
        pagesError.textContent = ''; // Remove the error message
        validationBookPages = true;
        
        if (validationBookName && validationBookPages){
            document.getElementById('submitButton').disabled = false; // Enable the submit button
            document.getElementById('submitButton').style.backgroundColor = ''; // Remove the greyed-out style
        }
    }
}



// Attach event listener to the book name field to trigger validation on blur
document.getElementById('pages').addEventListener('blur', validatePages);


// Function to validate the book name error
function validateBookNameError() {
    const bookNameError = document.getElementById('bookNameError').textContent;

    // Check if the book name error message is not empty
    if (bookNameError.trim() !== '') {
        console.log('Book name error detected. Please fix it.');
        return false; // Return false if there is an error
    }

    // Return true if there is no error
    return true;
}

// Add click event listener to the submit button
submitButton.addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call the function to validate the book name error
    const isBookNameValid = validateBookNameError();

    // If the book name is not valid, prevent the form submission
    if (!isBookNameValid) {
        console.log('Form submission prevented due to book name error.');
        return;
    }

    // If the book name is valid, proceed with form submission
    console.log('Form submitted successfully.');
    // Add your form submission logic here
});

