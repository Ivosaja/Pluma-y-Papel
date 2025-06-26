const listaProductos = document.querySelector('.listaProductos')

async function obtenerTodosLosProductos(){
    try{
        let resultado = await fetch('http://localhost:1001/getAllProducts')
        let data = await resultado.json();
        mostrarProductos(data)

    } catch(err){
        console.error("Error al obtener todos los productos")
    }
}

function mostrarProductos(arrayProductos){
    let productos = '';
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
                <button type="button">
                    <i class="fas fa-pen iconModificar"></i>
                </button>
                <button type="button">
                    <i class="fas fa-trash iconEliminar"></i>
                </button>
                <button type="button">
                    <i class="fas fa-check iconActivar"></i>
                </button>
            </div>
        </li>
        `
    })
    listaProductos.innerHTML = productos;
}

obtenerTodosLosProductos();