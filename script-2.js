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
    const columnTitlesArray = ['Project ID', 'Project Name', 'Approved Funding', 'Approved MMF', 'Outcome Metric', 'Target', '6-mth Achievement', '1-yr Achievement','1.5-yr Achievement', '2-yr Achievement'];
    const columnTitles = columnTitlesArray.slice(0, projectData.length);

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

    // Add functionality to the next button
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // Create a new URLSearchParams object for the next page
            const nextParams = new URLSearchParams();
            nextParams.append('projectData', JSON.stringify(projectData));

            // Redirect to submit.html with the same projectData as a URL parameter
            window.location.href = `submit.html?${nextParams.toString()}`;
        });
    }
});
