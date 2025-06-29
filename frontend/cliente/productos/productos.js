
//variable globales
let modalTimeoutId = null // aca guardamos el timeout actual

let contenedorProductos = document.getElementById("contenedor-productos");
let filtradoUtiles = document.getElementById("filtrarUtiles")
let filtradoLibros= document.getElementById("filtrarLibros")
let listaProductos = [];
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");
const contenedorBtnCarrito = document.getElementById('contenedor-boton-carrito')
let carrito = []

////////////////////////////////////////////////////////////

async function obtenerProductos() {
    try{

        let respuesta = await fetch("http://localhost:1001/getAllActiveProducts");
        let data = await respuesta.json();
        return data.payload;

    }catch(error){
        console.error("Error al obtener los productos ",error)
        return [] // retorno lista vacia por si en caso de que falla el fetch, se le asigne a la lista de productos un array vacio y no undefined.
    }
}

///////////////////////////////////////////////////////////////////

function mostrarProductos(lista){ 
    let cartaProducto = "";
    console.log(lista)
    if(lista.length === 0){
        cartaProducto = `<p class="contenedor-productos-texto"> No se encontraron productos disponibles. Intente mas tarde</p>`
    }
    else{
        for(let i = 0; i<lista.length; i++){
                cartaProducto += `
                    <div class="tarjeta-producto">
                        <img class="imagen-Producto" src=${lista[i].url_imagen}>
                        <h3>${lista[i].nombre}</h3>
                        <p>Precio: $${lista[i].precio}</p>
                        <div id="agregar-eliminar-producto">
                            <button id="boton-agregar" onclick="agregarAlCarrito(${lista[i].id_producto})">Agregar a carrito</button>
                            <button id="boton-eliminar" onclick="eliminarDelCarrito(${lista[i].id_producto})"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    `                                              
        };
    }
    contenedorProductos.innerHTML = cartaProducto;
    mostrarCantidadLibros()
    mostrarCantidadUtiles()
}

///////////////////////////////////////////////////////////////////

function mostrarCantidadProductosCarrito(){
    contenedorBtnCarrito.innerHTML = `
        <a href="../carrito/carrito.html" class="btn-carrito">
            <i class="bi bi-cart2"></i>
        </a>
        <span id="contador-carrito">${carrito.length}</span>
    `;
}

///////////////////////////////////////////////////////////////////

function obtenerNombreUsuarioSesionStorage(){
    let nombre = sessionStorage.getItem("nombreUsuario");
    let nuevo = `
    <i class="bi bi-person-circle"></i>
    <p>${nombre}</p>`;

    contenedorUsuario.innerHTML = nuevo;
}

///////////////////////////////////////////////////////////////////


function mostrarCantidadLibros(){
    const libros = listaProductos.filter(producto => producto.categoria === "Libros");
    filtradoLibros.innerHTML = `
        <i class="fas fa-book-open"></i>
        Libros
        <span id="cantLibros">${libros.length}</span>
    `
}

function mostrarCantidadUtiles(){
    const utiles = listaProductos.filter(producto => producto.categoria === "Utiles")
    filtradoUtiles.innerHTML = `
        <i class="fas fa-ruler"></i>
        Utiles
        <span id="cantUtiles">${utiles.length}</span>
    `
}


function filtrarUtiles(lista){
    filtradoUtiles.addEventListener("click",function(){

        let filtrados = lista.filter(producto=>
            producto.categoria==="Utiles"
        )
        mostrarProductos(filtrados)
        window.scrollTo(0,0)
    })

}

function filtrarLibros(lista){
    filtradoLibros.addEventListener("click",function(){

        let filtrados = lista.filter(producto=>
            producto.categoria==="Libros"
        )
        mostrarProductos(filtrados)
        window.scrollTo(0,0)
    })

}

///////////////////////////////////////////////////////////////////

