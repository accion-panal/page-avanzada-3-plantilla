import { ContactInformation } from "../Data/userId.js";

const loadInformation = () => {

    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let footerAddress = document.getElementById('footer-address-ContactInfo');
    if (footerAddress !== null) {
        footerAddress.innerHTML = `
        <p class="">
            <i class="fa fa-map-marker fa-lg  p-1"></i>
            ${ContactInformation.footerAddress}
        </p>
            `;
    }

    let footerPhone = document.getElementById('footer-phone-ContactInfo');
    if (footerPhone !== null) {
        footerPhone.innerHTML = `
        <p class="">
            <i class="fa fa-phone fa-lg p-1"></i>
            ${ContactInformation.footerPhone}
        </p>
            `;
    }

    let footerEmail = document.getElementById('footer-email-ContactInfo');
    if (footerEmail !== null) {
        footerEmail.innerHTML = `
        <p class="">
            <i class="fa fa-envelope fa-lg  p-1"></i>
            ${ContactInformation.footerEmail}
        </p>
            `;
    }
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