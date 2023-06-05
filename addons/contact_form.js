import { apiKey, apiDomain } from './keys.js';
///variables
const form = document.querySelector('.c-form'),
      nameInput = document.querySelector('.c-name'),
      emailInput = document.querySelector('.c-email'),
      phoneInput = document.querySelector('.c-phone'),
      messageInput = document.querySelector('.text'),
      timeInput = document.querySelector('.c-time'),
      sended = document.querySelector('.sended'),
      sendButton = document.querySelector('.send-email');

sendButton.addEventListener('click', sendEmail);

// To send the email
function sendEmail(event) {
  event.preventDefault(); // Prevent form submission

  // Get values
  const name = nameInput.value,
        email = emailInput.value,
        phone = phoneInput.value,
        time = timeInput.value,
        message = messageInput.value;

  // Construct the email data
  const formData = new FormData();
  formData.append('from', email);
  formData.append('to', 'vitjok22@gmail.com');
  formData.append('subject', 'Contact Form');
  formData.append('text', `Name: ${name}\nEmail: ${email}\nTime: ${time}\nPhone: ${phone}\nMessage: ${message}`);

  // Mailgun API
  fetch(apiDomain, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`api:${apiKey}`)}`,
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        console.log('Sent!');
        sended.classList.remove('hidden');
        setTimeout(() => {
          sended.classList.add('hidden');
        }, 8000);
        form.reset();
      } else {
        console.log('Error.');
      }
    });
}
