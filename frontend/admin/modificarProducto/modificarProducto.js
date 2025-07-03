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

async function modificarProducto(id){
    try{
        let result = await fetch(`http://localhost:1001/api/products/modifyProduct/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreProducto.value,
                url_imagen: imagenProducto.value,
                precio: precioProducto.value,
                categoria: categoriaProducto.value
            })
        })
        let data = await result.json()
        return data.message 

    } catch (err){
        console.error(err)
        return []
    }
}


async function init(){
    const idProducto = sessionStorage.getItem("idProducto")
    if(idProducto){
        await rellenarFormulario(idProducto)
    } else{
        alert("No se selecciono ningun producto para modificar")
    }

    await modificarProducto()

}

init()