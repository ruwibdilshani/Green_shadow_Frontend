// Array to store vehicle data
let vehicles = [];

// Function to show the modal for adding a vehicle
function showAddVehicleModal() {
    const modal = new bootstrap.Modal(document.getElementById('addVehicleModal'));
    modal.show();
}

// Function to add a new vehicle
document.getElementById('addVehicleForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect vehicle data from form fields
    const vehicleCode = document.getElementById('vehicleCode').value;
    const licensePlate = document.getElementById('licensePlate').value;
    const vehicleCategory = document.getElementById('vehicleCategory').value;
    const fuelType = document.getElementById('fuelType').value;
    const status = document.getElementById('status').value;
    const staffDetails = document.getElementById('staffDetails').value;
    const remarks = document.getElementById('remarks').value;

    // Check for empty fields
    if (!vehicleCode || !licensePlate || !vehicleCategory || !fuelType || !status || !staffDetails || !remarks) {
        alert("Please fill in all fields before saving the vehicle.");
        return; // Stop the function execution
    }

    // Create vehicle object if all fields are filled
    const vehicle = {
        code: vehicleCode,
        plate: licensePlate,
        category: vehicleCategory,
        fuel: fuelType,
        status: status,
        staff: staffDetails,
        remarks: remarks,
    };

    // Add the vehicle to the vehicles array
    vehicles.push(vehicle);
    displayVehicles(); // Refresh the vehicle table

    // Show success alert
    alert("Vehicle added successfully!");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addVehicleModal'));
    modal.hide();

    // Reset the form
    this.reset();
});

// Function to display vehicles in the table
function displayVehicles() {
    const tableBody = document.getElementById('vehicleTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    vehicles.forEach((vehicle, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="selectVehicle${index}"></td>
            <td>${vehicle.code}</td>
            <td>${vehicle.plate}</td>
            <td>${vehicle.category}</td>
            <td>${vehicle.fuel}</td>
            <td>${vehicle.status}</td>
            <td>${vehicle.staff}</td>
            <td>${vehicle.remarks}</td>
            <td>
                <button onclick="editVehicle(${index})" class="btn btn-link"><i class="bx bxs-edit" style="color: #000000;"></i></button>

                <button onclick="deleteVehicle(${index})" class="btn btn-link"><i class='bx bxs-trash' style="color: #000000;"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a vehicle
function editVehicle(index) {
    const checkbox = document.getElementById(`selectVehicle${index}`);

    // Check if the checkbox is checked
    if (checkbox && checkbox.checked) {
        // Load the vehicle details into the form fields
        const vehicle = vehicles[index];

        document.getElementById('vehicleCode').value = vehicle.code;
        document.getElementById('licensePlate').value = vehicle.plate;
        document.getElementById('vehicleCategory').value = vehicle.category;
        document.getElementById('fuelType').value = vehicle.fuel;
        document.getElementById('status').value = vehicle.status;
        document.getElementById('staffDetails').value = vehicle.staff;
        document.getElementById('remarks').value = vehicle.remarks;

        // Show the modal for editing
        const modal = new bootstrap.Modal(document.getElementById('addVehicleModal'));
        modal.show();

        // Remove the vehicle from the array when editing
        vehicles.splice(index, 1);
        displayVehicles(); // Refresh the vehicle table
        // Close the modal
            modal.hide();
            // Reset the form
            this.reset();
        alert("Vehicle edited successfully!");
    } else {
        alert("Please select the checkbox to edit the vehicle.");
    }
}

// Function to delete a vehicle
function deleteVehicle(index) {
    const checkbox = document.getElementById(`selectVehicle${index}`);

    if (checkbox && checkbox.checked) {
        vehicles.splice(index, 1); // Remove the vehicle from the array
        displayVehicles(); // Refresh the table
        alert("Vehicle deleted successfully!");
    } else {
        alert("Please select the checkbox to delete the vehicle.");
    }
}