function agregarAlCarrito(idProducto){
    const productoAgregar = listaProductos.find(producto => producto.id_producto === idProducto);
    if(carrito.some(producto => producto.id_producto === idProducto)){ // aqui, el some verifica si ya hay algun producto en el carrito que coincida con el producto que se quiere agregar.
        mostrarModal("yaAgregado", "Este producto ya se encuentra en el carrito. Agregue mas cantidades en la sección de carrito")
        return
    }

    // Hago una copia del producto a agregar y le agrego una propiedad llamada cantidad establecida en 1. Asi no modificamos el array de productos original
    const copiaProductoAgregar = {...productoAgregar, cantidad: 1}

    carrito.push(copiaProductoAgregar)
    sessionStorage.setItem("carrito", JSON.stringify(carrito)) // guardo en session storage el carrito
    mostrarCantidadProductosCarrito()
    mostrarModal("agregado", "Se agrego correctamente el producto al carrito")
}

///////////////////////////////////////////////////////////////////

function eliminarDelCarrito(idProducto){
    const indiceProductoCarrito = carrito.findIndex(producto => producto.id_producto === idProducto) // Encuentro el indice del producto a eliminar del carrito
    if(indiceProductoCarrito === -1){ // Verifico que si no encontro el indice del producto
        mostrarModal("noAgregado", "Este producto no se encuentra en el carrito. Agreguelo primero")
        return
    }

    carrito.splice(indiceProductoCarrito,1) // Desde el indice del producto que encontre, borro 1 elemento (osea el producto que encontre por su ID)
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCantidadProductosCarrito()
    mostrarModal("eliminado", "Se elimino completamente el producto del carrito")
}

///////////////////////////////////////////////////////////////////

function mostrarModal(tipoModal, mensaje){
    const modal = document.getElementById('modal')
    const modalMensaje = document.querySelector('.modal-contenido-texto')
    const modalIcono = document.querySelector('.modal-contenido-icono')
    
    if(tipoModal === "agregado"){
        modalIcono.innerHTML = `<i class="bi bi-check-circle-fill"></i>`
        modalIcono.style.color = "green"
    } else if(tipoModal === "eliminado"){
        modalIcono.innerHTML = `<i class="bi bi-trash-fill"></i>`
        modalIcono.style.color = "red"
    } else if(tipoModal === "noAgregado" || tipoModal === "yaAgregado"){
        modalIcono.innerHTML = `<i class="fas fa-times"></i>`
        modalIcono.style.color = "red"
    }

    if(modalTimeoutId != null){
        clearTimeout(modalTimeoutId) // borra el id del timeout pasado por parametro (el actual) si no es null
    }

    modalMensaje.textContent = mensaje
    modal.style.display = "flex"

    modalTimeoutId = setTimeout(() => { // guardo el id de este setTimeout
        modal.style.display = "none",
        modalTimeoutId = null // volvemos a borrar el id del timeout una vez pasados los 2 segundos
    }, 3000)
}


///////////////////////////////////////////////////////////////////

async function init() {
    // Pongo un mensaje en contenedor de productos para que se vea algo mientras se realiza el fetch que puede tardar unos segundos (porque usa async/await)
    contenedorProductos.innerHTML = `<p class="contenedor-productos-texto">Cargando productos...</p>`
    
    // Me traigo lo del session storage si hay algo y lo parseo a Objeto JS, sino, significa que no hay ningun producto en el carrito,
    // pq nunca se creo ese item del session storage
    if(sessionStorage.getItem("carrito")){
        carrito = JSON.parse(sessionStorage.getItem("carrito"))
    }
    
    // Muestro el nombre de usuario que ingreso el cliente en la pagina de bienvenida y muestro el carrito con la cantidad de productos que tiene
    obtenerNombreUsuarioSesionStorage();
    mostrarCantidadProductosCarrito()
    
    // Espero a que se obtengan los productos y los retorne la funcion
    listaProductos = await obtenerProductos();
    // Muestro los productos
    mostrarProductos(listaProductos);

    filtrarUtiles(listaProductos);
    filtrarLibros(listaProductos);

}

init();




