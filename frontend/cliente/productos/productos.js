// Variable globales //
let modalTimeoutId = null // aca guardamos el timeout actual
let contenedorProductos = document.getElementById("contenedor-productos");
let filtradoUtiles = document.getElementById("filtrarUtiles")
let filtradoLibros= document.getElementById("filtrarLibros")
let listaProductos = [];
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");
const contenedorBtnCarrito = document.getElementById('contenedor-boton-carrito')
let btnPanelAdmin = document.getElementById("panelAdmin");
let carrito = []

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que hace un fetch a el endpoint de nuestra api para obtener todos los productos activos //
async function obtenerProductos() {
    try{

        let respuesta = await fetch("http://localhost:1001/api/products/getAllActiveProducts");
        let data = await respuesta.json();
        return data.payload;

    }catch(error){
        console.error("Error al obtener los productos ",error)
        return [] // retorno lista vacia por si en caso de que falla el fetch, se le asigne a la lista de productos un array vacio y no undefined.
    }
}

/////////////////////////////////////////////////////////
// Funcion que muestra en pantalla todos los productos //
function mostrarProductos(lista){ 
    let cartaProducto = "";
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

///////////////////////////////////////////////////////////////
// Funcion que agrega en pantalla el carrito con su cantidad //
function mostrarCantidadProductosCarrito(){
    contenedorBtnCarrito.innerHTML = `
        <i class="bi bi-cart2"></i>
        <span id="contador-carrito">${carrito.length}</span>
    `;
}

///////////////////////////////////////////////////////////////////////////////////////////
// Funcion que redirecciona a la pantalla de carrito tras clickear el contenedor carrito //
function redireccionarCarrito(){

    contenedorBtnCarrito.addEventListener("click", function(){
        window.location.href = "../carrito/carrito.html";

    })
}

//////////////////////////////////////////////////////////////////////////////////
// Funcion que obtiene y aplica el nombre de usuario y el tema del sessionStorage //
function obtenerNombreUsuarioSesionStorage(){
    let tarjetaUsuario = ''
    let nombre = sessionStorage.getItem("nombreUsuario");
    if(sessionStorage.getItem("tema") === "oscuro"){
        aplicarTemaOscuro()
        tarjetaUsuario = `
        <i class="bi bi-person-circle" id="icono-usuario"></i>
        <p>${nombre}</p>
        <i class="fa-solid fa-moon" id="icono-tema"></i>
        `;


    } else {
        removerTemaOscuro()
        tarjetaUsuario = `
        <i class="bi bi-person-circle" id="icono-usuario"></i>
        <p>${nombre}</p>
        <i class="fa-solid fa-sun" id="icono-tema"></i>
        `;
    }
    contenedorUsuario.innerHTML = tarjetaUsuario;
}

//////////////////////////////////////////////////////////////////////////////////
// Funcion que le agrega la clase darkmode al elemento raiz de la pagina (html) //
function aplicarTemaOscuro(){
    document.documentElement.classList.add("darkmode")
    
}

/////////////////////////////////////////////////////////////////////////////////
// Funcion que remueve la clase darkmode del elemento raiz de la pagina (html) //
function removerTemaOscuro(){
    document.documentElement.classList.remove("darkmode")
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que filtra los productos cuya categoria ==== "Libros" y muestra en el boton todos sus datos (junto con la cantidad) //
function mostrarCantidadLibros(){
    const libros = listaProductos.filter(producto => producto.categoria === "Libros");
    filtradoLibros.innerHTML = `
        <i class="fas fa-book-open"></i>
        Libros
        <span id="cantLibros">${libros.length}</span>
    `
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que filtra los productos cuya categoria ==== "Utiles" y muestra en el boton todos sus datos (junto con la cantidad) //
function mostrarCantidadUtiles(){
    const utiles = listaProductos.filter(producto => producto.categoria === "Utiles")
    filtradoUtiles.innerHTML = `
        <i class="fas fa-ruler"></i>
        Utiles
        <span id="cantUtiles">${utiles.length}</span>
    `
}
//////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que filtra los productos cuya categoria === "Utiles" y los visualiza en pantalla //
function filtrarUtiles(lista){
    filtradoUtiles.addEventListener("click",function(){

        let filtrados = lista.filter(producto=>
            producto.categoria==="Utiles"
        )
        mostrarProductos(filtrados)
        window.scrollTo(0,0) // Esto es un scroll hacia el inicio de la pantalla
    })

}

//////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que filtra los productos cuya categoria === "Libros" y los visualiza en pantalla //
function filtrarLibros(lista){
    filtradoLibros.addEventListener("click",function(){

        let filtrados = lista.filter(producto=>
            producto.categoria==="Libros"
        )
        mostrarProductos(filtrados)
        window.scrollTo(0,0) // Esto es un scroll hacia el inicio de la pantalla
    })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que agrega un producto al carrito siempre y cuando este no encuentre, guarda el carrito en sessionStorage, informa con un modal y muestra cantidad de productos en el carrito 
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que elimina un producto al carrito si este ya se encuentra, guarda el carrito en sessionStorage, informa con un modal y muestra cantidad de productos en el carrito 
function eliminarDelCarrito(idProducto){
    const indiceProductoCarrito = carrito.findIndex(producto => producto.id_producto === idProducto) // Encuentro el indice del producto a eliminar del carrito
    if(indiceProductoCarrito === -1){ // Verifico que si no encontro el indice del producto (pq si no lo encuentra devuelve -1)
        mostrarModal("noAgregado", "Este producto no se encuentra en el carrito. Agreguelo primero")
        return
    }

    carrito.splice(indiceProductoCarrito,1) // Desde el indice del producto que encontre, borro 1 elemento (osea el producto que encontre por su ID)
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCantidadProductosCarrito()
    mostrarModal("eliminado", "Se elimino completamente el producto del carrito")
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que muestra el tipo de modal junto con su determinado mensaje y coordina la aparicion del mismo //
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que permite volver al inicio (pantalla de bienvenida) al clickear el icono de la tarjeta de usuario y limpia el sessionStorage //
function volverInicio() {
    const iconoUsuario = document.getElementById('icono-usuario')

    iconoUsuario.addEventListener("click", function(){
        window.location.href= "../bienvenida/index.html";
        sessionStorage.removeItem("carrito")
        sessionStorage.removeItem("nombreUsuario")
        if(sessionStorage.getItem("totalCarrito")){
            sessionStorage.removeItem("totalCarrito");
        }
    })
}

////////////////////////////////////////////////////////////////////////////
// Funcion validadora del ingreso del nombre en la pantalla de bienvenida //
function redireccionarSinNombre(){

    const nombreGuardado = sessionStorage.getItem("nombreUsuario");
    if (!nombreGuardado) {
        window.location.href = "../bienvenida/index.html";
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que redirecciona al panel del administrador tras clickear el boton "Panel Admin" //
function redireccionarPanelAdmin(){

    btnPanelAdmin.addEventListener("click", function(){
        window.location.href = "http://localhost:1001/admin/dashboard";
    })

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que cambia el tema (tanto en la pantalla, como en el sessionStorage) y el icono que hace referencia a ese tema al clickear //
function cambiarTema(){
    const iconoTema = document.getElementById('icono-tema')
    if(iconoTema){
        iconoTema.addEventListener('click', () => {
            if(sessionStorage.getItem("tema") === "oscuro"){
                sessionStorage.setItem("tema", "claro")
                removerTemaOscuro()
                iconoTema.classList.remove("fa-moon")
                iconoTema.classList.add("fa-sun")
                
            } else {
                sessionStorage.setItem("tema", "oscuro")
                aplicarTemaOscuro()
                iconoTema.classList.remove("fa-sun")
                iconoTema.classList.add("fa-moon")
            }
        })
    }
}



////////////////////////
// FUNCION INCIADORA //
// Aclaracion: Es una funcion asincrona ya que espera a que se obtengan los productos 
async function init() {
    redireccionarSinNombre();
    
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
    cambiarTema();
    
    
    // Espero a que se obtengan los productos y los retorne la funcion
    listaProductos = await obtenerProductos();
    // Muestro los productos
    mostrarProductos(listaProductos);
    
    filtrarUtiles(listaProductos);
    filtrarLibros(listaProductos);
    
    volverInicio();
    
    redireccionarPanelAdmin();
    
    redireccionarCarrito();
}

init();




