
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");

let listaCarrito = [];



let itemsCarrito = document.getElementById("items-carrito");

let botonVaciarCarrito = document.getElementById("vaciar-carrito");


let contenedorTotal= document.getElementById("contenedor-Total-Comprar");

let modalVaciarCarrito = document.getElementById('modal-vaciar-carrito');





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
                <button id="restarProducto" type="button" onclick="restarProducto(${producto.id_producto})">
                    <i class="bi bi-dash"></i>
                </button>
                <p><strong>${producto.cantidad}</strong></p>
                <button id="sumarProducto" type="button" onclick="sumarProducto(${producto.id_producto})">
                    <i class="bi bi-plus"></i>
                </button>

            </div>
        </li>
        `
        precioTotal += producto.precio * producto.cantidad;
    });
    
    
    // Chequear esto
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
    sessionStorage.setItem("totalCarrito", precioTotal)
}



function sumarProducto(id){

    let productoAgregar = listaCarrito.find(producto=> producto.id_producto === id);

    productoAgregar.cantidad += 1;    
    mostrarCarrito(listaCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

}


function restarProducto(id){

    let productoRestar = listaCarrito.find(producto => producto.id_producto === id);

    let indice = listaCarrito.findIndex(producto=> producto.id_producto === id);

    productoRestar.cantidad -= 1;

    if(productoRestar.cantidad === 0){

        eliminar(indice);
    }

    mostrarCarrito(listaCarrito);

    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));
}


function eliminar(indice){

    listaCarrito.splice(indice,1);

    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

    mostrarCarrito(listaCarrito);

}


function vaciarCarrito(){

    botonVaciarCarrito.addEventListener("click",function(){

        if(listaCarrito.length===0){

            aplicarModal("noPreguntar");
        }
        else{
            aplicarModal("preguntaVaciar");
        }
    })
}



function aplicarModal(modalTipo){
    let contenido = "";

    if(modalTipo==="preguntaVaciar"){

        contenido = `
            <p>Desea vaciar el carrito?</p>

            <div id="botones-modal">
                <button id="btn-Si">Si</button>
                <button id="btn-No">No</button>
            </div>
            `

        modalVaciarCarrito.innerHTML = contenido;

        mostrarModal();

        /*basciametne es necesario esto ya que sino el usaurio Clietne poddria interacionar con todas las cosas de la pagina
            sin confirmar su eleccion */

        document.getElementById('encabezado').classList.add('bloquear-interacciones');
        document.getElementById('principal').classList.add('bloquear-interacciones');

        modalBtnNo();
        modalBtnSi();

    }
    else if(modalTipo === "noPreguntar"){

        contenido = 
                `
                <i class="fas fa-times"></i>
                <p>No se puede vaciar el carrito ya que no hay ningun producto agregado</p>
                `
        modalVaciarCarrito.innerHTML = contenido;

        mostrarModal();

        setTimeout(esconderModal, 3000);
    }

}


function esconderModal(){

    modalVaciarCarrito.style.display = "none";
    //aca removes la clase aplciada que no permite selecionar otra cosa que no sea el modal

    document.getElementById('encabezado').classList.remove('bloquear-interacciones');
    document.getElementById('principal').classList.remove('bloquear-interacciones');
}

function mostrarModal(){

    modalVaciarCarrito.style.display = "flex";
}


function modalBtnSi(){

    let btnSi = document.getElementById("btn-Si");    
    btnSi.addEventListener("click", function(){

        listaCarrito = []
        mostrarCarrito(listaCarrito);

        sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

        esconderModal();
    })

}

function modalBtnNo(){
    let btnNo = document.getElementById("btn-No");
    btnNo.addEventListener("click", function(){
    
            esconderModal();
        })
}


////FUNCION INICIADORA //////

function init(){

    if(sessionStorage.getItem('carrito')){

        listaCarrito = JSON.parse(sessionStorage.getItem("carrito"));
        console.log(listaCarrito);
    }

    mostrarCarrito(listaCarrito);

    obtenerNombreUsuarioSesionStorage();

    vaciarCarrito();

}

init();