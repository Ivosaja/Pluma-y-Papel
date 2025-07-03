const idInput = document.getElementById('idProducto')
const nombreProducto = document.getElementById('nombreProducto')
const imagenProducto = document.getElementById('imagenProducto')
const precioProducto = document.getElementById('precioProducto')
const categoriaProducto = document.getElementById('categoriaProducto')


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
            body: JSON.stringify(xd)
        })
        let info = await result.json()
        return info.message 

    } catch (err){
        console.error(err)
        return "Error al hacer la peticion"
    }
}

function subirCambios(idProducto){
    const formModificarProducto = document.getElementById('form-modificarProducto')
    formModificarProducto.addEventListener('submit', async (event) => {
        event.preventDefault() // prevengo el envio automatico del formulario

        const formData = new FormData(event.target) // Transformo en una clase que me permite obtener todos los datos de un formulario pasandole por parametro el elemento que disparo el evento (el Formulario)

        const data = Object.fromEntries(formData.entries())
        console.log(data)

        if(!data.nombre || !data.url_imagen || !data.precio || !data.categoria){
            alert("Error, todos los campos deben ser validos")
            return;
        }

        let respuestaProductoModificado = await modificarProducto(idProducto, data)
        alert(respuestaProductoModificado)

        window.location.href = "../dashboard/dashboard.html"
    })
}


async function init(){
    const idProducto = sessionStorage.getItem("idProducto")
    if(idProducto){
        await rellenarFormulario(idProducto)
    } else{
        alert("No se selecciono ningun producto para modificar")
    }

    subirCambios(idProducto)
}

init()