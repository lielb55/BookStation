console.log("hello");

const newLoanPopupButton = document.getElementById('newLoanPopupButton');
const endLoanPopupButton = document.getElementById('endLoanPopupButton');
const popupLoanContainer = document.getElementById('loanContainer');
const popupEndLoanContainer = document.getElementById('endLoanContainer');

const submitLoan = document.getElementById('submitLoanButton');
const cancelLoan = document.getElementById('cancelLoan');

const submitEndLoan = document.getElementById('submitEndLoanButton');
const cancelEndLoan = document.getElementById('cancelEndLoan');

// Add event listener to the availabilityDropdown
const availabilityDropdown = document.getElementById("availabilityDropdown");
availabilityDropdown.addEventListener("change", function () {
    const selectedValue = this.value;  // Get the selected value
    filterTable(selectedValue);  // Pass the selected value to filterTable
    searchByNameFunction(selectedValue); // Add this line to trigger the search function
});


// After the page loads, set the filter based on the stored value in localStorage
// const storedAvailabilityFilter = localStorage.getItem("availabilityFilter");
// if (storedAvailabilityFilter) {
//     availabilityDropdown.value = storedAvailabilityFilter;
//     filterTable(storedAvailabilityFilter);
// } else {
//     // If no filter is stored, set the default filter
//     availabilityDropdown.value = "Active";
//     filterTable("Active");
// }


// Initial table setup
filterTable(availabilityDropdown.value);  // Pass the initial selected value

function filterTable(selectedValue) {
    var table, tr, td, i;
    table = document.getElementById("loansTable");
    tr = table.getElementsByTagName("tr");

    // Move the initialization of previousFilter here
    let previousFilter = selectedValue;

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

    // Update the global variable with the new selected value
    previousFilter = selectedValue;

    // Add this line to trigger the search function and pass previousFilter as an argument
    searchByNameFunction(previousFilter);
}

// Add a global variable to store the previous filter state
let previousFilter = availabilityDropdown.value;


// Add an event listener to customerNameInput
const customerNameInput = document.getElementById("customerNameInput");
customerNameInput.addEventListener("input", function () {
    // Check if the input is empty
    if (this.value.trim() === "") {
        // Reset the table to its original state based on the current selected loan status
        filterTable(availabilityDropdown.value);
    } else {
        // Trigger the search function with the current input
        searchByNameFunction(availabilityDropdown.value);
    }
});

// Call applyFilter after reloading the page
applyFilter(availabilityDropdown.value);

function searchByNameFunction(previousFilter) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("customerNameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("loansTable");
    tr = table.getElementsByTagName("tr");

    const availabilityDropdown = document.getElementById("availabilityDropdown");
    const selectedStatus = availabilityDropdown.value;

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
            const statusMatches =
                // selectedStatus === "Any" ||
                (selectedStatus === "Active" && loanEndDate === "") ||
                (selectedStatus === "Not active" && loanEndDate !== "");

            // Display the row only if both name and status match
            if (nameMatches && statusMatches) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    // If the search input is empty, reset the table to its original state
    if (filter === "") {
        // Reapply the previous filter state
        applyFilter(previousFilter);
    } else {
        // Store the current filter state
        previousFilter = selectedStatus;
    }
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



    
// Function to handle the "Submit" button click for the "New Loan" popup
function handleNewLoanSubmit() {
    // Get the values you want to insert into the loans database
    const bookIdNewLoan = document.getElementById("bookIdNewLoan");
    const customerIdNewLoan = document.getElementById("customerIdNewLoan");

    const bookId = parseInt(bookIdNewLoan.value);
    const customerId = parseInt(customerIdNewLoan.value);

    // Create an object to hold the data
    const loanData = {
        bookId,
        customerId
    };

    console.log(loanData);

    // Make an AJAX request to insert the data into the sales database
    fetch("add_loan.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loanData)
    })
    .then(response => response.text())
    .then(data => {
    // Handle the response from the PHP file (e.g., display a success message)
    console.log(data);
    // You can add further handling or notifications here
    })
    .catch(error => console.error("Error inserting data:", error));
    
    // Save the current availability filter to localStorage
    //localStorage.setItem('availabilityFilter', availabilityDropdown.value);
        
    // Adding a delay before reloading the page
    setTimeout(function () {
        popupLoanContainer.style.display = "none";
        location.reload();
    }, 1200); // Adjust the delay time (in milliseconds) as needed
}

// opens new loan popup
newLoanPopupButton.addEventListener('click', () => {
    popupLoanContainer.style.display = 'block';

    const bookIdNewLoan = document.getElementById("bookIdNewLoan");
    const customerIdNewLoan = document.getElementById("customerIdNewLoan");

    // Remove previous event listener (if any)
    submitLoan.removeEventListener("click", handleNewLoanSubmit);

    // Add a new event listener
    submitLoan.addEventListener("click", handleNewLoanSubmit);
});

// Variable to store the ID of the loan that will be edited
let loanToEdit;

// Function to open the confirmation modal
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
    //const customerIdEnd = customerIdEndLoan.innerText.replace('Customer ID: ', '');

    // Create an object to hold the data
    const loanData = {
        loanToEdit,
        bookIdEnd
    };
    console.log(loanData);
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
        // Handle the response from the PHP file (e.g., display a success message)
        console.log(data);
        // You can add further handling or notifications here
    })
    .catch(error => console.error("Error inserting data:", error));
        
    //popupEndLoanContainer.style.display = "none";
    setTimeout(function () {
        popupEndLoanContainer.style.display = "none";
        location.reload();
    }, 1200); // Adjust the delay time (in milliseconds) as needed
    //location.reload();
    
});

// // opens end loan popup
// endLoanPopupButton.addEventListener('click', () => {
//     popupEndLoanContainer.style.display = 'block';
    
//     const bookIdEndLoan = document.getElementById("bookIdEndLoan");
//     const customerIdEndLoan = document.getElementById("customerIdEndLoan");
    
//     submitEndLoan.addEventListener("click", function () {
//         // Get the values you want to insert into the loans database
//         const bookIdEnd = bookIdEndLoan.innerText.replace('Book ID: ', '');
//         const customerIdEnd = customerIdEndLoan.innerText.replace('Customer ID: ', '');

//         // Create an object to hold the data
//         const loanData = {
//             bookIdEnd,
//             customerIdEnd
//         };
    
//         // Make an AJAX request to insert the data into the sales database
//         fetch("end_loan.php", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(loanData)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Handle the response from the PHP file (e.g., display a success message)
//                 console.log(data);
//                 // You can add further handling or notifications here
//             })
//             .catch(error => console.error("Error inserting data:", error));
        
//             popupEndLoanContainer.style.display = "none";
//         location.reload();
//     });
// });

// close new loan popup and reset values
cancelLoan.addEventListener('click', () => {
    const bookIdSelect = document.getElementById("bookIdNewLoan");
    const customerIdSelect = document.getElementById("customerIdNewLoan");
    
    popupLoanContainer.style.display = 'none';
    bookIdSelect.value = 'none';
    customerIdSelect.value = 'none';
});

// close end loan popup and reset values
cancelEndLoan.addEventListener('click', () => {
    popupEndLoanContainer.style.display = 'none';
});
