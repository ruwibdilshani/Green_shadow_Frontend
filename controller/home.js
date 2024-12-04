// Fetch data dynamically
document.addEventListener("DOMContentLoaded", () => {
    // Mock API endpoints (Replace with your API endpoints)
    const cropSummaryEndpoint = '/api/crop-summary';
    const equipmentSummaryEndpoint = '/api/equipment-summary';
    const cropDataEndpoint = '/api/crop-data';

    // Fetch and display crop summary
    fetch(cropSummaryEndpoint)
        .then(response => response.json())
        .then(data => {
            document.getElementById('crop-count').textContent = data.totalCrops;
        })
        .catch(() => {
            document.getElementById('crop-count').textContent = 'Error!';
        });

    // Fetch and display equipment summary
    fetch(equipmentSummaryEndpoint)
        .then(response => response.json())
        .then(data => {
            document.getElementById('equipment-count').textContent = data.totalEquipment;
        })
        .catch(() => {
            document.getElementById('equipment-count').textContent = 'Error!';
        });

    // Fetch and display crop data
    fetch(cropDataEndpoint)
        .then(response => response.json())
        .then(data => {
            const cropTable = document.getElementById('crop-data');
            cropTable.innerHTML = ''; // Clear loading text
            data.forEach(crop => {
                const row = `<tr>
                      <td>${crop.cropType}</td>
                      <td>${crop.growthStage}</td>
                      <td>${crop.totalExtent}</td>
                      <td>${crop.fieldObservations}</td>
                    </tr>`;
                cropTable.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(() => {
            const cropTable = document.getElementById('crop-data');
            cropTable.innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
        });
    // Dynamic Charts with Chart.js
    document.addEventListener("DOMContentLoaded", () => {
        // Mock API endpoints (Replace with actual endpoints)
        const cropGrowthEndpoint = '/api/crop-growth-stages';
        const equipmentCategoryEndpoint = '/api/equipment-category';

        // Fetch and display crop growth chart
        fetch(cropGrowthEndpoint)
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('cropGrowthChart').getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.labels, // Example: ['Seeding', 'Flowering', 'Harvest']
                        datasets: [{
                            label: 'Growth Stages',
                            data: data.values, // Example: [10, 20, 15]
                            backgroundColor: ['#81ecec', '#74b9ff', '#fab1a0'],
                            borderColor: '#2d3436',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            },
                            title: {
                                display: true,
                                text: 'Crop Growth Stages'
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error loading crop growth chart:', error));

        // Fetch and display equipment category chart
        fetch(equipmentCategoryEndpoint)
            .then(response => response.json())
            .then(data => {
                const ctx = document.getElementById('equipmentCategoryChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data.labels, // Example: ['Tractors', 'Plows', 'Sprayers']
                        datasets: [{
                            label: 'Total Equipment',
                            data: data.values, // Example: [5, 8, 3]
                            backgroundColor: '#74b9ff',
                            borderColor: '#2d3436',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Equipment Categories'
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Total Count'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Equipment by Category'
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error loading equipment category chart:', error));
    });

});
