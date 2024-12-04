// Array to store crop data
let crops = [];

// Function to show the modal for adding a crop
function showAddCropModal() {
    const modal = new bootstrap.Modal(document.getElementById('addCropModal'));
    modal.show();
}

// Function to add a new crop
document.getElementById('addCropForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect crop data from form fields
    const cropCode = document.getElementById('cropCode').value;
    const commonName = document.getElementById('commonName').value;
    const scientificName = document.getElementById('scientificName').value;
    const category = document.getElementById('category').value;
    const season = document.getElementById('season').value;
    const fieldDetails = document.getElementById('fieldDetails').value;
    const cropImage = document.getElementById('cropImage').files[0];

    // Check for empty fields
    if (!cropCode || !commonName || !scientificName || !category || !season || !fieldDetails) {
        alert("Please fill in all fields before saving the crop.");
        return; // Stop the function execution
    }

    // Create crop object if all fields are filled
    const crop = {
        code: cropCode,
        commonName: commonName,
        scientificName: scientificName,
        category: category,
        season: season,
        fieldDetails: fieldDetails,
        image: cropImage ? URL.createObjectURL(cropImage) : null,
    };

    // Add the crop to the crops array
    crops.push(crop);
    displayCrops(); // Refresh the crop table

    // Show success alert
    alert("Crop added successfully!");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addCropModal'));
    modal.hide();

    // Reset the form
    this.reset();
});

// Function to display crops in the table
function displayCrops() {
    const tableBody = document.getElementById('cropTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    crops.forEach((crop, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="selectCrop${index}"></td>
            <td>${crop.code}</td>
            <td>${crop.commonName}</td>
            <td>${crop.scientificName}</td>
            <td>${crop.category}</td>
            <td>${crop.season}</td>
            <td>${crop.fieldDetails}</td>
            <td>${crop.image ? '<img src="' + crop.image + '" width="50">' : 'No Image'}</td>
            <td>
                <button onclick="editCrop(${index})" class="btn btn-link"><i class="bx bxs-edit" style="color: #000000;"></i></button>
                <button onclick="deleteCrop(${index})" class="btn btn-link"><i class='bx bxs-trash' style="color: #000000;"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a crop
function editCrop(index) {
    const checkbox = document.getElementById(`selectCrop${index}`);

    // Check if the checkbox is checked
    if (checkbox && checkbox.checked) {
        // Load the crop details into the form fields
        const crop = crops[index];

        document.getElementById('cropCode').value = crop.code;
        document.getElementById('commonName').value = crop.commonName;
        document.getElementById('scientificName').value = crop.scientificName;
        document.getElementById('category').value = crop.category;
        document.getElementById('season').value = crop.season;
        document.getElementById('fieldDetails').value = crop.fieldDetails;

        // Show the modal for editing
        const modal = new bootstrap.Modal(document.getElementById('addCropModal'));
        modal.show();

        // Remove the crop from the array when editing
        crops.splice(index, 1);
        displayCrops(); // Refresh the crop table

        alert("Crop edited successfully!");
    } else {
        alert("Please select the checkbox to edit the crop.");
    }
}

// Function to delete a crop
function deleteCrop(index) {
    const checkbox = document.getElementById(`selectCrop${index}`);

    if (checkbox&& checkbox.checked) {
        crops.splice(index, 1); // Remove the crop from the array
        displayCrops(); // Refresh the table
        alert("Crop deleted successfully!");
    } else {
        alert("Please select the checkbox to delete the crop.");
    }
}
