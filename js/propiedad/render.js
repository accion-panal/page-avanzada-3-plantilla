
import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
import apiCallMap from "../propiedad/apiMapProp.js";

export default async function renderCall() {
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    }
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        console.log('max-page: ',maxPage);
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if
    console.log('response in render.js',response)

    //* Guardamos el data del response en una variable data
    let data = response.data;
    console.log('data in render.js',data)

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        console.log('=========== handleFilterChange ===========')
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;
        console.log(selectedValue);
        console.log(data);
        console.log(response);

        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        console.log('dataOrdenadaResponse: ',response);
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("totalItems").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas</span>`;

    //todo: creacion de la funcion ShowItems
    function showItems() {
        data = data.map(item => {
            // Reemplazar "\\" por "//" en la propiedad "image"
            item.image = item.image.replace(/\\/g, "//");
            return item;
        });
        //* si container-propiedad es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerGrid = document.getElementById('container-cards');
        if (containerGrid !== null) {
            document.getElementById("container-cards").innerHTML = data.map(data =>`
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-4" >
            <div class="property-item">
                    <a href="/property-single.html?${data.id}realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" class="img">
                        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop">`}
                    </a>
                    <div class="property-content text-start" style="padding: 10px 10px 10px 10px;">
                        <h2 class="textLimitClass" style="font-weight: bold; padding-left:40px">${data.title}</h2>
                        <div>
                            <p class="text-center" style="font-size: 15px; ">
                                UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}
                            </p>
                            <p class="text-center textLimitDireccion" style="font-size: 15px;">
                            <i class="fa fa-map-marker fa-lg"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile</p>
                            <div class="row p-3 text-center">
                                <div class="col-4 hr-l">
                                    <div class="row ">
                                        <div class="col-12"><h5>M2</h5></div>
                                        <div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"} M²</div>
                                    </div>
                                </div>
                                <div class="col-4 hr-l">
                                    <div class="row ">
                                        <div class="col-12"><h5>Hab</h5></div>
                                        <div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms : "0"}</div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <div class="col-12"><h5>Baño(s)</h5></div>
                                        <div class="col-12">${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <p>${data.types} / ${data.operation}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
            `).join("");
        };

        let containerCardMap = document.getElementById('card-prop-map');
        if (containerCardMap !== null) {
        document.getElementById('card-prop-map').innerHTML = data.map(data =>
                  `	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-12 mb-3" >
                                    <div class="property-item">
            								<a href="/property-single.html?${data.id}realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" class="img">
                                                ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid img-prop-map">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid img-prop-map">`}
            								</a>
            								<div class="property-content text-start" style="padding: 10px 10px 10px 10px;">
            									<h2 class="textLimitClass" style="font-weight: bold; padding-left:40px;font-size:24px;">${data.title}</h2>
            									<div>
            										<p class="text-center" style="font-size: 15px; ">
            											UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}
            										</p>
            										<p class="text-center" style="font-size: 15px;">
                                                    <i class="fa fa-map-marker fa-lg"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile</p>
            										<div class="row p-3 text-center">
            											<div class="col-4 hr-l">
            												<div class="row ">
            													<div class="col-12"><h5>M2</h5></div>
            													<div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"} M²</div>
            												</div>
            											</div>
            											<div class="col-4 hr-l">
            												<div class="row ">
            													<div class="col-12"><h5>Hab</h5></div>
            													<div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms : "0"}</div>
            												</div>
            											</div>
            											<div class="col-4">
            												<div class="row">
            													<div class="col-12"><h5>Baño(s)</h5></div>
            													<div class="col-12">${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</div>
            												</div>
            											</div>
            										</div>
            										<div class="text-center">
            											<p>${data.types} / ${data.operation}</p>
            										</div>
            									</div>
            								</div>
            							</div>
                                </div>
            				</div>
              ` ).join("");
        }

        let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            apiCallMap()
        };
    };
}
