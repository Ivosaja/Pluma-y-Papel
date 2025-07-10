// Variable globales //

let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");
let contenedorVolverProductos = document.getElementById("contenedor-boton-volver");
let itemsCarrito = document.getElementById("items-carrito");
let botonVaciarCarrito = document.getElementById("vaciar-carrito");
let contenedorTotal= document.getElementById("contenedor-Total-Comprar");
let modalVaciarCarrito = document.getElementById('modal-vaciar-carrito');
let modalConfirmarCompra = document.getElementById('modal-confirmar-compra');
let listaCarrito = [];

////////////////////////////////////////////////////////////////////
// Funcion que redirecciona al usuario a la pantalla de productos //
function volverAProductos(){

    contenedorVolverProductos.addEventListener("click", function(){

        window.location.href = "../productos/productos.html";
    })

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que obtiene el nombre del usuario del sessionStorage y genera la tarjeta del usuario con su respectivo icono //
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

///////////////////////////////////////////////////////////////////////////////
// Funcion que agrega la clase darkmode al elemento raiz de la pagina (html) //
function aplicarTemaOscuro(){
    document.documentElement.classList.add("darkmode")
    
}

////////////////////////////////////////////////////////////////////////////////
// Funcion que remueve la clase darkmode del elemento raiz de la pagina (html) //
function removerTemaOscuro(){
    document.documentElement.classList.remove("darkmode")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que muestra el carrito, junto con el total y setea en sessionStorage el total del carrito //
function mostrarCarrito(lista){
    let productoCarrito = "";
    let precioTotal = 0;
    
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
    
    
    mostrarTotal(precioTotal);
    

    itemsCarrito.innerHTML = productoCarrito;

    sessionStorage.setItem("totalCarrito", precioTotal)
    
    clickearBotonComprar();

}

/////////////////////////////////////////////
// Funcion que unicamente muestra el total //
function mostrarTotal(precioTotal){
    let textoTotal = "";

    if(listaCarrito.length>0){
        
        textoTotal+= `
        <div id="total">
        <p id="TextoTotal">Total:</p>
        <p id="precioTotal">$${precioTotal}</p>
        </div>    
        <div id="confirmar-compra">
            <button id="boton-comprar">Comprar</button>
        </div> `;
        
    }
    else{
        textoTotal+= `
        <p id="TextoTotal">No se agregaron productos</p>`;
    }
    
    contenedorTotal.innerHTML = textoTotal;
}

////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que incrementa la cantidad de un producto y setea el carrito en sessionStorage //
function sumarProducto(id){

    let productoAgregar = listaCarrito.find(producto=> producto.id_producto === id);

    productoAgregar.cantidad += 1;    
    mostrarCarrito(listaCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

}

////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que decrementa la cantidad de un producto y setea el carrito en sessionStorage //
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

///////////////////////////////////////////////////////////
// Funcion que elimina completamente un item del carrito //
function eliminar(indice){

    listaCarrito.splice(indice,1);

    sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));

    mostrarCarrito(listaCarrito);

}

/////////////////////////////////////////////////////////////////
// Funcion que pregunta al usuario si desea vaciar el carrrito //
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que segun el tipo pasado por parametro aplica y rellenar el contenedor del modal vaciar carrito //
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

/////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que esconde el modal y remueve la clase para que el usuario puede interaccionar //
function esconderModal(modal){
    modal.style.display = "none";
    document.getElementById('encabezado').classList.remove('bloquear-interacciones');
    document.getElementById('principal').classList.remove('bloquear-interacciones');
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que muestra el modal y agrega la clase para que el usuario no pueda interaccionar //
function mostrarModal(modal){
    modal.style.display = "flex";

    /*basicamente es necesario esto ya que sino el usaurio Clietne podria interacionar con 
    todas las cosas de la pagina sin confirmar su eleccion */

    document.getElementById('encabezado').classList.add('bloquear-interacciones');
    document.getElementById('principal').classList.add('bloquear-interacciones');

}

////////////////////////////////////////////////////////////////////
// Funcion que vacia el carrito y setea el mismo en sessionStorage//
function modalBtnSi(){

    let btnSi = document.getElementById("btn-Si");    

    btnSi.addEventListener("click", function(){

        listaCarrito = []
        mostrarCarrito(listaCarrito);
        esconderModal(modalVaciarCarrito);
        sessionStorage.setItem("carrito", JSON.stringify(listaCarrito));
    })

}

///////////////////////////////////////////////////////////////////////////////
// Funcion que esconde el modal ya que el usuario no quiso vaciar el carrito //
function modalBtnNo(){
    let btnNo = document.getElementById("btn-No");
    btnNo.addEventListener("click", function(){

        esconderModal(modalVaciarCarrito);
    })
}

/////////////////////////////////////////////////////////////////////////////////
// Funcion que espera el evento del comprar para luego aplicar el modalComprar //
function clickearBotonComprar(){

    let btnComprar = document.getElementById("boton-comprar");

    if(btnComprar){
        btnComprar.addEventListener("click", function(){
    
    
            aplicarModalComprar()
    
        })
    }

}

///////////////////////////////////////////////////////////////////
// Funcion que aplica y rellena el contenedor del modal Comprar //
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

    confirmar();
    rechazar();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que tras confirmar la venta, espera el resultado y le agrega al contenedor la respuesta acorde al estado //
function confirmar(){
    let btnConfirmar = document.getElementById("confirmar");

    let contenido = "";
    btnConfirmar.addEventListener("click", async function(){

        let retorno =  await subirVenta();

        esconderModal(modalConfirmarCompra);
        
        if(retorno.estado){
            contenido = 
            `
                <i class="bi bi-check-circle-fill" id="icono-Excelente"></i>
                <p>Su compra se ha confirmado correctamente</p>
                <p class="retorno-mensaje">${retorno.mensaje}</p>
            `
        }
        else{
            contenido = 
            `
                <i class="fas fa-times" id="icono-Fallo"></i>
                <p>No se efectuo la compra</p>
                <p class="retorno-mensaje">${retorno.mensaje}</p>
            `
            
        
        }

        modalConfirmarCompra.innerHTML = contenido;
        
        mostrarModal(modalConfirmarCompra);
        generarTicket();
        
        setTimeout(volverInicioPostCompra, 5000);
    })
}

///////////////////////////////////////////////////////////////////////////
// Funcion que tras el rechazo de una compra esconde el modal de Comprar //
function rechazar(){
    let btnRechazar = document.getElementById("rechazar");

    btnRechazar.addEventListener("click", function(){

        esconderModal(modalConfirmarCompra);
    })
}

//////////////////////////////////////////////////////////////////////////
// Funcion que genera el ticket de compra con sus respectivos detalles //
function generarTicket(){

    const {jsPDF} = window.jspdf;

    const doc = new jsPDF();

    const nombreUsuario = sessionStorage.getItem("nombreUsuario")

    let y = 20; 

    doc.setFontSize(20);

    doc.text("Ticket de compra", 10 , y);

    y+= 10
    
    doc.setFontSize(15)
    doc.text(`Gracias por su compra, ${nombreUsuario}!`, 10, y)

    y+=5
    doc.setFontSize(14);
    doc.text(`------------------------------------------------`, 10, y)
    y+= 10 ;
    for(let i = 0; i<listaCarrito.length;i++){

        doc.text(`Nombre: ${listaCarrito[i].nombre} - Precio: $${listaCarrito[i].precio} - Cantidad: ${listaCarrito[i].cantidad} `, 10 , y);

        y+=10;
    }

    y += 7;

    const total = listaCarrito.reduce((sum, prod) => sum + (prod.precio * prod.cantidad), 0);

    y += 8;

    doc.text(`------------------------------------------------`, 10, y)
    y+=5
    doc.text(`TOTAL: $${total.toFixed(2)}`, 10, y);

    doc.save("🖋️  Pluma & Papel - Ticket");
}

/////////////////////////////////////////////////////////////////////////////////////
// Funcion que te redirecciona a la pantalla de bienvenida tras realizar una compra //
function volverInicioPostCompra(){

    document.body.classList.add("transicionBienvenida");
    sessionStorage.removeItem("carrito");
    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("totalCarrito");
    setTimeout(() => {
        window.location.href = "../bienvenida/index.html";
    }, 1000);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que te redirecciona a la pantalla de inicio si el usuario quiere acceder sin poner su nombre //
function volverInicio(){
    const nombreGuardado  = sessionStorage.getItem("nombreUsuario");

    if(!nombreGuardado){
        window.location.href = "../bienvenida/index.html";
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincronica que realiza una peticion post a un endpoint para guardar la venta en la bd junto con sus detalles //
async function subirVenta(){
    try{
        let response = await fetch("http://localhost:1001/api/sales/finalizePurchase", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                carrito: JSON.parse(sessionStorage.getItem("carrito")),
                total: sessionStorage.getItem("totalCarrito"),
                nombreUsuario: sessionStorage.getItem("nombreUsuario")
            })
        })

        if(response.ok){
            let result = await response.json()
            return {estado: true, mensaje: result.message};
        } else{
            let result = await response.json()
            return {estado: false, mensaje: result.message};
        }

    } catch(err){
        console.error(err);
        return {estado: false, mensaje: "Error al hacer la peticion"};
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Funcion que cambia el tema con su respectivo icono al hacer click en el mismo //
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


///////////////////////
// FUNCION INCIADORA //

function init(){
    volverInicio();
    
    if(sessionStorage.getItem('carrito')){

        listaCarrito = JSON.parse(sessionStorage.getItem("carrito"));
    }

    volverAProductos();
    vaciarCarrito();

    mostrarCarrito(listaCarrito);

    obtenerNombreUsuarioSesionStorage();

    cambiarTema();



}

init();