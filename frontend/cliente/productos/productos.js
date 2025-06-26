
//variable globales

let contenedorProductos = document.getElementById("contenedor-productos");

let filtradoUtiles = document.getElementById("filtrarUtiles")

let filtradoLibros= document.getElementById("filtrarLibros")

let listaProductos = [];

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
                                <p>Precio:$ ${lista[i].precio}</p>
                                <div id="agregar-eliminar-producto">
                                    <button id="boton-agregar" onClick="agregarCarrito( ${lista[i].id})">Agregar a carrito</button>
                                    <button id="boton-eliminar"><i class="bi bi-trash3-fill"></i></button>
                                </div>
                            </div>`                                                 
    };

contenedorProductos.innerHTML = cartaProducto; 

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


async function init() {

    listaProductos = await obtenerProductos();

    mostrarProductos(listaProductos);

    filtrarUtiles(listaProductos);
    filtrarLibros(listaProductos);
}


init();




