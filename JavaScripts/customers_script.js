const editButtons = document.querySelectorAll('.edit-button');
const addCustomerPopupButton = document.getElementById('AddCustomerPopupButton');
const customerContainer = document.getElementById('customerContainer');
const submitcust = document.getElementById('submitCust');
const cancelcust = document.getElementById('cancelCust');
const editCustomerContainer = document.getElementById('editCustomerContainer');
const submitEditButton = document.getElementById('submitEdit');
const cancelEditButton = document.getElementById('CancelEdit');

// Define variables for snackbar message and flag for handling exceptions
let msg = "Unexpected error.";
let isSuccess = false;

// **** Search customer from the table ****

function searchByNameFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("customerNameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Index 1 for the "Full Name" column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

// **** Sorting customers table ****

// Triggers customer table sorting by Full name column
document.addEventListener("DOMContentLoaded", function () {
    // Sort the table by "Full Name" column by default
    sortTable(1);
});

// Sorting function for customers table
function sortTable(columnIndex) {
    const table = document.getElementById("customerTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = Array.from(tbody.getElementsByTagName("tr"));
    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName("td")[columnIndex].textContent;
        const bValue = b.getElementsByTagName("td")[columnIndex].textContent;
        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
    });
    // Remove existing rows from the table
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    // Append sorted rows to the table
    rows.forEach((row) => {
        tbody.appendChild(row);
    });
}

// Function to display snackbar
function showSnackbar(message, isSuccess) {
    snackbarCustomer = document.getElementById("snackbarCustomer");
    snackbarCustomer.textContent = message;
    // Remove the hidden class initially
    snackbarCustomer.classList.remove("snackbarHidden");
    // Add the show class to make it visible
    snackbarCustomer.classList.add("snackbarShow");
    // After a delay, remove the show class to trigger the fade-out animation
    setTimeout(function() {
        snackbarCustomer.classList.remove("snackbarShow");
        // Add back the hidden class after the fade-out animation is complete
        snackbarCustomer.classList.add("snackbarHidden");
    }, 2000); // Adjust the delay time (in milliseconds)
    // Set background color for error messages
    if (!isSuccess) {
        snackbarCustomer.style.backgroundColor = '#BD5666';
    } else{
        snackbarCustomer.style.backgroundColor = '#C3CDB4';
    }
}

// Function to reset add popup fields
function resetAddPopup(){
    // Clear input fields
    document.getElementById('customerId').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('email').value = '';
}

//**** ADD customer section **** 

// Function to submit customer details
submitCust.addEventListener('click', async function () {
    // Get user input values
    const customerId = document.getElementById('customerId').value;
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    // Create data object to be sent to the server
    const data = {
        customerId: customerId,
        fullName: fullName,
        phone: phoneNumber,
        email: email
    };
    try {
        // Make a POST call to the server
        const response = await fetch('add_customer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Set success message and flag
            msg = "Customer added successfully.";
            isSuccess = true;
        // Reload the page after 1000 milliseconds
            setTimeout(function() {
            location.reload();
        }, 1000);
        } else {
            // Set error message and flag based on response status
            msg = "Server error. Please check if cusomer ID already exist.";
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error submitting form:", error);
    }
    // Show the snackbar message
    showSnackbar(msg, isSuccess);
    // Close the popup after 300 milliseconds
    setTimeout(function() {
        customerContainer.style.display = "none";
        resetAddPopup();
    }, 300);
});

// Opens customer add popup
addCustomerPopupButton.addEventListener('click', () => {
    customerContainer.style.display = 'block';
    disableSubmitButton();
});

// Closes customer add popup and clears values
cancelcust.addEventListener('click', () => {
    customerContainer.style.display = 'none';
    // Clear input fields if needed
    document.getElementById('customerId').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('email').value = '';
    // Add customer errors
    document.getElementById('customerIdError').textContent = '';
    document.getElementById('customerNameError').textContent = '';
    document.getElementById('customerPhoneError').textContent = '';
    document.getElementById('customerEmailError').textContent = '';
    // Edit customer errors
    document.getElementById('customerNameErrorEdit').textContent = '';
    document.getElementById('customerPhoneErrorEdit').textContent = '';
    document.getElementById('customerEmailErrorEdit').textContent = '';
});

// Function to disable submit button - Add
function disableSubmitButton() {
    document.getElementById('submitCust').disabled = true;
    document.getElementById('submitCust').style.backgroundColor = '#cccccc';
}

// Function to enable submit button - Add
function enableSubmitButton() {
    document.getElementById('submitCust').disabled = false;
    document.getElementById('submitCust').style.backgroundColor = ''; // Reset background color
}

//**** EDIT customer section **** 

// Variable to store the ID of the customer that will be edited
let customerIdToEdit;  //bookIdToEdit

// Function to open the edit customer popup
function openEditCustomerContainer(customerId) {
    customerIdToEdit = customerId;
     fetch(`get_customers_data.php?customerid=${customerId}`)
        .then(response => response.json())
        .then(data => {
            // Check if customer details were retrieved successfully
            if (data.error) {
                console.error("Error fetching customer details:", data.error);
                return;
            }
            // Populate edit popup fields with customer details from the json response from the server
            document.getElementById('editCustomerId').value = customerId;
            document.getElementById('editFullName').value = data.fullName;
            document.getElementById('editPhone').value = data.phone;
            document.getElementById('editEmail').value = data.email;
        })
        .catch(error => console.error("Error fetching customer details:", error));
    editCustomerContainer.style.display = 'block';
}

// Add click event listeners to all edit buttons
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const customerId = button.getAttribute('data-customer-id');
        openEditCustomerContainer(customerId);
    });
});

