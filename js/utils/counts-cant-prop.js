import { getProperties } from "../services/PropertiesServices.js";

import { PropertyData } from "../Data/userId.js";

export default async function countProp() {

  const {CodigoUsuarioMaestro,companyId,realtorId} = PropertyData;

  const response = await getProperties(1, 10, CodigoUsuarioMaestro, 1, companyId, realtorId);
  const data = response.data;

  document.getElementById("count-total-prop").innerHTML = `<span class="number"><span class="countup" style="font-weight: bold;font-size: 50px; color: #999999;">${response.meta.totalItems}</span></span>
  <span class="caption text-black-50">Total de Propiedades</span>`;

  document.getElementById("count-sale-prop").innerHTML = `<span class="number"><span class="countup" style="font-weight: bold;font-size: 50px; color: #999999;">298</span></span>
  <span class="caption text-black-50">Propiedades vendidas</span>`;

  document.getElementById("count-lease-prop").innerHTML = `<span class="number"><span class="countup" style="font-weight: bold;font-size: 50px; color: #999999;">181</span></span>
  <span class="caption text-black-50">Propiedades Arrendadas</span>`;

}
