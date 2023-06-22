import { ContactInformation } from "../Data/userId.js";

const loadInformation = () => {
    const dataHorario = ContactInformation.horario;

    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let address = document.getElementById('address-ContactInfo');
    if (address !== null) {
        address.innerHTML = `
        <p class="">
            <i class="fa fa-map-marker fa-lg  p-1"></i>
            ${ContactInformation.address}
        </p>
            `;
    }

    let phone = document.getElementById('phone-ContactInfo');
    if (phone !== null) {
        phone.innerHTML = `
        <p class="">
            <i class="fa fa-phone fa-lg  p-1"></i>
            ${ContactInformation.phone}
        </p>
            `;
    }

    let email = document.getElementById('email-ContactInfo');
    if (email !== null) {
        email.innerHTML = `
        <p class="">
            <i class="fa fa-envelope fa-lg  p-1"></i>
            ${ContactInformation.email}
        </p>
            `;
    }

    let horario = document.getElementById('horario-ContactInfo');
    if (horario !== null) {
        horario.innerHTML=
    `<p>
        ${ContactInformation.horario}
    </p>`
    }
}

loadInformation();