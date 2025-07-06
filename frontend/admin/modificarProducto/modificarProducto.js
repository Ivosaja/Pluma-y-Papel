const idInput = document.getElementById('idProducto')
const nombreProducto = document.getElementById('nombreProducto')
const imagenProducto = document.getElementById('imagenProducto')
const precioProducto = document.getElementById('precioProducto')
const categoriaProducto = document.getElementById('categoriaProducto')

const modal = document.getElementById("modal")
const modalIcono = document.querySelector('.modal-content-icon')
const modalTexto = document.querySelector('.modal-content-text')


async function obtenerProductoClickeadoPorId(id){
    try{
        let result = await fetch(`http://localhost:1001/api/products/getProductById/${id}`)
        let data = await result.json()
        return data

    } catch(err){
        console.error(err)
    }
}

async function rellenarFormulario(id){
    try{
        const result = await obtenerProductoClickeadoPorId(id)
        const [producto] = result.payload
        
        // Mejorar validacion si payload da undefined o 0

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

function subirCambios(idProducto){
    const formModificarProducto = document.getElementById('form-modificarProducto')
    formModificarProducto.addEventListener('submit', async (event) => {
        event.preventDefault() // prevengo el envio automatico del formulario

        const formData = new FormData(event.target) // Transformo en una clase que me permite obtener todos los datos de un formulario pasandole por parametro el elemento que disparo el evento (el Formulario)

        const data = Object.fromEntries(formData.entries())
        data.precio = parseInt(data.precio)

        if(!data.nombre || !data.url_imagen || isNaN(data.precio) ||data.precio < 0 || data.precio > 500000||!data.categoria){
            mostrarModal("noModificado", "Error, todos los campos deben ser validos")
            
            setTimeout(() => {
                modal.style.display = 'none'
            }, 3000)
            return
        }

        let respuestaProductoModificado = await modificarProducto(idProducto, data)

        if(respuestaProductoModificado.estado){
            mostrarModal("modificado", respuestaProductoModificado.mensaje)

            setTimeout(() => {
                modal.style.display = 'none'
                //window.location.href = '../dashboard/dashboard.html'
            }, 3000)

        } else{
            mostrarModal("noModificado", respuestaProductoModificado.mensaje)

            setTimeout(() => {
                modal.style.display = 'none'
            }, 3000)
        }

    })
}

function volverDashboardBoton(){
    let bntVovlerDashboard = document.getElementById("volverDashboard");

    bntVovlerDashboard.addEventListener("click", function(){
        window.location.href  = "../dashboard/dashboard.html";
    })
    
}

function mostrarModal(tipoModal, mensaje){
    if(tipoModal === 'modificado'){
        modalIcono.innerHTML = `<i class="bi bi-check-circle-fill"></i>`
        modalIcono.style.color = 'green'
    } else if(tipoModal === 'noModificado'){
        modalIcono.innerHTML = '<i class="fas fa-times"></i>'
        modalIcono.style.color = 'red'
    }

    modal.style.display = 'flex'
    modalTexto.textContent = mensaje
}


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