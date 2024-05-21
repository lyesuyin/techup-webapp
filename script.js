//define project data 
const projects = {
    'CDB_MTI_2401': ['CDB_MTI_2401', 'MTI Database', '302000', '7', 'Number of businesses helped', '3000'],
    'IB_MOH_2303': ['IB_MOH_2303', 'MOH System', "11200000", "30", "Reduction in patient wait time", "30mins","15mins","17mins","20mins"],
    'CDB_Govtech_2211': ['CDB_Govtech_2211', "API Connect", "1500000", "100000000", "Cost savings", "$100 million"]
};

const userCredentials = {
    'user1': 'hi',
    'user2': 'password2',
    'user3': 'password3'
};


//define buttons 
const projDetails = document.getElementById('projDetails');
const thankYou = document.getElementById('thankYou');
const submit = document.getElementById('submit');
const backButton1 = document.getElementById('backButton1');
const backButton2 = document.getElementById('backButton2');
const backButton3 = document.getElementById('backButton3');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const newFormButton = document.getElementById('newFormButton');
const userCredentialsForm = document.getElementById('userCredentialsForm');
const membersWelcome = document.getElementById('membersWelcome');
const membersTable = document.getElementById('membersTable');
const logIn = document.getElementById('logIn');
const logOut = document.getElementById('logOut');



//hide buttons not used on 1st page
backButton1.style.display = 'none';
submit.style.display = 'none';
backButton2.style.display = 'none';
backButton3.style.display = 'none';
nextButton.style.display = 'none';
projDetails.style.display = 'none';
thankYou.style.display = 'none';
submitButton.style.display = 'none';
newFormButton.style.display = 'none';
userCredentialsForm.style.display = 'none';
membersTable.style.display = 'none';
logOut.style.display = 'none';
membersWelcome.style.display = 'none';

//define form at add functionality to button when user submits projectid
const form = document.getElementById('projectIDForm');
const start = document.getElementById('start');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submission behavior

    // Validate projectID
    const projectID = document.getElementById('projectID').value;

    console.log('Form submitted with projectID:', projectID);

    // Call elementExists function
    elementExists(projects, projectID);
});


function elementExists(projects, projectID) {

    for (const projectKey in projects) {
    
        

        if (projects[projectKey].includes(projectID)) {
            // Pass the array associated with the project ID
            const projectData = projects[projectKey];
            // Call the generateTable function with the project data
            generateTable(projectData, projectID);
            // Hide the form
            form.style.display = 'none';
            start.style.display = 'none';
            logIn.style.display = 'none';
            // Display buttons and para
            backButton1.style.display = 'inline';
            nextButton.style.display = 'inline';
            projDetails.style.display = 'inline';

            // Add functionality to the back button (ensuring it's added only once)
            backButton1.onclick = function() {
                // Reset the form to clear user input
                resetForm()
            };

            // Add functionality to the next button (ensuring it's added only once)
            nextButton.onclick = function() {
                addColumnWithInput(projectID);
                nextButton.style.display = 'none';
                backButton1.style.display = 'none';
                backButton2.style.display = 'inline';
                submitButton.style.display = 'inline';
                projDetails.style.display = 'none';
                submit.style.display = 'inline';
            };

            // Add functionality to backButton2 (ensuring it's added only once)
            backButton2.onclick = function() {
                removeLastColumn();
                nextButton.style.display = 'inline';
                backButton1.style.display = 'inline';
                backButton2.style.display = 'none';
                submitButton.style.display = 'none';
                projDetails.style.display = 'inline';
                submit.style.display = 'none';
            };

            submitButton.onclick = function() {
                const userInput = document.getElementById('inputField').value.trim();
                // Validate user input
                if (!userInput) {
                    alert('User input is empty. Please enter some data.');
                    return; // Abort the function if user input is empty
                }
                const confirmed = confirm(`Are you sure you want to save "${userInput}"?`);
                if (!confirmed) {
                    // User cancelled the operation
                    return;
                }
                handleSubmitButtonClick(projectID);
                regenerateTable(projectID);
                thankYou.style.display = 'inline';
                newFormButton.style.display = 'inline';
                projDetails.style.display = 'none';
                backButton2.style.display = 'none';
                submitButton.style.display = 'none';
                submit.style.display = 'none';
            };

            newFormButton.onclick = function() {
                resetForm();
                thankYou.style.display = 'none';
                newFormButton.style.display = 'none';
            };

            return; // Exit the function once project ID is found
        }
    }
}



// Function to generate the dynamic table
function generateTable(projectData,projectID) {
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

function addColumnWithInput(projectID) {
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
        inputField.id = 'inputField'; 
        newRowCell.appendChild(inputField);
    }}

    function handleSubmitButtonClick(projectID) {
        // Assuming userInput contains the new value to be added
        const userInput = document.getElementById('inputField').value.trim(); 
    
        // Validate user input
        if (!userInput) {
            alert('User input is empty. Please enter some data.');
            return; // Abort the function if user input is empty
        }
    
        // Ask for user confirmation
        const confirmed = confirm(`Are you sure you want to save "${userInput}"?`);
    
        if (!confirmed) {
            // User cancelled the operation
            return;
        }
    
        // Check if the projectID exists in the projects object
        if (!projects.hasOwnProperty(projectID)) {
            console.log(`Project ID "${projectID}" not found in the projects object.`);
            console.log('Available Project IDs:', Object.keys(projects));
            return; // Abort the function if projectID does not exist
        }
    
        // Push user input into the relevant array in the projects object
        projects[projectID].push(userInput);
        console.log('Updated projects:', projects);
        console.log('User input saved successfully!');
    }
    
    

    
