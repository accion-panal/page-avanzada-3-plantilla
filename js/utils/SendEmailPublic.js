const formEmail = document.getElementById('form-contact-public');
import { RealtorSendEmailData } from "../Data/userId.js";



formEmail.addEventListener('submit', function(e) {
    e.preventDefault();

let realtorMail = RealtorSendEmailData.public;



let fullName = document.getElementById('nombre');
let email = document.getElementById('email');
let phone = document.getElementById('phone');

let selectOperation = document.getElementById('operationType');
let selectProperty = document.getElementById('typeOfProperty');
let selectRegion = document.getElementById('region');

if (selectOperation.value === '0' || selectProperty.value === '0' || selectRegion.value === '0' ||
fullName.value === '' || email.value === '' || phone.value === '') {
  respuesta.innerHTML = `<div class="alert alert-danger" role="alert" style="font-size:13px;">
  Los campos no deben estar vacios.
 <button type="button" class="btn-close text-end" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`;

return;
}


fetch(`https://formsubmit.co/ajax/${realtorMail}`, {
  method: "POST",
  headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  body: JSON.stringify({
    tipo_propiedad:selectOperation.value,
    tipo_operacion:selectProperty.value,
    Nombre_apellido: fullName.value,
    Correo : email.value,
    Telefono: phone.value,
    Region:selectRegion.value,
    Comuna:'',
    Dirección:'',
    Area:'',
    termsAndConditions: true,
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error al enviar correo',error));

})