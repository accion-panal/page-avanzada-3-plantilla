import renderCall from "../propiedad/render.js";


export default async function apiCallMapProp() {
	localStorage.removeItem('globalResponse');
	renderCall();
	
}
