import { apiKey, apiDomain, mainMail } from './keys.js';

const form = document.querySelector('.c-form'),
    nameInput = document.querySelector('.c-name'),
    emailInput = document.querySelector('.c-email'),
    phoneInput = document.querySelector('.c-phone'),
    messageInput = document.querySelector('.text'),
    timeSelect = document.querySelector('.c-time'),
    sendButton = document.querySelector('.send-email');

sendButton.addEventListener('click', sendEmail);

// Function to send email
function sendMail(data) {
  return fetch(apiDomain, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`api:${apiKey}`)}`,
    },
    body: new URLSearchParams(data)
  })
  .then(response => {
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    return false;
  });
}

// send the email
function sendEmail(event) {
  event.preventDefault(); // Prevent form submission

  // values
  const name = nameInput.value,
        email = emailInput.value,
        phone = phoneInput.value,
        message = messageInput.value,
        time = timeSelect.value;

  // data for user
  const userData = {
    from: email,
    to: email,
    subject: 'Reservation Confirmation',
    text: `Dear ${name},\n\nThank you for making a reservation. Your reservation is confirmed for ${time}.\n\nBest regards,\nAnd have a nice day!`
  };

  // data for the mainUser
  const reservationData = {
    from: email,
    to: mainMail,
    subject: 'New Reservation',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nReservation Time: ${time}\nMessage: ${message}`
  };

  // Send email to user 
  Promise.all([sendMail(userData), sendMail(reservationData)])
    .then(([userEmailSent, reservationEmailSent]) => {
      if (userEmailSent && reservationEmailSent) {
        form.reset(); // Reset form
      }
    });
}