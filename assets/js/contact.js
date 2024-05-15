// Function to update the text based on screen width
let contactMobile = document.getElementById("contact-mobile");
function mobileIcons() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 425) {
        contactMobile.style.display = "none"
    } else{
        contactMobile.style.display = "block"
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
      },
      function(error) {
          console.log("FAILED", error);
      }
  );
  return false;  // To block from loading a new page
}