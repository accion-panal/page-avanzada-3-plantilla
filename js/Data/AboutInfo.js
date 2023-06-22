import { AboutInformation } from "../Data/userId.js";

const loadInformation = () => {
    /* LLENAR INFORMACION DE MISION */
    /*  rescatar value por su id */
    let mision = document.getElementById('mision-info');
    if (mision !== null) {
        mision.innerHTML = `
        <h4 style="font-weight: bold;font-size: 20px; color: #B3B3B3;" >MISIÓN</h4>
        <p class="text-black" >
            ${AboutInformation.mision}
        </p>
            `;
    }

    /* LLENAR INFORMACION DE VISION */
    /*  rescatar value por su id */
    let vision = document.getElementById('vision-info');
    if (vision !== null) {
        vision.innerHTML = `
        <h4 style="font-weight: bold;font-size: 20px; color: #B3B3B3;" >VISIÓN</h4>
        <p class="text-black" >
            ${AboutInformation.vision}
        </p>
            `;
    }

    let nosotros = document.getElementById('nosotros-info');
    if (nosotros !== null) {
        nosotros.innerHTML = `<p>
        ${AboutInformation.nosotros}
        </p>
            `;
    }

}

loadInformation();