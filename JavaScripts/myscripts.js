// home page JavaScript
const popupAddButton = document.getElementById('AddBookPopupButton');
const popupEditButton = document.getElementById('editpopupButton');
const popupEditContainer = document.getElementById('EditContainer');
const popupAddContainer = document.getElementById('AddContainer');
const submitButton = document.getElementById('submitButton');
const cancelAdd = document.getElementById('cancelAdd');
const formDiamond = document.getElementById('BookForm');
const submitEdit = document.getElementById('submitEdit');
const cancelEdit = document.getElementById('CancelEdit');
const popupSellButton = document.getElementById('sellPopupButton');
const popupSellContainer = document.getElementById('SellContainer');
const submitSell = document.getElementById('submitSell');
const cancelSell = document.getElementById('cancelSell');

// Opens add diamond popup.
popupAddButton.addEventListener('click', () => {
    popupAddContainer.style.display = 'block';
    
    const $getButton = $('#getButton');
    const $diamondTable = $('#diamondTable');
    const $certificateNumber = $('#certificateNumber');

    // Add event listener to the "Get" button
    $getButton.click(function() {
        const certNumber = $certificateNumber.val();
        const currentDate = new Date().toLocaleDateString();

        $.ajax({
            type: 'POST',
            url: 'get_data.php',
            data: { report_number: certNumber },
            dataType: 'json',
            success: function(data) {
                if (!data.error) {
                    // Clear previous data and populate the table
                    $diamondTable.find('tbody').empty();
                    const newRow = `
                        <tr>
                            <td>${certNumber}</td>
                            <td>${data.shape_and_cutting_style}</td>
                            <td>${data.measurements}</td>
                            <td>${data.carat_weight}</td>
                            <td>${data.color_grade}</td>
                            <td>${data.clarity_grade}</td>
                            <td>${data.cut_grade}</td>
                            <td>${data.polish}</td>
                            <td>${data.symmetry}</td>
                            <td>${currentDate}</td>
                        </tr>`;
                    $diamondTable.find('tbody').append(newRow);
                    $diamondTable.show();
                } else {
                    alert(data.error); // Display an error message if fetching fails
                }
            },
            error: function(xhr, status, error) {
                alert('An error occurred while fetching data.');
                console.error(error);
            }
        });
        submitButton.style.display = "block";
        getButton.disabled = true; // Disable the main button
    });
    submitButton.addEventListener('click', () => {
        const certNumber = $certificateNumber.val();
        const $successMessage = $('#successMessage')

        // Make an AJAX call to trigger the api_handler.php file
        $.ajax({
            type: 'POST',
            url: 'api_handler.php',
            data: { report_number: certNumber },
            success: function(response) {
                // Handle the response from api_handler.php if needed
                console.log(response);
                if (response === 'success') {
                    $successMessage.show();
                } else {
                    $successMessage.hide();
                }
            },
            error: function(xhr, status, error) {
                alert('An error occurred while submitting data.');
                console.error(error);
            }
        });
        
        popupAddContainer.style.display = "none";
        setTimeout(function(){
            location.reload();
        }, 1500);
    });
    
    cancelAdd.addEventListener('click', () => {
        popupAddContainer.style.display = 'none';
        document.getElementById("certificateNumber").value = '';
        hideSubmitButton(); // Call the function to hide the "Submit" button
        getButton.disabled = false;
        document.getElementById("diamondTable").style.display = 'none';
    });
    
});

