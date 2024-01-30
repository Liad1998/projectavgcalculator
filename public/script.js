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
        window.location.href = "/?error=Please enter a valid numeric ID with 9 digits.";
        return;
    }

    // Loop through all input fields in the form
    var inputFields = document.querySelectorAll('form input:not([name="name"])');
    inputFields.forEach(function(inputField) {
        var subjectMarks = parseFloat(inputField.value);
        if (!isNaN(subjectMarks)) {
            // Check if the grades are valid (between 0 and 100)
            if (subjectMarks < 0 || subjectMarks > 100) {
                window.location.href = "/?error=Please enter valid numeric grades between 0 and 100.";
                return;
            }
            totalMarks += subjectMarks;
            totalSubjects++;
        }
    });
    if (totalSubjects === 9) {
        var averageGPA = totalMarks / totalSubjects;
        alert(userName + " your average GPA is: " + averageGPA.toFixed(2));
}};

// JavaScript code to extract and display error message from query parameter
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
        // Display error message to the user
        alert(error);
        // Check if there are no errors and redirect to home page
        window.location.href = '/';
    } else {
        // Clear error message if no error is present
        const errorMessageDiv = document.getElementById('idError');
        errorMessageDiv.innerHTML = ''; // Remove any existing error messages
        // Check if there are no errors and redirect to home page
        window.location.href = '/';
    }
});

