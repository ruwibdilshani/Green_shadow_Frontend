// Array to store field data
let fields = [];

// Function to show the modal for adding a field
function showAddFieldModal() {
    const modal = new bootstrap.Modal(document.getElementById('addFieldModal'));
    modal.show();
}

// Function to add a new field
document.getElementById('addFieldForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect field data from form fields
    const fieldCode = document.getElementById('fieldCode').value;
    const fieldName = document.getElementById('fieldName').value;
    const fieldLocation = document.getElementById('fieldLocation').value;
    const fieldSize = document.getElementById('fieldSize').value;
    const crops = document.getElementById('crops').value;
    const staff = document.getElementById('staff').value;
    const fieldImage1 = document.getElementById('fieldImage1').files[0];
    const fieldImage2 = document.getElementById('fieldImage2').files[0];

    // Check for empty fields
    if (!fieldCode || !fieldName || !fieldLocation || !fieldSize || !crops || !staff) {
        alert("Please fill in all fields before saving the field.");
        return; // Stop the function execution
    }

    // Create field object if all fields are filled
    const field = {
        code: fieldCode,
        name: fieldName,
        location: fieldLocation,
        size: fieldSize,
        crops: crops,
        staff: staff,
        image1: fieldImage1 ? URL.createObjectURL(fieldImage1) : null,
        image2: fieldImage2 ? URL.createObjectURL(fieldImage2) : null
    };

    // Add the field to the fields array
    fields.push(field);
    displayFields(); // Refresh the field table

    // Show success alert
    alert("Field added successfully!");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addFieldModal'));
    modal.hide();

    // Reset the form
    this.reset();
});

// Function to display fields in the table
function displayFields() {
    const tableBody = document.getElementById('fieldTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    fields.forEach((field, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="selectField${index}"></td>
            <td>${field.code}</td>
            <td>${field.name}</td>
            <td>${field.location}</td>
            <td>${field.size}</td>
            <td>${field.crops}</td>
            <td>${field.staff}</td>
            <td>${field.image1 ? '<img src="' + field.image1 + '" width="50">' : 'No Image'}</td>
            <td>${field.image2 ? '<img src="' + field.image2 + '" width="50">' : 'No Image'}</td>
            <td>
                <button onclick="editField(${index})" class="btn btn-link"><i class="bx bxs-edit" style="color: #000000;"></i></button>
                <button onclick="deleteField(${index})" class="btn btn-link"><i class='bx bxs-trash' style="color: #000000;"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a field
function editField(index) {
    const checkbox = document.getElementById(`selectField${index}`);

    // Check if the checkbox is checked
    if (checkbox && checkbox.checked) {
        // Load the field details into the form fields
        const field = fields[index];

        document.getElementById('fieldCode').value = field.code;
        document.getElementById('fieldName').value = field.name;
        document.getElementById('fieldLocation').value = field.location;
        document.getElementById('fieldSize').value = field.size;
        document.getElementById('crops').value = field.crops;
        document.getElementById('staff').value = field.staff;

        // Show the modal for editing
        const modal = new bootstrap.Modal(document.getElementById('addFieldModal'));
        modal.show();

        // Remove the field from the array while editing
        fields.splice(index, 1);
        displayFields(); // Refresh the field table

        alert("Field edited successfully!");
    } else {
        alert("Please select the checkbox to edit the field.");
    }
}

// Function to delete a field
function deleteField(index) {
    const checkbox = document.getElementById(`selectField${index}`);

    if (checkbox && checkbox.checked) {
        fields.splice(index, 1); // Remove the field from the array
        displayFields(); // Refresh the table
        alert("Field deleted successfully!");
    } else {
        alert("Please select the checkbox to delete the field.");
    }
}
