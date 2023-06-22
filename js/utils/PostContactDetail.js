import { PropertyData } from "../Data/userId.js";


const formRealtor = document.getElementById('form-contact-detail')

let CompanyId = PropertyData.companyId;


let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('subject');
let message = document.getElementById('mensaje');



formRealtor.addEventListener('submit', function(e) {
    e.preventDefault();

    let respuesta = document.getElementById('respuesta');


    if(firstName.value==='' || email.value==='' || phone.value==='' || subject.value==='' ||message.value===''){
        /* console.log('campos vacios') */
        respuesta.innerHTML = `<div class="alert alert-danger" role="alert" style="font-size:13px;">
        Los campos no deben estar vacios.
       <button type="button" class="btn-close text-end" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`;
        // respuesta.ClassList.add('.alert-danger');
     
        // alertElement.remove('visually-hidden');
        return;
    }

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
 "companyId": CompanyId,
  "name": firstName.value,
  "lastName":"",
  "email": email.value,
  "phone": phone.value,
  "subject": subject.value,
  "message": message.value,
  "termsAndConditions": true,
  "action": "vender",
  "meetingDate":""
});
 
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
 
fetch("https://aulen.partnersadvisers.info/contact", requestOptions)
  .then(response => response.text())
  .then(result => {
    //Vaciar Inputs
    firstName.value = '';
    email.value = '';
    phone.value = '';
    subject.value = '';
    message.value = '';
    //Mensaje de Alerta : Success
  setTimeout(function () {
        // Ocultar alerta despues de 5seg
        respuesta.innerHTML = `<div class="alert alert-success" role="alert">
        Formulario enviado exitosamente, Muchas gracias ${firstName.value}!!
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div`;
    }, 5000);
})
  .catch(error =>console.log('Error al enviar correo',error)) ;
})




