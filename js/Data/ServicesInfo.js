import { servicesInformation } from "../Data/userId.js";

const loadInformation =()=>{
    const { cards } = servicesInformation

    /* LLENAR INFORMACION DE Cards*/
    let card = document.getElementById('card-info');
    if (card !== null) {
        card.innerHTML = cards.map((data)=>`
        <div class="col-lg-3 col-md-4 col-sm-10 d-flex justify-content-center m-2">
            <div class="row" style="border-radius: 20px; border: 1px solid black; height: 100%;">
                <div class="col-lg-12 p-3 text-start" style="padding-bottom: 0!important;" >
                    <img src="${data.icon}" class="  mt-2" style="background-color: white;"  width="120px" height="120px" alt="">
                </div>
            <div class="col-12 p-3">
                <h3 style="font-weight: bold; color: #4d4d4d;">${data.title}</h3>
                <p style="font-size: 15px;">
                   ${data.descrip}
                    <br><br>
                </p>
			    ${data.btnCard != false ? `<button type="submit" class="btn btn-primary btn-services"><a href="#id_formulario" style="text-decoration: none;color: #fff;">Completar formulario</a> </button>`: ''}
            </div>
        </div>
    </div>
        `).join('');
    };

};
loadInformation();