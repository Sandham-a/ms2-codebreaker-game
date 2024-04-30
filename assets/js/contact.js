/**
 * Function to that creates the variable of emailObj variable.
 * then sends the object to the email JS process the API request.
 */

function sendEmail(){

let emailObj = {
  name: document.getElementById(form-name).value,
  contactContent: document.getElementById(form-content).value, 
  emailAddress: emailAddress,
}

  let serviceID = "service_0fp6dju";
  let templateID = "template_k9hm21e";
  emailjs.send(serviceID, templateID, emailObj)
};