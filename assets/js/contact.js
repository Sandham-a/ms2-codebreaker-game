/* jshint esversion: 6 */
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

/**
 * Function to that creates the variable of emailObj variable.
 * then sends the object to the email JS process the API request.
 */
function sendMail(contactForm) {
  emailjs.send("service_0fp6dju", "template_k9hm21e", {
      "from_name": contactForm.name.value,
      "from_email": contactForm.email.value,
      "message": contactForm.message.value
  })
  .then(
      function(response) {
            console.log("SUCCESS", response);
            alert("Thank you for your email your suggestion will be considered");
            location.reload();
      },
      function(error) {
          console.log("FAILED", error);
          alert("I'm sorry theres been an error please try again")
          // To block from loading a new page
          return false; 
      }
  );
}
const formName = document.getElementById("form-name");
const formEmail = document.getElementById("form-email");
const message =  document.getElementById("message");
let backButton = document.getElementById('btn-go-back');

// Add click event listener to the home button
backButton.addEventListener('click', () => {
    // remove the required attribute to allow the listener to take the game back to the home page
    formEmail.removeAttribute('required');
    formEmail.removeAttribute('required');
    formName.removeAttribute('required');
    // Navigate of index.html when the button is clicked
    window.location.href = 'index.html';
});