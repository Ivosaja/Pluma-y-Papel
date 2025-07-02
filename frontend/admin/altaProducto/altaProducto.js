let btnVolver = document.getElementById("volverDashboard");

let formData = document.getElementById("altaProductoForm");


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

            alert("Todos los campos son obligatorios")
        }
        else if(Number(data.precio)<0){ //al llegar desde el form, este llega como string, no como Number

            alert("Los precios no pueden ser negativos")
        }

        else{
            let resultado = await subirProducto(data);

            if(resultado.estado){

                alert("✅ Producto creado con éxito")

                setTimeout(volverDashboard,5000);
            }
            else{

                alert("❌" +  resultado.mensaje)
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




function init(){
    volverDashboard();
    enviarFormualrio();

}

init();