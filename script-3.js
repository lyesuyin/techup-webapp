// Execute the code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the array from the URL parameters
    const params = new URLSearchParams(window.location.search);
    let projectData;

    try {
        projectData = JSON.parse(params.get('projectData'));
    } catch (error) {
        console.error('Error parsing project data:', error);
        return;
    }

    if (!projectData || !Array.isArray(projectData)) {
        console.error('Invalid project data');
        return;
    }

    // Define column titles from a separate array
    const columnTitlesArray = ['Project ID', 'Project Name', 'Approved Funding', 'Approved MMF', 'Outcome Metric', 'Target', '6-mth Achievement', '1-yr Achievement', '1.5-yr Achievement', '2-yr Achievement', 'New Column'];
    const columnTitles = columnTitlesArray.slice(0, projectData.length + 1); // Adjust length to include new column

    // Generate the dynamic table
    const table = document.createElement('table');

    // Add column titles as the first row
    const headerRow = table.insertRow();
    for (const title of columnTitles) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = title;
    }

    // Add project data rows
    const dataRow = table.insertRow();
    for (const item of projectData) {
        const cell = dataRow.insertCell();
        cell.textContent = item;
    }

    // Add a new cell in the data row for the input field
    const newCell = dataRow.insertCell();
    const inputField = document.createElement('input');
    inputField.type = 'text';
    newCell.appendChild(inputField);

    // Append the table to a container in your HTML, e.g., <div id="table-container"></div>
    document.getElementById('table-container').appendChild(table);

    // Add functionality to the back button
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Go back to the previous page
            window.history.back();
        });
    }

    const submitButton = document.getElementById('submitButton');
if (submitButton) {
    submitButton.addEventListener('click', function() {
        // Get the input value
        const inputValue = inputField.value;
        
        // Retrieve the projectData array from the URL parameters
        const params = new URLSearchParams(window.location.search);
        let projectData;
        try {
            projectData = JSON.parse(params.get('projectData'));
        } catch (error) {
            console.error('Error parsing project data:', error);
            return;
        }

        // Add the user input into the projectData array
        projectData.push(inputValue);

        // Update the project data in script.js
        window.updateProjectData(projectData);

        // Optional: Navigate to another page or perform additional actions
    });
}
    
});