// Function to disable submit button - Edit
function disableSubmitButtonEdit() {
    document.getElementById('submitEdit').disabled = true;
    document.getElementById('submitEdit').style.backgroundColor = '#cccccc';
}

// Function to enable submit button - Edit
function enableSubmitButtonEdit() {
    document.getElementById('submitEdit').disabled = false;
    document.getElementById('submitEdit').style.backgroundColor = ''; // Reset background color
}

// Add click event listeners to the popup edit button
submitEditButton.addEventListener('click', async function () {
    // Get values from input fields
    var customerId = document.getElementById('editCustomerId').value;  // Adjust this based on your HTML structure
    var fullName = document.getElementById('editFullName').value;
    var phone = document.getElementById('editPhone').value;
    var email = document.getElementById('editEmail').value;
    // Create an object with the data
    var data = {
        customerId: customerId,
        fullName: fullName,
        phone: phone,
        email: email
    };
    try {
        // Make a POST call to the server
        const response = await fetch('update_customer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Set success message and flag
            msg = "Customer updated successfully.";
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
    showSnackbar(msg, isSuccess);
    // Close the popup after 300 milliseconds
    setTimeout(function() {
        editCustomerContainer.style.display = 'none';
        resetAddPopup();
    }, 300);
});

cancelEditButton.addEventListener('click', () => {
    editCustomerContainer.style.display = 'none';
});

// **** Validations ****

// Add event listeners to each input field to trigger validation on blur
document.getElementById('customerId').addEventListener('blur', validateCustomerId);
document.getElementById('fullName').addEventListener('blur', validateName);
document.getElementById('phoneNumber').addEventListener('blur', validatePhone);
document.getElementById('email').addEventListener('blur', validateEmail);

validationCustId = false;
validationCustName = false;
validationCustPhone = false;
validationCustEmail = false;

// Function to validate customer ID
function validateCustomerId() {
    const customerIdInput = document.getElementById('customerId');
    const customerIdError = document.getElementById('customerIdError');
    const customerId = customerIdInput.value.trim();
    if (
        customerId.length !== 9 ||                 // Check length
        !/^\d+$/.test(customerId) ||               // Check if only digits
        parseInt(customerId, 10) <= 10000000       // Check if the number is greater than 10000000
    ) {
        customerIdError.textContent = 'Customer ID must be valid ID number, must contain 9 digits only .';
        disableSubmitButton();
        validationCustId = false;
    } else {
        customerIdError.textContent = '';
        validationCustId = true;
        if (validationCustId && validationCustName && validationCustPhone && validationCustEmail)
            enableSubmitButton();
    }
}

// Function to validate full name - Add
function validateName() {
    const nameInput = document.getElementById('fullName');
    const nameError = document.getElementById('customerNameError'); // Adjusted ID here
    const name = nameInput.value.trim();
    if (name.length < 3 || /\d/.test(name)) {
        nameError.textContent = 'Full Name must be at least 3 characters long and cannot contain digits.';
        disableSubmitButton();
        validationCustName = false;
    } else {
        nameError.textContent = '';
        validationCustName = true;
        if (validationCustId && validationCustName && validationCustPhone && validationCustEmail)
            enableSubmitButton();
    }
}

// Function to validate phone number - Add
function validatePhone() {
    const phoneInput = document.getElementById('phoneNumber');
    const phoneError = document.getElementById('customerPhoneError');
    const phone = phoneInput.value.trim();
    if (!/^\d{10}$/.test(phone)) {
        phoneError.textContent = 'Phone number must be 10 digits long and contain only digits.';
        disableSubmitButton();
        validationCustPhone = false;
    } else {
        phoneError.textContent = '';
        validationCustPhone = true;
        if (validationCustId && validationCustName && validationCustPhone && validationCustEmail)
            enableSubmitButton();
    }
}

// Function to validate email - Add
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('customerEmailError'); // Adjusted ID here
    const email = emailInput.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        disableSubmitButton();
        validationCustEmail = false;
    }    else {
        emailError.textContent = '';
        validationCustEmail = true;
      if (validationCustId && validationCustName && validationCustPhone && validationCustEmail)
        enableSubmitButton();
    }
}

