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
        else if(parseInt(data.precio)<0 ||  parseInt(data.precio)>500000){ //al llegar desde el form, este llega como string, no como Number
            console.log(data.precio);

            alert("Los precios no pueden ser negativos ni pueden superar los $10.000.000")
        }
        else{
            let resultado = await subirProducto(data);

            if(resultado.estado){

                alert("✅ Producto creado con éxito")
                alert(resultado.mensaje)
                setTimeout(()=>{

                    window.location.href = "../dashboard/dashboard.html";
                }, 3000)
            }
            else{

                alert("❌" +  resultado.mensaje)
                alert(resultado.mensaje)
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