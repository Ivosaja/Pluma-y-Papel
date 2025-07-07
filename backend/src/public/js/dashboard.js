const modal = document.getElementById('modal')

function modificarProducto(){
    window.location.href = '../modificarProducto/modificarProducto.html'
    sessionStorage.setItem("idProducto", idProducto)
}

function eliminarProducto(idProducto){
    usarModal("eliminar",idProducto);
    mostrarModal();
}

async function eliminar(id){

    try{
        let respuesta = await fetch(`http://localhost:1001/api/products/deleteProduct/${id}`,{
            method: `PUT`})

        let data = await respuesta.json()

        if(respuesta.ok){
            return {estado: true, mensaje: data.message}
        } else {
            return {estado: false, mensaje: data.message}
        }
    }catch(err){
        console.error(err);
        return {estado: false, mensaje: "Error al hacer la peticion"}
    }

}

async function activarProducto(idProducto){
    usarModal('activar', idProducto)
    mostrarModal()
}

async function activar(id){
    try{
        let respuesta = await fetch(`http://localhost:1001/api/products/activateProduct/${id}`, {
            method: 'PUT'
        })
        let data = await respuesta.json()

        if(respuesta.ok){
            return {estado: true, mensaje: data.message}
        } else{
            return {estado: false, mensaje: data.mensaje}
        }

    } catch(err){
        console.error(err)
        return {estado: false, mensaje: "Error al hacer la peticion"}
    }
}

function agregarProducto(){
    const btnAgregarProducto = document.getElementById('btn-agregarProducto')
    btnAgregarProducto.addEventListener('click', () => {
        window.location.href = 'http://localhost:1001/admin/dashboard/altaProducto'
    })
}

// TODO => ver como hacer para volver para atras desde el servidor (va a estar imposible ya que el servidor no puede conocer )
function volverProductos(){
    let flechiteVolver = document.getElementById("volverProductos");

    flechiteVolver.addEventListener("click", function(){

        window.location.href = "../../cliente/productos/productos.html";

    })

}

function usarModal(tipo, idProducto){
    modal.style.flexDirection = 'column'

    if(tipo==="eliminar"){
        modal.innerHTML = `
        <p>Desea dar de baja este producto?</p>
        <div id="contenedorBotones">
            <button id="btnSi">Si</button>
            <button id="btnNo">No</button>
        </div>
        `
        let btnSi = document.getElementById("btnSi");
        let btnNo = document.getElementById("btnNo");

        btnSi.addEventListener("click", async function(){

            let resultado = await eliminar(idProducto)

            if(resultado.estado){
                modal.innerHTML = `
                <i class="bi bi-check-circle-fill exito"></i>
                <p>${resultado.mensaje}</p>
                `
        
            } else {
                modal.innerHTML = `
                <i class="fas fa-times error"></i>
                <p>${resultado.mensaje}</p>
                `
            }
            modal.style.flexDirection = 'row'

            setTimeout(async () => {
                ocultarModal();
                window.location.reload() // Reload recargar la pagina para que el HTML renderizado por el servidor vuelva a cargar con los cambios hechos
            }, 3000);
        })

        btnNo.addEventListener("click", function(){
            ocultarModal();
        })
        

    } else if(tipo==="activar"){
        modal.innerHTML = `
        <p>Desea activar este producto?</p>
        <div id="contenedorBotones">
            <button id="btnSi">Si</button>
            <button id="btnNo">No</button>
        </div>
        `

        let btnSi = document.getElementById('btnSi')
        let btnNo = document.getElementById('btnNo')

        btnSi.addEventListener('click', async() => {
            let resultado = await activar(idProducto)

            if(resultado.estado){
                modal.innerHTML = `
                <i class="bi bi-check-circle-fill exito"></i>
                <p>${resultado.mensaje}</p>
                `
            } else{
                modal.innerHTML = `
                <i class="fas fa-times error"></i>
                <p>${resultado.mensaje}</p>
                `
            }
            modal.style.flexDirection = 'row'

            setTimeout(async() => {
                ocultarModal()
                window.location.reload() // Reload recargar la pagina para que el HTML renderizado por el servidor vuelva a cargar con los cambios hechos
            }, 3000)
        })

        btnNo.addEventListener('click', () => {
            ocultarModal()
        })
    }
}



function mostrarModal(){

    modal.style.display = "flex"
    document.querySelector('.contenedor-principal').classList.add('bloquear-interacciones')
}


function ocultarModal(){
    modal.style.display = "none"
    document.querySelector('.contenedor-principal').classList.remove('bloquear-interacciones')
}


async function init(){
    agregarProducto()

    volverProductos();
}

init()