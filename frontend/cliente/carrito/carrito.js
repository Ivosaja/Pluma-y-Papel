///VARIABLES GLOBLES///
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");
let contenedorVolverProductos = document.getElementById("contenedor-boton-volver");
let listaCarrito = [];
let itemsCarrito = document.getElementById("items-carrito");
let botonVaciarCarrito = document.getElementById("vaciar-carrito");
let contenedorTotal= document.getElementById("contenedor-Total-Comprar");
let modalVaciarCarrito = document.getElementById('modal-vaciar-carrito');
let modalConfirmarCompra = document.getElementById('modal-confirmar-compra');
//////////////////////////////////////////////////////////////////////////

function volverAProductos(){

    contenedorVolverProductos.addEventListener("click", function(){

        window.location.href = "../productos/productos.html";
    })

}
//////////////////////////////////////////////////////////////////////////
function obtenerNombreUsuarioSesionStorage(){
    let nombre = sessionStorage.getItem("nombreUsuario");
    let nuevo = `
    <i class="bi bi-person-circle"></i>
    <p>${nombre}</p>`;

    contenedorUsuario.innerHTML = nuevo;
}
//////////////////////////////////////////////////////////////////////////

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
            <button id="boton-comprar">Comprar</button>
        </div>    `;
        
    }
    else{
        textoTotal+= `
        <p id="TextoTotal">No se agregaron productos</p>`;
    }
    
    contenedorTotal.innerHTML = textoTotal;
    itemsCarrito.innerHTML = productoCarrito;
    sessionStorage.setItem("totalCarrito", precioTotal)

    clickearBotonComprar();


}

//////////////////////////////////////////////////////////////////////////
function sumarProducto(id){

    let productoAgregar = listaCarrito.find(producto=> producto.id_producto === id);

    productoAgregar.cantidad += 1;    
    mostrarCarrito(listaCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

}

//////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////

function eliminar(indice){

    listaCarrito.splice(indice,1);

    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

    mostrarCarrito(listaCarrito);

}

//////////////////////////////////////////////////////////////////////////
function vaciarCarrito(){

    botonVaciarCarrito.addEventListener("click",function(){

        if(listaCarrito.length===0){

            aplicarModalVaciarCarrito("noPreguntar");
        }
        else{
            aplicarModalVaciarCarrito("preguntaVaciar");
        }
    })
}

//////////////////////////////////////////////////////////////////////////

function aplicarModalVaciarCarrito(modalTipo){
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

        mostrarModal(modalVaciarCarrito);
        opacidad("realizar");
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

        modalVaciarCarrito.style.flexDirection = "row";

        mostrarModal(modalVaciarCarrito);

        setTimeout(() => {
                esconderModal(modalVaciarCarrito);
                }, 3000);
    }

}

//////////////////////////////////////////////////////////////////////////

function esconderModal(modal){

    modal.style.display = "none";
    //aca removes la clase aplciada que no permite selecionar otra cosa que no sea el modal

    document.getElementById('encabezado').classList.remove('bloquear-interacciones');
    document.getElementById('principal').classList.remove('bloquear-interacciones');

    
}

//////////////////////////////////////////////////////////////////////////

function mostrarModal(modal){
    modal.style.display = "flex";

    /*basciametne es necesario esto ya que sino el usaurio Clietne poddria interacionar con todas las cosas de la pagina
            sin confirmar su eleccion */
    document.getElementById('encabezado').classList.add('bloquear-interacciones');
    document.getElementById('principal').classList.add('bloquear-interacciones');

}

//////////////////////////////////////////////////////////////////////////

function modalBtnSi(){

    let btnSi = document.getElementById("btn-Si");    

    btnSi.addEventListener("click", function(){

        listaCarrito = []
        mostrarCarrito(listaCarrito);

        esconderModal(modalVaciarCarrito);
        opacidad("ocultar");
        sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));
    })

}

//////////////////////////////////////////////////////////////////////////

function modalBtnNo(){
    let btnNo = document.getElementById("btn-No");
    btnNo.addEventListener("click", function(){
    
            esconderModal(modalVaciarCarrito);
            opacidad("ocultar");
        })
}


//////////////////////////////////////////////////////////////////////////


function clickearBotonComprar(){

    let btnComprar = document.getElementById("boton-comprar");

    btnComprar.addEventListener("click", function(){

        console.log("dfsdhfsdfh");

        aplicarModalComprar()

    })
}
//////////////////////////////////////////////////////////////////////////
function aplicarModalComprar(){

    let contenido = 
    `
    <p>Desea confirmar la compra?</p>
    <div id="contenedor-confirmar-rechazar">

        <button id="confirmar">Confirmar</button>
        <button id="rechazar">Rechazar</button>
    </div>    
    `
    modalConfirmarCompra.innerHTML = contenido;

    mostrarModal(modalConfirmarCompra);
    opacidad("realizar");

    confirmar();
    rechazar();
}


//////////////////////////////////////////////////////////////////////////


function confirmar(){
    let btnConfirmar = document.getElementById("confirmar");


    btnConfirmar.addEventListener("click", function(){
    
        esconderModal(modalConfirmarCompra);


        let contenido = 
            `
                <i class="bi bi-check-circle-fill"></i>
                <p>Su compra se ha confirmado correctamente</p>

                <div id="contenedor-Volver">
                    <button id="volver">Volver</button>
                </div>
            `
        modalConfirmarCompra.innerHTML = contenido;
        
        mostrarModal(modalConfirmarCompra);

        volverInicio();

        // esconderModal(modalConfirmarCompra),
        // opacidad("ocultar");

    })
}

//////////////////////////////////////////////////////////////////////////


function rechazar(){
    let btnRechazar = document.getElementById("rechazar");

    btnRechazar.addEventListener("click", function(){


        esconderModal(modalConfirmarCompra);
        opacidad("ocultar");

    })

}
//////////////////////////////////////////////////////////////////////////
function opacidad(accion){
    if(accion === "realizar")
    {
        document.getElementById('encabezado').classList.add('opacidad');
        document.getElementById('principal').classList.add('opacidad');
        
    }
    else{
        document.getElementById('encabezado').classList.remove('opacidad');
        document.getElementById('principal').classList.remove('opacidad');
    }
}
//////////////////////////////////////////////////////////////////////////
function volverInicio(){

    let btnVolver = document.getElementById("volver");

    btnVolver.addEventListener("click", function(){


        window.location.href = "../bienvenida/index.html";

        sessionStorage.clear();

    })
}




////FUNCION INICIADORA //////

function init(){

    if(sessionStorage.getItem('carrito')){

        listaCarrito = JSON.parse(sessionStorage.getItem("carrito"));
        console.log(listaCarrito);
    }

    volverAProductos();

    mostrarCarrito(listaCarrito);

    obtenerNombreUsuarioSesionStorage();

    vaciarCarrito();

}

init();