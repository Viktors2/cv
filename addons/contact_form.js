import { apiKey, mainMail } from './keys.js';

const send_form = document.querySelector('.send-email');
const userName = document.querySelector('.c-name');
const userEmail = document.querySelector('.c-email');
const userMessage = document.querySelector('.text');
const phone = document.querySelector('.c-phone');
const time = document.querySelector('.c-time');

const formData = new FormData();
const userFormData = new FormData();

let newData = '';
let userNewData = '';

send_form.addEventListener("click", mailToDev);

function mailToDev(e) {
  e.preventDefault();

  formData.append('Name', userName.value);
  formData.append('Email', userEmail.value);
  formData.append('Phone', phone.value);
  formData.append('Time', time.value);
  formData.append('Message', userMessage.value);

  for (const [key, value] of formData.entries()) {
    newData += `<b>${key}:</b> ${value}<br>`;
  }

  formSending();
  mailToUser();
}

function mailToUser() {
  userFormData.append('Dear', userName.value + '!');
  userFormData.append('Message', 'Thank you for your message! We will get back to you soon.');

  for (const [key, value] of userFormData.entries()) {
    userNewData += `<b>${key}:</b> ${value}<br>`;
  }

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: mainMail,
    Password: apiKey,
    To: userEmail.value,
    From: mainMail,
    Subject: "Confirmation Email",
    Body: userNewData
  }).then(() => {
    console.log("Confirmation email sent to the user");
  }).catch((error) => {
    console.log("Error sending confirmation email:", error);
  });
}

function formSending() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: mainMail,
    Password: apiKey,
    To: mainMail,
    From: mainMail,
    Subject: "Contact form",
    Body: newData
  }).then(() => {
    console.log("Email sent successfully");
  }).catch((error) => {
    console.log("Error sending email:", error);
  });
}
