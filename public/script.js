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
    
            // Loop through all input fields with type="text" in the form
            var inputFields = document.querySelectorAll('form input[type="text"]');
            inputFields.forEach(function(inputField) {
                var subjectMarks = parseFloat(inputField.value);
                if (!isNaN(subjectMarks)) {
                    totalMarks += subjectMarks;
                    totalSubjects++;
                }
            });
    
            if (totalSubjects > 0) {
                var averageGPA = totalMarks / totalSubjects;
    
                // Display the calculated GPA and user's name in the modal
                document.getElementById("popupContent").innerText = userName + ", your average GPA is: " + averageGPA.toFixed(2);
    
                // Open the modal
                modal.style.display = "block";
            } else {
                alert("Please enter valid numeric values for subjects.");
            }
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
