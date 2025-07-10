// Variables globales //
const modal = document.getElementById('modal')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Funcion que obtiene el idProducto del item que clickeo para modificar, guarda ese idProducto en sessionStorage y lo redirecciona a la pantalla
modificarProducto
*/ 
function modificarProducto(idProducto){
    sessionStorage.setItem("idProducto", idProducto)
    window.location.href = 'http://localhost:1001/admin/dashboard/modificarProducto'
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que obtiene el idProducto del item que clickeo para eliminar y muestra el modal de confirmacion/informativo dependiendo el caso //
function eliminarProducto(idProducto){
    usarModal("eliminar",idProducto);
    mostrarModal();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que hace una peticion put a un endpoint de la API para dar de baja logica un producto clickeado //
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que obtiene el idProducto del item que clickeo para activar y mostrar el modal de confirmacion/informativo dependiendo el caso //
async function activarProducto(idProducto){
    usarModal('activar', idProducto)
    mostrarModal()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que hace una peticion put a un endpoint de la API para activar un producto clickeado //
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

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que redirecciona al usuario a la pantalla de agregarProducto para dar de alta uno nuevo //
function agregarProducto(){
    const btnAgregarProducto = document.getElementById('btn-agregarProducto')
    btnAgregarProducto.addEventListener('click', () => {
        window.location.href = 'http://localhost:1001/admin/dashboard/altaProducto'
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion para volver a la pantalla estatica del proyecto frontend que muestra el catalago de productos activos //
// TODO => ver como hacer para volver para atras desde el servidor (va a estar imposible ya que el servidor no puede conocer )
function volverProductos(){
    let flechiteVolver = document.getElementById("volverProductos");

    flechiteVolver.addEventListener("click", function(){

        window.location.href = "../../cliente/productos/productos.html";

    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que rellena el modal dependiendo del tipo que se le pase por parametro y aplica la logica correspondiente en base a la decision del usuario //
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

            setTimeout(() => {
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

            setTimeout(() => {
                ocultarModal()
                window.location.reload() // Reload recargar la pagina para que el HTML renderizado por el servidor vuelva a cargar con los cambios hechos
            }, 3000)
        })

        btnNo.addEventListener('click', () => {
            ocultarModal()
        })
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que muestra el modal y le agrega la clase .bloquear-interacciones al contenedor principal para que el usuario no pueda interaccionar //
function mostrarModal(){
    modal.style.display = "flex"
    document.querySelector('.contenedor-principal').classList.add('bloquear-interacciones')
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que oculta el modal y le quita la clase .bloquear-interacciones al contenedor principal para que el usuario pueda interaccionar //
function ocultarModal(){
    modal.style.display = "none"
    document.querySelector('.contenedor-principal').classList.remove('bloquear-interacciones')
}

///////////////////////
// FUNCION INCIADORA //
async function init(){
    agregarProducto()
    volverProductos();
}

init()