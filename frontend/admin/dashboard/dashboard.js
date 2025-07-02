let listaProductos = document.querySelector('.listaProductos')

async function obtenerTodosLosProductos(){
    try{
        let resultado = await fetch('http://localhost:1001/api/products/getAllProducts')
        let data = await resultado.json();
        return data
        //mostrarProductos(data)

    } catch(err){
        console.error("Error al obtener todos los productos")
        return []
    }
}

function mostrarProductos(arrayProductos){
    let productos = '';
    console.log(arrayProductos)

    if(arrayProductos.length === 0){
        productos = `<p>No se encontraron productos</p>`

    } else{
        let arrayRespuesta = arrayProductos.payload;
        arrayRespuesta.forEach(producto => {
            productos += `
            <li class="itemProducto">
                <div class="itemProductoInfo">
                    <p><strong>ID: </strong>${producto.id_producto}</p>
                    <img src="${producto.url_imagen}" alt="">
                    <p><strong>Nombre: </strong>${producto.nombre}</p>
                    <p><strong>Precio: </strong>$${producto.precio}</p>
                    <p><strong>Categoria: </strong>${producto.categoria}</p>
                    <p><strong>Activo: </strong>${producto.activo === 1 ? true : false}</p>
                </div>
                <div class="acciones">
                    <button type="button" onclick="modificarProducto(${producto.id_producto})">
                        <i class="fas fa-pen iconModificar"></i>
                    </button>
                    <button type="button" onclick="eliminarProducto(${producto.id_producto})">
                        <i class="fas fa-trash iconEliminar"></i>
                    </button>
                    <button type="button" onclick="activarProducto(${producto.id_producto})">
                        <i class="fas fa-check iconActivar"></i>
                    </button>
                </div>
            </li>
            `
        })
    }

    listaProductos.innerHTML = productos;
}

// no sabia si hacerlas o no
function modificarProducto(idProducto){

}

function eliminarProducto(idProducto){
    
}

function activarProducto(idProducto){
    
}


async function init(){
    listaProductos.innerHTML = `<p>Cargando productos...</p>`

    let productos = await obtenerTodosLosProductos()
    mostrarProductos(productos)
}

init()