// Function to validate all fields before form submission - Add
function validateForm() {
    validateCustomerId();
    validateName();
    validateEmail();
    // Check if any error messages are displayed
    const customerIdError = document.getElementById('customerIdError').textContent;
    const fullNameError = document.getElementById('customerNameError').textContent;
    const emailError = document.getElementById('customerEmailError').textContent;
    const phoneNumberError = document.getElementById('customerEmailError').textContent;
    if (customerIdError || fullNameError || phoneNumberError || emailValid) {
        return false; // Prevent form submission if there are errors
    }
    return true; // Allow form submission if all fields are valid
}
// Attach the validateForm function to the form submission event
const customerForm = document.querySelector('#customerContainer form');
customerForm.addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if there are errors
    }
});

// Edit fields validation:
// Add event listeners to each input field to trigger validation on blur
document.getElementById('editFullName').addEventListener('blur', validateNameEdit);
document.getElementById('editPhone').addEventListener('blur', validatePhoneEdit);
document.getElementById('editEmail').addEventListener('blur', validateEmailEdit);

validationCustNameEdit = true;
validationCustPhoneEdit = true;
validationCustEmailEdit = true;

// Function to validate full name
function validateNameEdit() {
    const nameInput = document.getElementById('editFullName');
    const nameError = document.getElementById('customerNameErrorEdit'); // Adjusted ID here
    const name = nameInput.value.trim();
    if (name.length < 3 || /\d/.test(name)) {
        nameError.textContent = 'Full Name must be at least 3 characters long and cannot contain digits.';
        disableSubmitButtonEdit();
        validationCustNameEdit = false;
    } else {
        nameError.textContent = '';
        validationCustNameEdit = true;
        if (validationCustNameEdit && validationCustPhoneEdit && validationCustEmailEdit){
            enableSubmitButtonEdit();}
    }
}

// Function to validate phone number
function validatePhoneEdit() {
    const phoneInput = document.getElementById('editPhone');
    const phoneError = document.getElementById('customerPhoneErrorEdit');
    const phone = phoneInput.value.trim();
    if (!/^\d{10}$/.test(phone)) {
        phoneError.textContent = 'Phone number must be 10 digits long and contain only digits.';
        disableSubmitButtonEdit();
        validationCustPhoneEdit = false;
    } else {
        phoneError.textContent = '';
        validationCustPhoneEdit = true;
        if (validationCustNameEdit && validationCustPhoneEdit && validationCustEmailEdit){
            enableSubmitButtonEdit();}
    }
}

// Function to validate email
function validateEmailEdit() {
    const emailInput = document.getElementById('editEmail');
    const emailError = document.getElementById('customerEmailErrorEdit'); // Adjusted ID here
    const email = emailInput.value.trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        disableSubmitButtonEdit();
        validationCustEmailEdit = false;
    }    else {
        emailError.textContent = '';
        validationCustEmailEdit = true;
      if (validationCustNameEdit && validationCustPhoneEdit && validationCustEmailEdit){
        enableSubmitButtonEdit();}
    }
}

// Function to validate all fields before form submission
function validateFormEdit() {
    validateNameEdit();
    validateEmailEdit();

    // Check if any error messages are displayed
    const fullNameError = document.getElementById('customerNameErrorEdit').textContent;
    const emailError = document.getElementById('customerEmailErrorEdit').textContent;
    const phoneNumberError = document.getElementById('customerPhoneErrorEdit').textContent;
    if (fullNameError || phoneNumberError || emailValid) {
        return false; // Prevent form submission if there are errors
    }
    return true; // Allow form submission if all fields are valid
}

// Attach the validateForm function to the form submission event
const customerFormEdit = document.querySelector('#editCustomerContainer form');
customerFormEdit.addEventListener('submit', function(event) {
    if (!validateFormEdit()) {
        event.preventDefault(); // Prevent form submission if there are errors
    }
});