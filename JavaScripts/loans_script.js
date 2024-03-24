const newLoanPopupButton = document.getElementById('newLoanPopupButton');
const endLoanPopupButton = document.getElementById('endLoanPopupButton');
const popupLoanContainer = document.getElementById('loanContainer');
const popupEndLoanContainer = document.getElementById('endLoanContainer');

const submitLoan = document.getElementById('submitLoanButton');
const cancelLoan = document.getElementById('cancelLoan');

const submitEndLoan = document.getElementById('submitEndLoanButton');
const cancelEndLoan = document.getElementById('cancelEndLoan');

//for dropdown general
const selectBox = document.querySelector('.select-box');
const selectOption = document.querySelector('.select-option');
// const bookValue = document.querySelector('#bookValue');
// const bookOptionSearch = document.querySelector('#bookOptionSearch');
const options = document.querySelector('.options');
const optionsList = document.querySelectorAll('.options li');

//for books dropdown
const bookSelectBox = document.querySelector('#bookSelectBox');
const bookSelectOption = document.querySelector('#bookSelectOption');
const bookValue = document.querySelector('#bookValue');
const bookOptionSearch = document.querySelector('#bookOptionSearch');
const bookOptions = document.querySelector('#bookOptions');
const bookOptionsList = document.querySelectorAll('#bookOptions li');

// Add event listener to the customers select box
const customerSelectBox = document.querySelector('#customerSelectBox');
const customerSelectOption = document.querySelector('#customerSelectOption');
const customerValue = document.querySelector('#customerValue');
const customerOptionSearch = document.querySelector('#customerOptionSearch');
const customerOptions = document.querySelector('#customerOptions');
const customerOptionsList = document.querySelectorAll('#customerOptions li');

//****booksDropdown section**** 

let bookSelectedOption = '';

// Add event listener to the booksDropdown
bookSelectOption.addEventListener("click", function () {
    bookSelectBox.classList.toggle("active");
});

// Loop through each option list item
bookOptionsList.forEach(function(option) {
    option.addEventListener("click", function () {
        // Update the value of the input field with the selected option
        bookValue.value = this.textContent;
        // Update the selected option variable
        bookSelectedOption = this.textContent;
        // Close the dropdown
        bookSelectBox.classList.remove("active");
        // Print the selected option
    });
});

bookOptionSearch.addEventListener("keyup", function () {
    var filter, li, i, textValue;
    filter= bookOptionSearch.value.toUpperCase();
    li = bookOptions.getElementsByTagName('li');
    for ( i = 0; i < li.length; i++) {
        liCount = li[i];
        textValue = liCount.textContent || liCount.innerText;
        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display='';
        } 
        else {
            li[i].style.display='none';
        }
    }
});

// ****customersDropdown section****

let customerSelectedOption = '';

customerSelectOption.addEventListener('click', function() {
    customerSelectBox.classList.toggle('active');
});

customerOptionsList.forEach(function(option) {
    option.addEventListener('click', function() {
        customerValue.value = this.textContent;
        customerSelectedOption = this.textContent;
        customerSelectBox.classList.remove('active');
    });
});

customerOptionSearch.addEventListener('keyup', function() {
    const filter = this.value.toUpperCase();
    const options = customerOptions.getElementsByTagName('li');
    for (let i = 0; i < options.length; i++) {
        const textValue = options[i].textContent || options[i].innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            options[i].style.display = '';
        } else {
            options[i].style.display = 'none';
        }
    }
});

//****availabilityDropdown section**** 

// Add event listener to the availabilityDropdown
const availabilityDropdown = document.getElementById("availabilityDropdown");
availabilityDropdown.addEventListener("change", function () {
    const selectedValue = this.value;  // Get the selected value
    localStorage.setItem("availabilityFilter", selectedValue);  // Store the selected value in localStorage
    filterTable(selectedValue);  // Pass the selected value to filterTable
    searchByNameFunction();
    // searchByNameFunction(selectedValue); // Add this line to trigger the search function
});

// Retrieve the filter value from localStorage when the page loads
const storedAvailabilityFilter = localStorage.getItem("availabilityFilter");
if (storedAvailabilityFilter) {
    availabilityDropdown.value = storedAvailabilityFilter;
    filterTable(storedAvailabilityFilter);
} else {
    // If no filter is stored, set the default filter
    availabilityDropdown.value = "Active";
    filterTable("Active");
}

