/**
 * Function to that creates the variable of emailObj variable.
 * then sends the object to the email JS process the API request.
 */
function sendMail(contactForm) {
  let serviceID = "service_0fp6dju";
  let templateID = "template_k9hm21e";
  emailjs.send(serviceID, templateID, {
      "from_name": contactForm.name.value,
      "from_email": contactForm.form-email.value,
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