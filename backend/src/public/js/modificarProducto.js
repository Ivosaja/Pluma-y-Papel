
// Variables globales //
const idInput = document.getElementById('idProducto')
const nombreProducto = document.getElementById('nombreProducto')
const imagenProducto = document.getElementById('imagenProducto')
const precioProducto = document.getElementById('precioProducto')
const categoriaProducto = document.getElementById('categoriaProducto')

const modal = document.getElementById("modal")
const modalIcono = document.querySelector('.modal-content-icon')
const modalTexto = document.querySelector('.modal-content-text')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que hace una peticion GET a un endpoint de la API para obtener el producto que clickeo en la pantalla dashboard //
async function obtenerProductoClickeadoPorId(id){
    try{
        let result = await fetch(`http://localhost:1001/api/products/getProductById/${id}`)
        let data = await result.json()
        return data

    } catch(err){
        console.error(err)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que precarga los inputs del formulario con la informacion del producto que clickeo anteriormente en la pantalla dashboard //
async function rellenarFormulario(id){
    try{
        const result = await obtenerProductoClickeadoPorId(id)
        const [producto] = result.payload

        idInput.value = producto.id_producto
        nombreProducto.value = producto.nombre
        imagenProducto.value = producto.url_imagen
        precioProducto.value = producto.precio
        categoriaProducto.value = producto.categoria

    } catch(err){
        console.error("Error al rellenar el formulario", err)
        alert("No se pudo cargar la informacion del producto")
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una peticion PUT a un endpoint de la API para modificar el producto clickeado en la pantalla dashboard //
async function modificarProducto(id, data){
    try{
        let result = await fetch(`http://localhost:1001/api/products/modifyProduct/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let info = await result.json()

        if(result.ok){
            return {estado: true, mensaje: info.message}
        } else {
            return {estado: false, mensaje: info.message}
        }

    } catch (err){
        console.error(err)
        return {estado: false, mensaje: "Error al hacer la peticion"}
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que obtiene los datos del formulario, los valida y sube o no los cambios hechos dependiendo la respuesta obtenida por el fetch y muestra por modal //
function subirCambios(idProducto){
    const formModificarProducto = document.getElementById('form-modificarProducto')
    formModificarProducto.addEventListener('submit', async (event) => {
        event.preventDefault() // prevengo el envio automatico del formulario

        const formData = new FormData(event.target) // Transformo en una clase que me permite obtener todos los datos de un formulario pasandole por parametro el elemento que disparo el evento (el Formulario)

        const data = Object.fromEntries(formData.entries())

        if(!data.nombre || !data.url_imagen || !data.precio || parseInt(data.precio) < 0 || parseInt(data.precio) > 500000||!data.categoria){
            mostrarModal("noModificado", "Error, todos los campos deben ser validos y el precio no puede ser negativo ni mayor a $500.000")
            
            setTimeout(() => {
                modal.style.display = 'none'
                document.getElementById('contenedor-principal').classList.remove('bloquear-interacciones');
            }, 3000)
            return
        }

        let respuestaProductoModificado = await modificarProducto(idProducto, data)

        if(respuestaProductoModificado.estado){
            mostrarModal("modificado", respuestaProductoModificado.mensaje)
            
            setTimeout(() => {
                modal.style.display = 'none'
                window.location.href = 'http://localhost:1001/admin/dashboard'
                document.getElementById('contenedor-principal').classList.remove('bloquear-interacciones');
            }, 3000)

        } else{
            mostrarModal("noModificado", respuestaProductoModificado.mensaje)

            setTimeout(() => {
                modal.style.display = 'none'
                document.getElementById('contenedor-principal').classList.remove('bloquear-interacciones');
            }, 3000)
        }

    })
}

//////////////////////////////////////////////////////
// Funcion que redirecciona al usuario al dashboard //
function volverDashboardBoton(){
    let bntVovlerDashboard = document.getElementById("volverDashboard");

    bntVovlerDashboard.addEventListener("click", function(){
        window.location.href  = "http://localhost:1001/admin/dashboard";
    })
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que muestra el modal dependiendo el tipo junto con su mensaje, ademas de bloquear las interacciones //
function mostrarModal(tipoModal, mensaje){
    if(tipoModal === 'modificado'){
        modalIcono.innerHTML = `<i class="bi bi-check-circle-fill" id="tilde"></i>`
    } else if(tipoModal === 'noModificado'){
        modalIcono.innerHTML = '<i class="fas fa-times" id="cruz"></i>'
    }
    document.getElementById('contenedor-principal').classList.add('bloquear-interacciones');
    modal.style.display = 'flex'
    modalTexto.textContent = mensaje
}

///////////////////////
// FUNCION INCIADORA //
// Aclaracion: Es una funcion asincrona ya que verifica que haya un idProducto en el sessionStorage y si hay espera a que se rellene el formulario
async function init(){
    const idProducto = sessionStorage.getItem("idProducto")
    if(idProducto){
        await rellenarFormulario(idProducto)
    } else{
        alert("No se selecciono ningun producto para modificar")
    }

    subirCambios(idProducto)

    volverDashboardBoton();
}

init()