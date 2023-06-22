import { getPropertiesForId } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf } from '../utils/getExchangeRate.js';

export default async function apiDetalleCall(id, statusId, companyId) {

    let { data } = await getPropertiesForId(id, statusId, companyId);
    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
    let img;

    console.log(data)
    /* INFORMACION REALTOR */
    document.getElementById('name-realtor').innerHTML = `
    <p><b style="font-size: 35px;">${data.realtor.name} ${data.realtor.lastName}</b></p>`;
    document.getElementById('email-realtor').innerHTML = `
    <p style="font-size: 18px;">${data.realtor.mail}</p>`;
    document.getElementById('phone-realtor').innerHTML = `
    <p style="font-size: 18px;"> ${data.realtor.contactPhone != null && data.realtor.contactPhone!= '' ? data.realtor.contactPhone : 'No tiene número de contacto'}</p>`;


    /* Informacion principal */
    document.getElementById('title-prop').innerHTML = `
    <h1 style="font-weight: bold;color: #4d4d4d;">
		${data.title}
    </h1>`;
    document.getElementById('tipo-oper-prop').innerHTML = `
    <span>${data.types} / ${data.operation}</span>
    `;
    /* Direccion en Info */
    document.getElementById('dire-prop').innerHTML = `
        <p>
            <i class="fa fa-map-marker fa-lg  p-1"></i>
            ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra Direccion"}, ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile
        </p>
    `;

    document.getElementById('cod-prop').innerHTML = `
            <p>
				REF: ${data.id}
			</p> `;

     
        
    /* Imagenes en splide */
    data.images.forEach((images, index) => {img += ` 
        <li class="splide__slide ${ index == 0 ? "active" : ""}"> 
            <img src="${images.replace(/\\/g, "//") != undefined ? images.replace(/\\/g, "//")  : 'Ir a'}" style="height:600px;width:100%;"/>
        </li>	
    `})
    document.getElementById('carrucel-img').innerHTML = `
        <li class="splide__slide">${img != undefined ? img :'No existe'}</li>
    `; 
    let splide = new Splide(".splide", {
        type: "fade",
        rewind:true,
        autoplay: true,

    });
    splide.mount();
    /* Fin Imagenes en splide */


    document.getElementById('uf-prop').innerHTML =
    `<b style="font-size: 50px;" >UF ${clpToUf(data.price, ufValueAsNumber)}</b>`;

    document.getElementById('clp-prop').innerHTML =
    `<b style="font-size: 50px;" >CLP ${parseToCLPCurrency(data?.price)}</b>`;


    /* Descripcion/Caracteristicas */
    document.getElementById('descrip-prop').innerHTML = `
    <p>	${data?.description || 'No cuenta con descripción'}</p>    
    `;

    document.getElementById('caract-prop').innerHTML = `
                            <div class="row text-center">
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;">
										<i class="fa fa-bed" style="font-size: 40px;padding-left: 6px;padding-right: 6px;"></i>
										${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}
									</div>
								</div>
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;">
										<i class="fa fa-toilet  " style="font-size: 40px;padding-left: 6px;padding-right: 6px;"></i>
										${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}
									</div>
								</div>
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;">
										<i class="fa fa-m  " style="font-size: 40px;padding-left: 6px;"></i><i class="fa fa-2  " style="font-size: 40px;padding-right: 6px;"></i>
										${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}
									</div>

								</div>
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;">
										<i class="fa fa-car  " style="font-size: 40px;padding-left: 6px;padding-right: 6px;"></i>
										${data.covered_parking_lots != null && data.covered_parking_lots != undefined && data.covered_parking_lots != "" ? data.covered_parking_lots : "0"}
									</div>
								</div>
							</div>`;

    /* MAPA */
    /* Direccion en Mapa */
    document.getElementById('dire-map-prop').innerHTML = `
    <h2>Ubicacion de la Propiedad</h2>
    <p style="padding-left: 14px;">${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra Direccion"}, ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</p>`;

    /* CONTACTO */


}

