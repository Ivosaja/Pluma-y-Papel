
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");


let listaCarrito = JSON.parse(sessionStorage.getItem("carrito"));



let itemsCarrito = document.getElementById("items-carrito");



let botonVaciarCarrito = document.getElementById("vaciar-carrito");




let contenedorTotal= document.getElementById("contenedor-Total-Comprar");





console.log(listaCarrito);

function obtenerNombreUsuarioSesionStorage(){
    let nombre = sessionStorage.getItem("nombreUsuario");
    let nuevo = `
    <i class="bi bi-person-circle"></i>
    <p>${nombre}</p>`;

    contenedorUsuario.innerHTML = nuevo;
}


function mostrarCarrito(lista){
    let productoCarrito = "";
    let precioTotal = 0;

    let textoTotal = "";
    
    lista.forEach((producto, indice) => {
        productoCarrito += `
        <li class="item-carrito">
            <div class="informacion">
                <button type="button" onclick="eliminar(${indice})">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${producto.url_imagen}" alt="imagen">
                <div class="detalle">
                    <p><strong>Nombre: </strong>${producto.nombre}</p>
                    <p><strong>Precio: </strong>$${producto.precio}</p>
                    <p><strong>Categoria: </strong>${producto.categoria}</p>
                </div>    
            </div>
            <div class="acciones">
                <button id="sumarProducto" type="button" onclick="sumarProducto(${producto.id_producto})">
                    <i class="bi bi-plus"></i>
                </button>
                <p><strong>${producto.cantidad}</strong></p>

                <button id="restarProducto" type="button" onclick="restarProducto(${producto.id_producto})">
                    <i class="bi bi-dash"></i>
                </button>
            </div>
        </li>
        `
        precioTotal += producto.precio * producto.cantidad;
    });


    if(productoCarrito.length>0){

        textoTotal+= `
        <div id="total">
            <p id="TextoTotal">Total:</p>
            <p id="precioTotal">$${precioTotal}</p>
        </div>    
        <div id="confirmar-compra">
            <button>Comprar</button>
        </div>    `;

    }
    else{
        textoTotal+= `
        <p id="TextoTotal">No se agregaron productos</p>`;
    }
    


    contenedorTotal.innerHTML = textoTotal;

    itemsCarrito.innerHTML = productoCarrito;
}



function sumarProducto(id){

    let productoAgregar = listaCarrito.find(producto=> producto.id_producto === id);

    productoAgregar.cantidad += 1;
    
    mostrarCarrito(listaCarrito);

}


function restarProducto(id){

    let productoRestar = listaCarrito.find(producto => producto.id_producto === id);


    let indice = listaCarrito.findIndex(producto=> producto.id_producto === id);

    productoRestar.cantidad -= 1;



    if(productoRestar.cantidad === 0){

        eliminar(indice);
    }


    mostrarCarrito(listaCarrito);
}


function eliminar(indice){

    listaCarrito.splice(indice,1);

    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

    mostrarCarrito(listaCarrito);

}


function vaciarCarrito(){


    botonVaciarCarrito.addEventListener("click",function(){

        let respuesta = confirm("Desea vaciar el carrito?");

        if(respuesta){

            listaCarrito = [];
        mostrarCarrito(listaCarrito);

        sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

        }
    })
}


function init(){


    mostrarCarrito(listaCarrito);


    obtenerNombreUsuarioSesionStorage();


    vaciarCarrito();

}




init();