// Initial table setup
filterTable(availabilityDropdown.value);  // Pass the initial selected value

// Call applyFilter after reloading the page
applyFilter(availabilityDropdown.value);


// filter the table based on the availabilityDropdown value
function filterTable(selectedValue) {
    var table, tr, td, i;
    table = document.getElementById("loansTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {  // run for each row
        td = tr[i].getElementsByTagName("td")[5]; // Get "Loan end date" Column Value
        const endLoanColumn = tr[i].getElementsByTagName("td")[6]; // Get "End loan" Column - if the filtering is on "Not active," we need to hide this column
        const endLoanHeader = document.getElementById("endLoanHeader");

        if (td && endLoanColumn) {
            const loanEndDate = td.textContent || td.innerText;

            if ((selectedValue === "Active" && loanEndDate === "") || (selectedValue === "Not active" && loanEndDate !== "")) {
                tr[i].style.display = "";
                endLoanColumn.style.display = (selectedValue === "Not active") ? "none" : ""; // Hide "End loan" column for "Not active" filter
                endLoanHeader.style.display = (selectedValue === "Not active") ? "none" : ""; // Hide "End loan" header for "Not active" filter
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    // Trigger the search function after filtering
    searchByNameFunction();
}

function applyFilter(filter) {
    const table = document.getElementById("loansTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        const statusColumnIndex = 5; // Index 5 for the "Loan end date" column
        tdStatus = tr[i].getElementsByTagName("td")[statusColumnIndex];

        if (tdStatus) {
            const loanEndDate = tdStatus.textContent || tdStatus.innerText;

            // Check if the loan status matches the selected filter
            const statusMatches =
                // filter === "Any" ||
                (filter === "Active" && loanEndDate === "") ||
                (filter === "Not active" && loanEndDate !== "");

            // Display the row only if the status matches
            tr[i].style.display = statusMatches ? "" : "none";
        }
    }
}

//****customerNameInput section****

// Function to handle searching by customer name
function searchByNameFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("customerNameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("loansTable");
    tr = table.getElementsByTagName("tr");

    const selectedStatus = availabilityDropdown.value; // Get the selected filter value

    for (i = 0; i < tr.length; i++) {
        const statusColumnIndex = 5; // Index 5 for the "Loan end date" column
        const nameColumnIndex = 3; // Index 3 for the "Customer Full Name" column

        tdStatus = tr[i].getElementsByTagName("td")[statusColumnIndex];
        tdName = tr[i].getElementsByTagName("td")[nameColumnIndex];

        if (tdStatus && tdName) {
            const loanEndDate = tdStatus.textContent || tdStatus.innerText;
            const customerName = tdName.textContent || tdName.innerText;

            // Check if the customer name contains the filter text
            const nameMatches = customerName.toUpperCase().indexOf(filter) > -1;

            // Check if the loan status matches the selected filter
            const statusMatches = (selectedStatus === "Active" && loanEndDate === "") ||
                                  (selectedStatus === "Not active" && loanEndDate !== "");

            // Display the row only if both name and status match
            if (nameMatches && statusMatches) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const customerNameInput = document.getElementById("customerNameInput");

// Function to handle input in the customer name input field
customerNameInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toUpperCase();
    searchByNameFunction(); // Apply the search function whenever the input changes
});

// Call searchByNameFunction to apply the search when the page loads
searchByNameFunction();


//****New loan section****

// opens new loan popup and attaches event listener for loan submission
newLoanPopupButton.addEventListener('click', () => {
    popupLoanContainer.style.display = 'block';
});

// Add a new event listener for loan submission
submitLoanButton.addEventListener("click", function () {
    // Check if a book / customer has been selected
    if (!bookSelectedOption) {
        loanError.textContent = 'Please select a book';
        return;
    }
    if (!customerSelectedOption) {
        loanError.textContent = 'Please select a customer';
        return;
    }
    // Get the selected book ID & customer ID
    const bookId = parseInt(bookSelectedOption.split(' - ')[0]); // Extract the ID from the bookSelectedOption
    const customerId = parseInt(customerSelectedOption.split(' - ')[0]); // Extract the ID from the customerSelectedOption

    const loanData = {
        bookId,
        customerId
    };
    // Make an AJAX request to insert the data into the loans database
    fetch("add_loan.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loanData)
    })
    .then(response => response.text())
    .then(data => {
        // Reload the page after a short delay
        setTimeout(() => {
            location.reload();
        }, 1000); // Adjust the delay time (in milliseconds)
        showSnackbar("Loan created successfully.", true);
    })
    .catch(error => {showSnackbar("Server error. Please try again later.", false);});
    
    // Close the popup after 300 milliseconds
    setTimeout(function() {
        popupLoanContainer.style.display = "none";
        resetAddPopup();
    }, 300);
});


// close new loan popup and reset values
cancelLoan.addEventListener('click', () => {
    popupLoanContainer.style.display = 'none';
    
    // Clear the selected option in the select box
    bookValue.value = '';
    customerValue.value = '';
    
    // Reset the selected option
    bookSelectedOption = '';
    customerSelectedOption = '';

    // Clear the search input
    bookOptionSearch.value = '';
    customerOptionSearch.value = '';
    
    loanData = {
    bookId: null,
    customerId: null
    };

    // Show all options again in the next time the user will open the popup
    optionsList.forEach(function(option) {
        option.style.display = 'block';
    });
    document.getElementById('loanError').textContent = '';
});
    
//****End loan section****

// Variable to store the ID of the loan that will be edited
let loanToEdit;

// Function to open the end loan popup
function openEndLoanContainer(loanId) {
    loanToEdit = loanId;
    fetch(`get_loans_data.php?loanId=${loanId}`)
        .then(response => response.json())
        .then(data => {
            // Check if loan details were retrieved successfully
            if (data.error) {
                console.error("Error fetching loan details:", data.error);
                return;
            }
            // Populate end loan popup fields with loan details
            document.getElementById('bookIdEndLoan').innerText = `Book ID: ${data.bookIdF}`;
            document.getElementById('bookTitleEndLoan').innerText = `Book Title: ${data.bookTitle}`;
            document.getElementById('customerIdEndLoan').innerText = `Customer ID: ${data.customerIdF}`;
            document.getElementById('customerNameEndLoan').innerText = `Customer Name: ${data.customerName}`;
        })
        .catch(error => console.error("Error fetching loan details:", error));
    popupEndLoanContainer.style.display = 'block';
}

// Add click event listeners to all end loan buttons
const endLoanButtons = document.querySelectorAll('.endLoan-button');
endLoanButtons.forEach(button => {
    button.addEventListener('click', () => {
        const loanId = button.getAttribute('data-loan-id');
        openEndLoanContainer(loanId);  // assign innerText
    });
});

submitEndLoan.addEventListener("click", function () {
    // Get the values you want to insert into the loans database
    const bookIdEnd = parseInt(bookIdEndLoan.innerText.replace('Book ID: ', ''));
    loanToEdit = parseInt(loanToEdit);

    // Create an object to hold the data
    const loanData = {
        loanToEdit,
        bookIdEnd
    };
    // Make an AJAX request to insert the data into the sales database
    fetch("end_loan.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loanData)
    })
    .then(response => response.json())
    .then(data => {
        setTimeout(function() {
        location.reload();
        }, 1000);
        showSnackbar("Loan ended successfully.", true);
    })
    .catch(
        error => {showSnackbar("Server error. Please try again later.", false);});
    
    // Close the popup after 300 milliseconds    
    setTimeout(function () {
        popupEndLoanContainer.style.display = "none";
    }, 300); // Adjust the delay time (in milliseconds)
});

// close end loan popup and reset values
cancelEndLoan.addEventListener('click', () => {
    popupEndLoanContainer.style.display = 'none';
});

// Function to display snackbar
function showSnackbar(message, isSuccess) {
    var snackbarLoans = document.getElementById("snackbarLoans");

    snackbarLoans.textContent = message;
    
    // Remove the hidden class initially
    snackbarLoans.classList.remove("snackbarHidden");

    // Add the show class to make it visible
    snackbarLoans.classList.add("snackbarShow");

    // After a delay, remove the show class to trigger the fade-out animation
    setTimeout(function() {
        snackbarLoans.classList.remove("snackbarShow");
        // Add back the hidden class after the fade-out animation is complete
        snackbarLoans.classList.add("snackbarHidden");
    }, 2000); // Adjust the delay time (in milliseconds) as needed

    // Set background color for error messages
    if (!isSuccess) {
        snackbarLoans.style.backgroundColor = '#BD5666';
    } else{
        snackbarLoans.style.backgroundColor = '#C3CDB4';
    }
}