// Define the openEditPopup function
function openEditPopup(diamondId) {
    popupEditContainer.style.display = "block";
    // Set the diamond ID in the edit popup input field
    document.getElementById('certificateNumberEdit').value = diamondId;

    // Make an AJAX call to retrieve diamond data
    fetch(`get_diamond_edit_pp.php?diamond_id=${diamondId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("cid").value = data.diamond_id;
            document.getElementById("shape").value = data.shape_cutting_style;
            document.getElementById("Measurements").value = data.measurements;
            document.getElementById("Weight").value = data.weight;
            document.getElementById("Color").value = data.color;
            document.getElementById("Clarity").value = data.clarity;
            document.getElementById("Cut").value = data.cut;
            document.getElementById("Polish").value = data.polish;
            document.getElementById("Symmetry").value = data.symmetry;
            document.getElementById("Price").value = data.price_per_carat;
            
            // Calculate total price based on weight and price per carat
            const weightValue = parseFloat(data.weight); // Extract the numeric value
            const pricePerCaratValue = parseFloat(data.price_per_carat);
            const totalPrice = isNaN(weightValue) || isNaN(pricePerCaratValue) ? 0 : (weightValue * pricePerCaratValue);
            document.getElementById("TotalPrice").value = totalPrice.toFixed(2);
            
            document.getElementById("Date").value = data.inserted_date;
            document.getElementById("status").value = data.status;
            document.getElementById("consignment_customer").value = data.cos_cust;
            document.getElementById("buyer_customer").value = data.sold_cust;
        })
        .catch(error => console.error("Error fetching data:", error));
    
    
    // Add an event listener for the "Price Per Carat" input field
    const pricePerCaratInput = document.getElementById("Price");
    pricePerCaratInput.addEventListener("input", updateTotalPrice);

    function updateTotalPrice() {
        const weightValue = parseFloat(document.getElementById("Weight").value);
        const pricePerCaratValue = parseFloat(pricePerCaratInput.value);
        const totalPrice = isNaN(weightValue) || isNaN(pricePerCaratValue) ? 0 : (weightValue * pricePerCaratValue);
        document.getElementById("TotalPrice").value = totalPrice.toFixed(2);
    }
    
    // Display the edit popup
    submitEdit.style.display = "block";
    
    // Add an event listener for the "Cancel" button in the edit popup
    cancelEdit.addEventListener('click', () => {
        // Hide the edit popup and reset input fields
        popupEditContainer.style.display = "none";
        submitEdit.style.display = "none";
        resetEditPopupFields(); // Call a function to reset the input fields
    });
}

// Add an event listener for the "Edit" buttons
const editButtons = document.querySelectorAll('.edit-button');

// editButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const diamondId = button.getAttribute('data-diamond-id');
//         openEditPopup(diamondId);
//     });
// });

// Opens Edit popup
popupEditButton.addEventListener('click', () => {
    popupEditContainer.style.display = 'block';
    const getButtonEdit = document.getElementById('getButtonEdit');
    const diamondId = document.getElementById("certificateNumberEdit");
    
    getButtonEdit.addEventListener("click", function () {
        const diamondId = document.getElementById("certificateNumberEdit").value;
        // Make an AJAX call to retrieve diamond data
        fetch(`get_diamond_edit_pp.php?diamond_id=${diamondId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("cid").value = data.diamond_id;
                document.getElementById("shape").value = data.shape_cutting_style;
                document.getElementById("Measurements").value = data.measurements;
                document.getElementById("Weight").value = data.weight;
                document.getElementById("Color").value = data.color;
                document.getElementById("Clarity").value = data.clarity;
                document.getElementById("Cut").value = data.cut;
                document.getElementById("Polish").value = data.polish;
                document.getElementById("Symmetry").value = data.symmetry;
                document.getElementById("Price").value = data.price_per_carat;
                
                // Calculate total price based on weight and price per carat
                const weightValue = parseFloat(data.weight); // Extract the numeric value
                const pricePerCaratValue = parseFloat(data.price_per_carat);
                const totalPrice = isNaN(weightValue) || isNaN(pricePerCaratValue) ? 0 : (weightValue * pricePerCaratValue);
                document.getElementById("TotalPrice").value = totalPrice.toFixed(2);
                
                document.getElementById("Date").value = data.inserted_date;
                document.getElementById("status").value = data.status;
                document.getElementById("consignment_customer").value = data.cos_cust;
                document.getElementById("buyer_customer").value = data.sold_cust;
            })
            .catch(error => console.error("Error fetching data:", error));
        submitEdit.style.display = "block";
        getButtonEdit.removeEventListener("click", arguments.callee);
        
    });
    
    // Add an event listener for the "Price Per Carat" input field
    const pricePerCaratInput = document.getElementById("Price");
    pricePerCaratInput.addEventListener("input", updateTotalPrice);

    function updateTotalPrice() {
        const weightValue = parseFloat(document.getElementById("Weight").value);
        const pricePerCaratValue = parseFloat(pricePerCaratInput.value);
        const totalPrice = isNaN(weightValue) || isNaN(pricePerCaratValue) ? 0 : (weightValue * pricePerCaratValue);
        document.getElementById("TotalPrice").value = totalPrice.toFixed(2);
    }
    
    
    
    // Assuming you have a submit button with the id "submitEdit"
    const submitEditButton = document.getElementById("submitEdit");
    
    submitEditButton.addEventListener("click", function () {
        // Get the values you want to update
        const diamondId = document.getElementById("cid").value;
        const shape = document.getElementById("shape").value;
        const measurements = document.getElementById("Measurements").value;
        const weight = document.getElementById("Weight").value;
        const color = document.getElementById("Color").value;
        const clarity = document.getElementById("Clarity").value;
        const cut = document.getElementById("Cut").value;
        const polish = document.getElementById("Polish").value;
        const symmetry = document.getElementById("Symmetry").value;
        const pricePerCarat = document.getElementById("Price").value;
        const totalPrice = document.getElementById("TotalPrice").value;
        const date = document.getElementById("Date").value;
        const status = document.getElementById("status").value;
        const consignmentCustomer = document.getElementById("consignment_customer").value;
        const buyerCustomer = document.getElementById("buyer_customer").value;
    
        // Prepare the data to send to the PHP file
        const formData = new FormData();
        formData.append("diamondId", diamondId);
        formData.append("shape", shape);
        formData.append("measurements", measurements);
        formData.append("weight", weight);
        formData.append("color", color);
        formData.append("clarity", clarity);
        formData.append("cut", cut);
        formData.append("polish", polish);
        formData.append("symmetry", symmetry);
        formData.append("pricePerCarat", pricePerCarat);
        formData.append("totalPrice", totalPrice);
        formData.append("date", date);
        formData.append("status", status);
        formData.append("consignmentCustomer", consignmentCustomer);
        formData.append("buyerCustomer", buyerCustomer);
    
        // Make an AJAX request to update the diamond data
        fetch("update_diamond.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the PHP file
                console.log(data);
                // You can add further handling or notifications here
            })
            .catch(error => console.error("Error updating data:", error));
        
        popupEditContainer.style.display = "none";
        location.reload();
        
    });

});


