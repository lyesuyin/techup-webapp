const projects = {
    project1: ['CDB_MTI_2401', 'MTI Database', '302000', '7', 'Number of businesses helped', '3000'],
    project2: ["IB_MOH_2303", "MOH System", "11200000", "30", "Reduction in patient wait time", "30mins","15mins"],
    project3: ["CDB_Govtech_2211", "API Connect", "1500000", "100000000", "Cost savings", "$100 million"]
};

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submission behavior

    // validate projectID
    const projectID = document.getElementById('projectID').value;

    function elementExists(projects, projectID) {
        for (const projectKey in projects) {
            if (projects[projectKey].includes(projectID)) {
                // Pass the array associated with the project ID as a URL parameter
                const params = new URLSearchParams();
                params.append('projectData', JSON.stringify(projects[projectKey]));
                // Proceed to the next page with the URL parameters
                window.location.href = `project-details.html?${params.toString()}`;
                return; // Exit the function once project ID is found
            }
        }
        alert('Project ID does not exist. Please try again.');
    }

    elementExists(projects, projectID);
});