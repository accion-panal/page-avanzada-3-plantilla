import apiCallMapProp from "./propiedad/apiMapProps.js";
import paginationCall from "./utils/pagination.js";

apiCallMapProp();

localStorage.removeItem('countPage');
paginationCall();