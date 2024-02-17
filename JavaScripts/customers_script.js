console.log("hello");

const editButtons = document.querySelectorAll('.edit-button');

const addCustomerPopupButton = document.getElementById('AddCustomerPopupButton');
const customerContainer = document.getElementById('customerContainer');
const submitcust = document.getElementById('submitCust');
const cancelcust = document.getElementById('cancelCust');

// Get the confirmation modal and its buttons
const editCustomerContainer = document.getElementById('editCustomerContainer');
const submitEditButton = document.getElementById('submitEdit');
const cancelDeleteButton = document.getElementById('CancelEdit');

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



// fuction which triggers customer insertation into the database after the user press submit
submitCust.addEventListener('click', function () {
    // Get user input values
    const customerId = document.getElementById('customerId').value;
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Define the PHP script URL
    const phpScriptURL = 'add_customer.php';

    // Create a FormData object to send data to the server
    const formData = new FormData();
    formData.append('customerId', customerId);
    formData.append('fullName', fullName);
    formData.append('phone', phoneNumber);
    formData.append('email', email);
    

    // Configure the request
    xhr.open('POST', phpScriptURL, true);

    // Set up a callback function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            // The request was successful, and you can handle the response here
            alert(xhr.responseText); // Show the response in an alert (you can customize this)
            
            // Close the popup
            customerContainer.style.display = 'none';
            location.reload();
            
            // Clear input fields if needed
            document.getElementById('customerId').value = '';
            document.getElementById('fullName').value = '';
            document.getElementById('phoneNumber').value = '';
            document.getElementById('email').value = '';
        } else {
            // Handle the request error
            alert('Error: ' + xhr.status);
        }
    };

    // Send the request with the form data
    xhr.send(formData);
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


// Variable to store the ID of the customer that will be edited
let customerIdToEdit;  //bookIdToDelete


// Function to open the confirmation modal
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

            // Populate edit popup fields with customer details
            document.getElementById('editCustomerId').value = customerId;
            document.getElementById('editFullName').value = data.fullName;
            document.getElementById('editPhone').value = data.phone;
            document.getElementById('editEmail').value = data.email;
        })
        .catch(error => console.error("Error fetching customer details:", error));

    editCustomerContainer.style.display = 'block';
}

// Function to close the confirmation modal
function closeEditConfirmationPopup() {
    editCustomerContainer.style.display = 'none';
}

// Add click event listeners to all delete buttons
editButtons.forEach(button => {
    
    button.addEventListener('click', () => {
        console.log("Edit button clicked");

        const customerId = button.getAttribute('data-customer-id');
        console.log(customerId);
        openEditCustomerContainer(customerId);
    });
});

// Add click event listeners to the popup buttons
submitEditButton.addEventListener('click', () => {
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

    // Make an AJAX call to the server
    fetch('update_customer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle the result from the server
        console.log(result);
        // You can add further handling or notifications here
    })
    .catch(error => console.error("Error updating customer record:", error));
    location.reload();
    closeEditConfirmationPopup();
    
    setTimeout(function() {
            closeEditConfirmationPopup();
            location.reload();
        }, 1200); // Adjust the delay time (in milliseconds) as needed
});

cancelDeleteButton.addEventListener('click', () => {
    // Close the confirmation modal if the user clicks "No"
    closeEditConfirmationPopup();
});


// function that enables the search text box for quick customer lookup
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

// Triggers customer table sorting by Full name column
document.addEventListener("DOMContentLoaded", function () {
    // Sort the table by "Full Name" column by default
    sortTable(2);

});

// Sorting function for customers table
function sortTable(columnIndex) {
    const table = document.getElementById("customerTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = Array.from(tbody.getElementsByTagName("tr"));

    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName("td")[columnIndex - 1].textContent;
        const bValue = b.getElementsByTagName("td")[columnIndex - 1].textContent;
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


// Add fields validation:
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

    if (customerId.length < 3 || !/^\d+$/.test(customerId)) {
        customerIdError.textContent = 'Customer ID must be at least 3 digits long and contain only digits.';
        disableSubmitButton();
        validationCustId = false;

    } else {
        customerIdError.textContent = '';
        validationCustId = true;
        console.log("Valid ID");


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
        console.log("Valid name");

        
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
        console.log("Valid phone");

        
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
        console.log("Valid email");

        
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

    console.log("test1");

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

// Function to validate full name - Add
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
        console.log("Valid name");

        
        if (validationCustNameEdit && validationCustPhoneEdit && validationCustEmailEdit){
            console.log("enable Submit Button Edit")
            enableSubmitButtonEdit();}
    }
}

// Function to validate phone number - Add
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
        console.log("Valid phone");

        
        if (validationCustNameEdit && validationCustPhoneEdit && validationCustEmailEdit){
            console.log("enable Submit Button Edit")
            enableSubmitButtonEdit();}
    }
}

// Function to validate email - Add
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
        console.log("Valid email");

        
      if (validationCustNameEdit && validationCustPhoneEdit && validationCustEmailEdit){
          console.log("enable Submit Button Edit")
        enableSubmitButtonEdit();}
    }
}


// Function to validate all fields before form submission - Add
function validateFormEdit() {
    validateCustomerIdEdit();
    validateNameEdit();
    validateEmailEdit();

    // Check if any error messages are displayed
    const fullNameError = document.getElementById('customerNameErrorEdit').textContent;
    const emailError = document.getElementById('customerEmailErrorEdit').textContent;
    const phoneNumberError = document.getElementById('customerPhoneErrorEdit').textContent;

    console.log("test1");

    if (fullNameError || phoneNumberError || emailValid) {
        return false; // Prevent form submission if there are errors
    }
    return true; // Allow form submission if all fields are valid
}

// Attach the validateForm function to the form submission event
const customerFormEdit = document.querySelector('#customerContainer form');
customerFormEdit.addEventListener('submit', function(event) {
    if (!validateFormEdit()) {
        event.preventDefault(); // Prevent form submission if there are errors
    }
});