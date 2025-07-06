let btnVolver = document.getElementById("volverDashboard");

let formData = document.getElementById("altaProductoForm");

let contenedorModalAlta =document.getElementById("contenedorModalAltaProducto")


function volverDashboard(){

    btnVolver.addEventListener("click", function(){

        window.location.href = "../dashboard/dashboard.html";
    })
}



function enviarFormualrio(){
    formData.addEventListener("submit", async(event)=>{
        event.preventDefault();

        formData = new FormData(event.target);

        let data = Object.fromEntries(formData.entries());

        if(!data.nombre || !data.url_imagen || !data.precio || !data.categoria){

            usarModal("incorrecto", "Todos los campos deben estar completos")
            mostrarModal();
            setTimeout(esconderModal, 2500);
        }
        else if(parseInt(data.precio)<0 ||  parseInt(data.precio)>500000){ //al llegar desde el form, este llega como string, no como Number

            usarModal("incorrecto", "Los precios no pueden ser negativos ni pueden superar los $10.000.000")
            mostrarModal();

            setTimeout(esconderModal, 2500);
        }
        else{
            let resultado = await subirProducto(data);

            if(resultado.estado){

                usarModal("correcto", resultado.mensaje)
                mostrarModal();

                setTimeout(()=>{

                    //window.location.href = "../dashboard/dashboard.html";
                }, 3000)
            }
            else{

                usarModal("incorrecto", resultado.mensaje)
                mostrarModal();

                setTimeout(esconderModal, 2500);
            }
            
        }
    })



}


async function subirProducto(data){
    try{
        let response = await fetch("http://localhost:1001/api/products/postProduct", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        })


        if(response.ok){
            let result = await response.json()
            return {estado: true, mensaje: result.message};
        } else{
            let result = await response.json()
            return {estado: false, mensaje: result.message};
        }

    } catch(err){
        console.error(err);
        return {estado: false, mensaje: "Error al hacer la peticion"};
    }
}


function usarModal(estado,mensaje1){
    let contenido= "";

    if(estado === "correcto"){
        contenido =
        `<p><i class="bi bi-check-circle-fill" id="tilde"></i> ${mensaje1}</p>`


    }else if(estado==="incorrecto"){
        contenido =
        `<p><i class="fas fa-times" id="cruz"></i> ${mensaje1}</p>`

    }
    contenedorModalAlta.innerHTML = contenido;

}

function mostrarModal(){
    contenedorModalAlta.style.display = "flex";
}
function esconderModal(){
    contenedorModalAlta.style.display = "none";
}




function init(){
    volverDashboard();
    enviarFormualrio();

}

init();