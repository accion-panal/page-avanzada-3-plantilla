import { PropertyData } from "../Data/userId.js";

const form = document.getElementById('form-contact-public');

let userCompanyId = PropertyData.companyId;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let respuesta = document.getElementById('respuesta');

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
        setTimeout(function() {
            respuesta;
        }, 5000)
        return;        
    }     

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "companyId": userCompanyId,
        "typeProperty": selectProperty.value,
        "action": selectOperation.value,
        "fullName": fullName.value,
        "email": email.value,
        "phone": phone.value,
        "region": selectRegion.value,
        "commune": "string",
        "address": "string",
        "landArea": "string",
        "termsAndConditions": true
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        //   redirect: 'follow'
    };

    fetch("https://aulen.partnersadvisers.info/contact/2/", requestOptions)
        .then(response => response.text())
        .then((result) => {
            //result: 'ok' + message: 'Mensaje guardado'
            console.log(result)
            if (result.status === 'ok') {
                //Vaciar Inputs
                firstName.value = '';
                email.value = '';
                phone.value = '';
                selectOperation.value = '0';
                selectProperty.value = '0';
                selectRegion.value = '0';
                //Mensaje de Alerta : Success
                respuesta.innerHTML = `<div class="alert alert-success" role="alert">
                Formulario enviado exitosamente, Muchas gracias ${fullName.value}!!
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
               </div`;
                setTimeout(function () {
                    // Ocultar alerta despues de 5seg
                    respuesta;
                }, 5000);
                return;
            }
            // console.log('error: ',result.status);
        })
        .catch((error) => {
            //Mensaje de Alerta : Error
            respuesta.innerHTML = `<div class="alert alert-danger" role="alert" style="font-size:13px;">
            Los campos no deben estar vacios.
           <button type="button" class="btn-close text-end" data-bs-dismiss="alert" aria-label="Close"></button>
           </div>`;;
            console.log('Error: ', error);
            setTimeout(function () {
                // Ocultar alerta despues de 5seg
                respuesta;
            }, 5000);
        })

});