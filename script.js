
const projDetails = document.getElementById('projDetails');
const backButton1 = document.getElementById('backButton1');
const backButton2 = document.getElementById('backButton2');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');

backButton1.style.display = 'none';
backButton2.style.display = 'none';
nextButton.style.display = 'none';
projDetails.style.display = 'none';
submitButton.style.display = 'none';




const projects = {
    project1: ['CDB_MTI_2401', 'MTI Database', '302000', '7', 'Number of businesses helped', '3000'],
    project2: ["IB_MOH_2303", "MOH System", "11200000", "30", "Reduction in patient wait time", "30mins","15mins","17mins","20mins"],
    project3: ["CDB_Govtech_2211", "API Connect", "1500000", "100000000", "Cost savings", "$100 million"]
};





const form = document.querySelector('form');
const start = document.getElementById('start');



form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submission behavior

    // validate projectID
    const projectID = document.getElementById('projectID').value;

    console.log('Form submitted with projectID:', projectID);

    function elementExists(projects, projectID) {
        for (const projectKey in projects) {
            if (projects[projectKey].includes(projectID)) {
                // Pass the array associated with the project ID
                const projectData = projects[projectKey];
                // Call the generateTable function with the project data
                generateTable(projectData);
                // Hide the form
                form.style.display = 'none';
                start.style.display = 'none';
                // Display buttons and para
                backButton1.style.display = 'inline';
                nextButton.style.display = 'inline';
                projDetails.style.display = 'inline';

                // Add functionality to the back button (ensuring it's added only once)
                backButton1.onclick = function() {
                    // Reset the form to clear user input
                    if (form) {
                        form.reset();
                    }
                    // Reload the page to return to the start of JavaScript code
                    location.reload();
                };

                // Add functionality to the next button (ensuring it's added only once)
                nextButton.onclick = function() {
                    addColumnWithInput();
                    nextButton.style.display = 'none';
                    backButton1.style.display = 'none';
                    backButton2.style.display = 'inline';
                    submitButton.style.display = 'inline';
                };

                // Add functionality to backButton2 (ensuring it's added only once)
                backButton2.onclick = function() {
                    removeLastColumn();
                    nextButton.style.display = 'inline';
                    backButton1.style.display = 'inline';
                    backButton2.style.display = 'none';
                    submitButton.style.display = 'none';
                };


                // Add functionality to submitButton (ensuring it's added only once)
                submitButton.onclick = function() {
                    removeLastColumn();
                    nextButton.style.display = 'inline';
                    backButton1.style.display = 'inline';
                    backButton2.style.display = 'none';
                    submitButton.style.display = 'none';
                };
                return; // Exit the function once project ID is found
            }
        }
        alert('Project ID does not exist. Please try again.');
    }

    // Assume `projects` and `projectID` are defined
    elementExists(projects, projectID);
});


// Function to generate the dynamic table
function generateTable(projectData) {
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
}

function addColumnWithInput() {
    const tableContainer = document.getElementById('table-container');
    const table = tableContainer.querySelector('table');
    const columnTitlesArray = ['Project ID', 'Project Name', 'Approved Funding', 'Approved MMF', 'Outcome Metric', 'Target', '6-mth Achievement', '1-yr Achievement', '1.5-yr Achievement', '2-yr Achievement'];

    // Get the index of the last column
    const lastColumnIndex = table.rows[0].cells.length - 1;
    // Get the title for the new column
    const newColumnTitle = columnTitlesArray[lastColumnIndex + 1];

    // Add column title to the header row
    const headerRow = table.rows[0];
    const newHeaderCell = headerRow.insertCell();
    newHeaderCell.textContent = newColumnTitle;

    // Add input fields to each data row in the new column
    const dataRows = table.rows;
    for (let i = 1; i < dataRows.length; i++) {
        const newRowCell = dataRows[i].insertCell();
        const inputField = document.createElement('input');
        inputField.type = 'text';
        newRowCell.appendChild(inputField);
    }
}

function removeLastColumn() {
    const tableContainer = document.getElementById('table-container');
    const table = tableContainer.querySelector('table');

    // Check if there are more than one columns to ensure we don't remove all columns
    if (table.rows[0].cells.length > 1) {
        // Loop through each row and remove the last cell
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].deleteCell(-1);
        }
    } else {
        console.log('Cannot remove the last column.');
    }
}

