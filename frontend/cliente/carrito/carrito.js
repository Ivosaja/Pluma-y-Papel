
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");


let listaCarrito = JSON.parse(sessionStorage.getItem("carrito"));



let itemsCarrito = document.getElementById("items-carrito");



let botonVaciarCarrito = document.getElementById("vaciar-carrito");





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
    
    lista.forEach((producto, indice) => {
        productoCarrito += `
            <div class="informacion">
                <button type="button" onclick="eliminar(${indice})">
                    <i class="bi bi-x"></i>
                </button>
                <img src="${producto.url_imagen}" alt="imagen">
                <p><strong>Nombre: </strong>${producto.nombre}</p>
                <p><strong>Precio: </strong>$${producto.precio}</p>
                <p><strong>Categoria: </strong>${producto.categoria}</p>
            </div>
            <div class="acciones">
                <button type="button" onclick="sumarProducto(${producto.id_producto})">
                    <i class="bi bi-plus"></i>
                </button>
                <p><strong>${producto.cantidad}</strong></p>

                <button type="button" onclick="restarProducto(${producto.id_producto})">
                    <i class="bi bi-dash"></i>
                </button>
            </div>
        `
        precioTotal += producto.Precio * producto.cantidad;
    });

    productoCarrito += `
    <li>
        <p>--------------------------</p>
        <p id="precioTotal">Total: $${precioTotal}</p>
    </li>`;

    itemsCarrito.innerHTML = productoCarrito;
}



function sumarProducto(id){

    for(let i = 0;i<listaCarrito.length;i++){


        if(listaCarrito[i].id_producto===id){

            listaCarrito[i].cantidad += 1;
        }
    }
    
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

    sessionStorage.setItem("carrito", listaCarrito);

    mostrarCarrito(listaCarrito);

}





function vaciarCarrito(){


    botonVaciarCarrito.addEventListener("click",function(){

        let respuesta = confirm("Desea vaciar el carrito?");

        if(respuesta){

            listaCarrito = [];
        mostrarCarrito(listaCarrito);

        sessionStorage.setItem("carrito", listaCarrito);

        }
    })
}


function init(){


    mostrarCarrito(listaCarrito);


    obtenerNombreUsuarioSesionStorage();


    vaciarCarrito();

}




init();