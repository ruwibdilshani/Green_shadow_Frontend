// Array to store staff data
let staffMembers = [];

// Function to show the modal for adding or editing staff
function showAddStaffModal() {
    const modal = new bootstrap.Modal(document.getElementById('addStaffModal'));
    modal.show();
}

// Function to add a new staff member
document.getElementById('addStaffForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect staff data from form fields
    const staffId = document.getElementById('staffId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const designation = document.getElementById('designation').value;
    const gender = document.getElementById('gender').value;
    const joinedDate = document.getElementById('joinedDate').value;
    const dob = document.getElementById('dob').value;
    const addressLine1 = document.getElementById('addressLine1').value;
    const addressLine2 = document.getElementById('addressLine2').value;
    const addressLine3 = document.getElementById('addressLine3').value;
    const addressLine4 = document.getElementById('addressLine4').value;
    const addressLine5 = document.getElementById('addressLine5').value;
    const contactNo = document.getElementById('contactNo').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const fields = document.getElementById('fields').value || 'N/A';
    const vehicles = document.getElementById('vehicles').value || 'N/A';

    // Check for empty fields
    if (!staffId || !firstName || !lastName || !designation || !gender || !joinedDate || !dob ||
        !addressLine1 || !addressLine2 || !addressLine3 || !addressLine4 || !addressLine5 ||
        !contactNo || !email || !role) {
        alert("Please fill in all fields before saving the staff member.");
        return; // Stop the function execution
    }

    // Create a new staff object
    const staff = {
        id: staffId,
        firstName: firstName,
        lastName: lastName,
        designation: designation,
        gender: gender,
        joinedDate: joinedDate,
        dob: dob,
        address: {
            line1: addressLine1,
            line2: addressLine2,
            line3: addressLine3,
            line4: addressLine4,
            line5: addressLine5,
        },
        contactNo: contactNo,
        email: email,
        role: role,
        fields: fields,
        vehicles: vehicles
    };

    // Add the staff member to the staff array
    staffMembers.push(staff);
    displayStaff(); // Refresh the staff table

    // Show success alert
    alert("Staff added successfully!");

    // Close the modal
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('addStaffModal'));
    modalInstance.hide();

    // Reset the form
    this.reset();
});

// Function to display staff in the table
function displayStaff() {
    const tableBody = document.getElementById('staffTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    staffMembers.forEach((staff, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="selectStaff${index}"></td>
            <td>${staff.id}</td>
            <td>${staff.firstName}</td>
            <td>${staff.lastName}</td>
            <td>${staff.designation}</td>
            <td>${staff.gender}</td>
            <td>${staff.joinedDate}</td>
            <td>${staff.dob}</td>
            <td>${staff.address.line1}, ${staff.address.line2}, ${staff.address.line3}, ${staff.address.line4}, ${staff.address.line5}</td>
            <td>${staff.contactNo}</td>
            <td>${staff.email}</td>
            <td>${staff.role}</td>
            <td>${staff.fields}</td>
            <td>${staff.vehicles}</td>
            <td>
                <button onclick="editStaff(${index})" class="btn btn-link"><i class="bx bxs-edit" style="color: #000000;"></i></button>
                <button onclick="deleteStaff(${index})" class="btn btn-link"><i class='bx bxs-trash' style="color: #000000;"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a staff member
function editStaff(index) {
    const checkbox = document.getElementById(`selectStaff${index}`);

    // Check if the checkbox is checked
    if (checkbox && checkbox.checked) {
        // Load the staff details into the form fields
        const staff = staffMembers[index];

        document.getElementById('staffId').value = staff.id;
        document.getElementById('firstName').value = staff.firstName;
        document.getElementById('lastName').value = staff.lastName;
        document.getElementById('designation').value = staff.designation;
        document.getElementById('gender').value = staff.gender;
        document.getElementById('joinedDate').value = staff.joinedDate;
        document.getElementById('dob').value = staff.dob;
        document.getElementById('addressLine1').value = staff.address.line1;
        document.getElementById('addressLine2').value = staff.address.line2;
        document.getElementById('addressLine3').value = staff.address.line3;
        document.getElementById('addressLine4').value = staff.address.line4;
        document.getElementById('addressLine5').value = staff.address.line5;
        document.getElementById('contactNo').value = staff.contactNo;
        document.getElementById('email').value = staff.email;
        document.getElementById('role').value = staff.role;
        document.getElementById('fields').value = staff.fields;
        document.getElementById('vehicles').value = staff.vehicles;

        // Show the modal for editing
        const modal = new bootstrap.Modal(document.getElementById('addStaffModal'));
        modal.show();

        // Remove the staff from the array while editing
        staffMembers.splice(index, 1);
        displayStaff(); // Refresh the staff table
    } else {
        alert("Please select the checkbox to edit the staff member.");
    }
}

// Function to delete a staff member
function deleteStaff(index) {
    const checkbox = document.getElementById(`selectStaff${index}`);

    if (checkbox && checkbox.checked) {
        staffMembers.splice(index, 1); // Remove the staff member from the array
        displayStaff(); // Refresh the table
        alert("Staff deleted successfully!");
    } else {
        alert("Please select the checkbox to delete the staff member.");
    }
}

// Function to bulk delete selected staff members
function bulkDeleteStaff() {
    const selectedIndexes = [];

    staffMembers.forEach((staff, index) => {
        const checkbox = document.getElementById(`selectStaff${index}`);
        if (checkbox && checkbox.checked) {
            selectedIndexes.push(index);
        }
    });

    if (selectedIndexes.length === 0) {
        alert("Please select staff members to delete.");
        return;
    }

    // Delete the selected staff members
    selectedIndexes.reverse().forEach(index => {
        staffMembers.splice(index, 1);
    });

    displayStaff(); // Refresh the table
    alert("Selected staff members deleted successfully!");
}

function addStaffToTable(data) {
    const tableBody = document.getElementById("staffTableBody");

    // Create a new row with the "new-entry" class
    const row = document.createElement("tr");
    row.classList.add("new-entry");

    // Populate row with data
    row.innerHTML = `
        <td>${data.staffId}</td>
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <!-- Continue adding other data fields here -->
    `;

    // Add row to table body
    tableBody.appendChild(row);

    // Remove "new-entry" class after animation completes
    setTimeout(() => {
        row.classList.remove("new-entry");
    }, 2000); // Match the duration of the fadeHighlight animation
}
