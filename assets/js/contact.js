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
  location.reload();
}