// opens sell popup
popupSellButton.addEventListener('click', () => {
    popupSellContainer.style.display = 'block';
    
    // Assuming you have a getButton event listener like this
    const getButtonSell = document.getElementById('getButtonSell');
    const certificateNumberInput = document.getElementById("certificateNumberSell");
    const customerIdSelect = document.getElementById("customerId");
    const priceInput = document.getElementById("price");
    const VATInput = document.getElementById("VAT");
    const finalPriceInput = document.getElementById("FinalPrice");
    
    // Function to toggle the visibility of the submit button
    function toggleSubmitButtonVisibility() {
        const certificateNumber = certificateNumberInput.value;
        const selectedCustomerId = customerIdSelect.value;
    
        if (certificateNumber !== "none" && selectedCustomerId !== "none") {
            submitSell.style.display = "block";
        } else {
            submitSell.style.display = "none";
        }
    }
    
    customerIdSelect.addEventListener("change", toggleSubmitButtonVisibility);
    
    getButtonSell.addEventListener("click", function () {
        const certificateNumber = certificateNumberInput.value;
        // Make an AJAX call to retrieve diamond data
        fetch(`get_diamond_edit_pp.php?diamond_id=${certificateNumber}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Update the price field with the total_price from the data
                priceInput.value = data.total_price;
    
                // Calculate VAT and final price
                const totalPrice = parseFloat(data.total_price);
                if (!isNaN(totalPrice)) {
                    const vatRate = 1.17; // 17%
                    const finalPrice = totalPrice * vatRate;

                    finalPriceInput.value = finalPrice.toFixed(2);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
        toggleSubmitButtonVisibility(); // Update button visibility
    });
    
    
    submitSell.addEventListener("click", function () {
        // Get the values you want to insert into the sales database
        const certificateNumber = certificateNumberInput.value;
        const customerId = customerIdSelect.value;
        const finalPrice = parseFloat(finalPriceInput.value);
    
        // Create an object to hold the data
        const saleData = {
            certificateNumber,
            customerId,
            finalPrice
        };
    
        // Make an AJAX request to insert the data into the sales database
        fetch("insert_new_sale.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saleData)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the PHP file (e.g., display a success message)
                console.log(data);
                // You can add further handling or notifications here
            })
            .catch(error => console.error("Error inserting data:", error));
        
        popupSellContainer.style.display = "none";
        location.reload();
    });
    
});

cancelAdd.addEventListener('click', () => {
    popupAddContainer.style.display = 'none';
    document.getElementById("certificateNumber").value = '';
    hideSubmitButton(); // Call the function to hide the "Submit" button
    getButton.disabled = false;
    document.getElementById("diamondTable").style.display = 'none';
});

cancelEdit.addEventListener('click', () => {
    // Hide the edit popup and reset input fields
    popupEditContainer.style.display = "none";
    submitEdit.style.display = "none";
    resetEditPopupFields(); // Call a function to reset the input fields
});

cancelSell.addEventListener('click', () => {
    const certificateNumberInput = document.getElementById("certificateNumberSell");
    const customerIdSelect = document.getElementById("customerId");
    const priceInput = document.getElementById("price");
    const finalPriceInput = document.getElementById("FinalPrice");
    
    popupSellContainer.style.display = 'none';
    submitSell.style.display = 'none';
    certificateNumberInput.value = '';
    priceInput.value = '';
    finalPriceInput.value = '';
    customerIdSelect.value = 'none'; // Reset the customer dropdown

});

// sleep function for reloading after submiting
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// reset fields after cacelation function
function resetEditPopupFields() {
    document.getElementById("certificateNumberEdit").value = '';
    document.getElementById("cid").value = '';
    document.getElementById("shape").value = '';
    document.getElementById("Measurements").value = '';
    document.getElementById("Weight").value = '';
    document.getElementById("Color").value = '';
    document.getElementById("Clarity").value = '';
    document.getElementById("Cut").value = '';
    document.getElementById("Polish").value = '';
    document.getElementById("Symmetry").value = '';
    document.getElementById("Price").value = '';
    document.getElementById("TotalPrice").value = '';
    document.getElementById("Date").value = '';
    document.getElementById("status").value = '';
    document.getElementById("consignment_customer").value = '';
    document.getElementById("buyer_customer").value = '';
}