/* jshint esversion: 6 */
let backButton = document.getElementById('btn-go-back-404');

        // Add click event listener to the home button
        backButton.addEventListener('click', function() {
            // Navigate to index.html when the button is clicked
            window.location.href = 'index.html';
        });

// Function to update the text based on screen width
let contactMobile = document.getElementById("contact-mobile");
function mobileIcons() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 425) {
        contactMobile.style.display = "none";
    } else{
        contactMobile.style.display = "block";
    }
}

// Call the function initially and add event listener for window resize
mobileIcons();
window.addEventListener("resize", mobileIcons);