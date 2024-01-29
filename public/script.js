// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var calculateButton = document.getElementById("calculateButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
calculateButton.onclick = function() {
    var totalSubjects = 0;
    var totalMarks = 0;

    // Get the user's name
    var userName = document.getElementsByName("name")[0].value;

    // Check if the ID is valid
    var userId = parseInt(userName);
    if (isNaN(userId) || userName.length !== 9) {
        alert("Please enter a valid numeric ID with 9 digits.");
        return;
    }

    // Loop through all input fields in the form
    var inputFields = document.querySelectorAll('form input:not([name="name"])');
    inputFields.forEach(function(inputField) {
        var subjectMarks = parseFloat(inputField.value);
        if (!isNaN(subjectMarks)) {
            // Check if the grades are valid (between 0 and 100)
            if (subjectMarks < 0 || subjectMarks > 100) {
                alert("Please enter valid numeric grades between 0 and 100.");
                return;
            }
            totalMarks += subjectMarks;
            totalSubjects++;
        }
    });

    if (totalSubjects === 0) {
        alert("Please enter valid numeric values for subjects.");
        return; // Exit early if there are no valid subjects
    } 
    
    var averageGPA = totalMarks / totalSubjects;
    // Display the calculated GPA and user's name in the modal
    document.getElementById("popupContent").innerText = userName + ", your average GPA is: " + averageGPA.toFixed(2);

    // Open the modal
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// JavaScript code to extract and display error message from query parameter
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
        // Display error message to the user
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'error-message';
        errorMessageDiv.innerHTML = `<p>${error}</p>`;
        document.getElementById('idError').appendChild(errorMessageDiv); // Append error message to the error container
    }
});
