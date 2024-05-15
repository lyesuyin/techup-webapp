const projects = {
    project1: ['CDB_MTI_2401', 'MTI Database','302,000','7','Number of businesses helped', '3000'], 
    project2: ["IB_MOH_2303", "MOH System", 11,200,000, "Reduction in patient wait time", "30mins"],
    project3: ["CDB_Govtech_2211", "API Connect", 1,500,000, "Cost savings", "$100 million"]
};

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submission behavior

    // validate projectID
    const projectID = document.getElementById('projectID').value;
    
    function elementExists(projects, projectID) {
        for (const projectKey in projects) {
            if (projects[projectKey].includes(projectID)) {
                // Proceed to the next page
                window.location.href = 'project-details.html'; // Replace 'next-page.html' with the URL of your next page
                return; // Exit the function once project ID is found
            }
        }
        alert('Project ID does not exist. Please try again.');
    }

    elementExists(projects, projectID);
});