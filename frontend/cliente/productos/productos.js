
//variable globales

let contenedorProductos = document.getElementById("contenedor-productos");
let filtradoUtiles = document.getElementById("filtrarUtiles")
let filtradoLibros= document.getElementById("filtrarLibros")
let listaProductos = [];
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");
const contenedorBtnCarrito = document.getElementById('contenedor-boton-carrito')
let carrito = [] // TODO -> aqui irian los productos que el usuario agrega al carrito

////////////////////////////////////////////////////////////

async function obtenerProductos() {
    try{

        let respuesta = await fetch("http://localhost:1001/getAllProducts");
        let data = await respuesta.json();
        return data.payload;

    }catch(error){

        console.error("Error al obtener los producstos ",error);
    }
}

///////////////////////////////////////////////////////////////////

function mostrarProductos(lista){ 
    let cartaProducto = "";
    for(let i = 0; i<lista.length; i++){
            cartaProducto += `
                <div class="tarjeta-producto">
                    <img class="imagen-Producto" src=${lista[i].url_imagen}>
                    <h3>${lista[i].nombre}</h3>
                    <p>Precio: $${lista[i].precio}</p>
                    <div id="agregar-eliminar-producto">
                        <button id="boton-agregar" onclick="agregarCarrito(${lista[i].id_producto})">Agregar a carrito</button>
                        <button id="boton-eliminar" onclick="borrarCarrito(${lista[i].id_producto})"><i class="bi bi-trash3-fill"></i></button>
                    </div>
                </div>
                `                                              
    };
    contenedorProductos.innerHTML = cartaProducto; 
    mostrarCantidadProductosCarrito()
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
    <p>${nombre.toLowerCase()}</p>`;

    contenedorUsuario.innerHTML = nuevo;
}

///////////////////////////////////////////////////////////////////


function filtrarUtiles(lista){
    filtradoUtiles.addEventListener("click",function(){

        let filtrados = lista.filter(producto=>
            producto.categoria==="Utiles"
        )
        mostrarProductos(filtrados)
    })

}

function filtrarLibros(lista){
    filtradoLibros.addEventListener("click",function(){

        let filtrados = lista.filter(producto=>
            producto.categoria==="Libros"
        )
    mostrarProductos(filtrados)

    })

}

///////////////////////////////////////////////////////////////////

function agregarCarrito(idProducto){
    const producto = listaProductos.find(producto => producto.id_producto === idProducto);
    carrito.push(producto)
    sessionStorage.setItem("carrito", JSON.stringify(carrito)) // guardo en session storage el carrito
    console.log(carrito)
}

///////////////////////////////////////////////////////////////////


async function init() {
    // Espero a que se obtengan los productos y los retorne la funcion
    listaProductos = await obtenerProductos();
    // Muestro los productos
    mostrarProductos(listaProductos);

    filtrarUtiles(listaProductos);
    filtrarLibros(listaProductos);

    obtenerNombreUsuarioSesionStorage();

}

init();




