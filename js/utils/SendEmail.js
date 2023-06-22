const formEmail = document.getElementById('form-contact');
import { RealtorSendEmailData } from "../Data/userId.js";



formEmail.addEventListener('submit', function(e) {
    e.preventDefault();

let realtorMail = RealtorSendEmailData.sendEmail;



let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
let subject = document.getElementById('sujeto');
let phone = document.getElementById('phone');
let message = document.getElementById('mensaje');


fetch(`https://formsubmit.co/ajax/${realtorMail}`, {
  method: "POST",
  headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  body: JSON.stringify({
    Nombre: firstName.value,
    Correo: email.value,
    Telefono: phone.value,
    Sujeto: subject.value,
    Mensaje: message.value,
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error al enviar correo',error));

})