function regenerateTable(projectID) {
    const updatedData = projects[projectID]; // Get the updated array

    // Hard code the updatedData into the projects object
    projects[projectID] = updatedData;

    const tableContainer = document.getElementById('table-container');
    
    // Clear existing table
    tableContainer.innerHTML = '';

    // Generate new table with updated data
    generateTable(updatedData);
}

    function resetForm() {
        // Reset the form to clear user input
        if (form) {
            form.reset();
        }
        // Show the form again
        form.style.display = 'block';
        start.style.display = 'block';
        // Hide the table and buttons
        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = ''; // Clear the table
        backButton1.style.display = 'none';
        backButton2.style.display = 'none';
        nextButton.style.display = 'none';
        projDetails.style.display = 'none';
        submitButton.style.display = 'none';
        logIn.style.display = 'inline';
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

function generateFullTable(projects) {
    // Find the maximum number of items in any project array
    let maxItems = 0;
    for (const projectKey in projects) {
        const projectData = projects[projectKey];
        maxItems = Math.max(maxItems, projectData.length);
    }

    // Define column titles based on the maximum number of items
    const columnTitles = ['Project ID', 'Project Name', 'Approved Funding', 'Approved MMF', 'Outcome Metric', 'Target', '6-mth Achievement', '1-yr Achievement', '1.5-yr Achievement', '2-yr Achievement'].slice(0, maxItems);

    // Generate the dynamic table
    const table = document.createElement('table');

    // Add column titles as the first row
    const headerRow = table.insertRow();
    for (const title of columnTitles) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = title;
    }

    // Add project data rows
    for (const projectKey in projects) {
        const projectData = projects[projectKey];
        const dataRow = table.insertRow();
        for (let i = 0; i < maxItems; i++) {
            const cell = dataRow.insertCell();
            cell.textContent = projectData[i] || '-'; // Show '-' for empty cells
        }
    }

    // Append the table to a container in your HTML, e.g., <div id="table-container"></div>
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Clear previous content
    tableContainer.appendChild(table);
}



// Add event listener for form submission
userCredentialsForm.addEventListener('submit', handleUserCredentialsSubmit);

function handleUserCredentialsSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const userID = document.getElementById('userID').value;
    const password = document.getElementById('password').value;

    // Check if the userID exists in the userCredentials object
    if (userCredentials.hasOwnProperty(userID)) {
        // Check if the entered password matches the associated password
        if (userCredentials[userID] === password) {
            // Run your function if both userID and password are valid
            runFunctionForValidCredentials();
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('Invalid userID. Please try again.');
    }
    return false; 
}

// Add functionality to logIn button
logIn.addEventListener('click', function() {
    form.style.display = 'none';
    userCredentialsForm.style.display = 'block';
    // Reset the form if necessary
    if (userCredentialsForm) {
        userCredentialsForm.reset();
    }
    membersWelcome.style.display = 'inline';
    logIn.style.display = 'none';
    start.style.display = 'none';
    backButton3.style.display = 'inline';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('h3').style.display = 'none';
    logInButton.style.display = 'none';
});

// Add functionality to logIn button
backButton3.addEventListener('click', function() {
    form.style.display = 'block';
    userCredentialsForm.style.display = 'none';
    // Reset the form if necessary
    if (userCredentialsForm) {
        userCredentialsForm.reset();
    }
    membersWelcome.style.display = 'none';
    logIn.style.display = 'inline';
    start.style.display = 'inline';
    backButton3.style.display = 'none';
    document.querySelector('h1').style.display = 'inline';
    document.querySelector('h3').style.display = 'inline';
    logInButton.style.display = 'inline';
});




function runFunctionForValidCredentials() {
    generateFullTable(projects);

    // Hide the form
    document.getElementById('userCredentialsForm').style.display = 'none';
    logIn.style.display = 'none';

    // Hide the welcome message (if any)
    document.getElementById('membersWelcome').style.display = "none";
    backButton3.style.display = 'none';

    // Display the members table and logout button
    document.getElementById('membersTable').style.display = "inline";
    document.getElementById('logOut').style.display = 'inline';

    // Clear session storage
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('password');
}


// Function to reset the page to its initial state
function resetPageToInitialState() {
    // Hide the members table and logout button
    document.getElementById('membersTable').style.display = "none";
    document.getElementById('logOut').style.display = 'none';

    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Clear the table

    // Display the login button and initial elements
    form.style.display = 'block';
    start.style.display = 'block';
    document.querySelector('h1').style.display = 'block';
    document.querySelector('h3').style.display = 'block';
    logIn.style.display = 'inline';

    // Reset the form if necessary
    if (form) {
        form.reset();
    }

    // Hide the user ID field
    userCredentialsForm.style.display = 'none';
    membersWelcome.style.display = 'none';


}


document.getElementById('logOut').addEventListener('click', function() {
    resetPageToInitialState()

});

