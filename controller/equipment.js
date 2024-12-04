// Array to store equipment data
let equipment = [];

// Function to show the modal for adding an equipment item
function showAddEquipmentModal() {
    const modal = new bootstrap.Modal(document.getElementById('addEquipmentModal'));
    modal.show();
}

// Function to add a new equipment item
document.getElementById('addEquipmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect equipment data from form fields
    const equipmentCode = document.getElementById('equipmentCode').value;
    const equipmentName = document.getElementById('equipmentName').value;
    const equipmentCategory = document.getElementById('equipmentCategory').value;
    const equipmentType = document.getElementById('equipmentType').value;
    const equipmentStatus = document.getElementById('status').value;
    const staffDetails = document.getElementById('staffDetails').value;
    const remarks = document.getElementById('remarks').value;

    // Check for empty fields
    if (!equipmentCode || !equipmentName || !equipmentCategory || !equipmentType || !equipmentStatus || !staffDetails) {
        alert("Please fill in all fields before saving the equipment.");
        return; // Stop the function execution
    }

    // Create equipment object
    const equipmentItem = {
        code: equipmentCode,
        name: equipmentName,
        category: equipmentCategory,
        type: equipmentType,
        status: equipmentStatus,
        staff: staffDetails,
        remarks: remarks
    };

    // Add the equipment to the equipment array
    equipment.push(equipmentItem);
    displayEquipment(); // Refresh the equipment table

    // Show success alert
    alert("Equipment added successfully!");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addEquipmentModal'));
    modal.hide();

    // Reset the form
    this.reset();
});

// Function to display equipment items in the table
function displayEquipment() {
    const tableBody = document.getElementById('equipmentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    equipment.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="selectEquipment${index}"></td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.type}</td>
            <td>${item.status}</td>
            <td>${item.staff}</td>
            <td>${item.remarks}</td>
            <td>
                <button onclick="editEquipment(${index})" class="btn btn-link"><i class="bx bxs-edit" style="color: #000000;"></i></button>
                <button onclick="deleteEquipment(${index})" class="btn btn-link"><i class='bx bxs-trash' style="color: #000000;"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit an equipment item
function editEquipment(index) {
    const checkbox = document.getElementById(`selectEquipment${index}`);

    // Check if the checkbox is checked
    if (checkbox && checkbox.checked) {
        // Load the equipment details into the form fields
        const item = equipment[index];

        document.getElementById('equipmentCode').value = item.code;
        document.getElementById('equipmentName').value = item.name;
        document.getElementById('equipmentCategory').value = item.category;
        document.getElementById('equipmentType').value = item.type;
        document.getElementById('status').value = item.status;
        document.getElementById('staffDetails').value = item.staff;
        document.getElementById('remarks').value = item.remarks;

        // Show the modal for editing
        const modal = new bootstrap.Modal(document.getElementById('addEquipmentModal'));
        modal.show();

        // Remove the equipment from the array when editing
        equipment.splice(index, 1);
        displayEquipment(); // Refresh the equipment table

        alert("Equipment edited successfully!");
    } else {
        alert("Please select the checkbox to edit the equipment.");
    }
}

// Function to delete an equipment item
function deleteEquipment(index) {
    const checkbox = document.getElementById(`selectEquipment${index}`);

    if (checkbox && checkbox.checked) {
        equipment.splice(index, 1); // Remove the equipment from the array
        displayEquipment(); // Refresh the table
        alert("Equipment deleted successfully!");
    } else {
        alert("Please select the checkbox to delete the equipment.");
    }
}
