const form = document.querySelector('.c-form'),
        nameInput = document.querySelector('.c-name'),
        emailInput = document.querySelector('.c-email'),
        phoneInput = document.querySelector('.c-phone'),
        messageInput = document.querySelector('.text'),
        sendButton = document.querySelector('.send-email');

sendButton.addEventListener('click', sendEmail);

// To send the email
function sendEmail(event) {
  event.preventDefault(); // Prevent form submission

  // Get values
  const name = nameInput.value,
        email = emailInput.value,
        phone = phoneInput.value,
        message = messageInput.value;

  // Construct the email data
  const data = {
    from: email,
    to: 'vitjok22@gmail.com',
    subject: 'Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  // Mailgun API
  fetch('DOMAINNAME', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('api:API_KEY'),
    },
    body: new URLSearchParams(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('Sended!');
        // Reset the form after successful submission
        form.reset();
      } else {
        console.log('Error blat.');
      }
    })
    .catch(error => {
      console.log('Slomalos(:', error);
    });
}
