let listaProductos = document.querySelector('.listaProductos')
const modal = document.getElementById('modal')

async function obtenerTodosLosProductos(){
    try{
        let resultado = await fetch('http://localhost:1001/api/products/getAllProducts')
        let data = await resultado.json();
        return data

    } catch(err){
        console.error("Error al obtener todos los productos", err)
        return []
    }
}

function mostrarProductos(arrayProductos){
    let productos = '';
    //console.log(arrayProductos)

    if(arrayProductos.length === 0){
        productos = `<p>No se encontraron productos</p>`
        alert("No se pudo hacer la peticion correctamente")

    } else{
        alert(arrayProductos.message)
        arrayProductos.payload.forEach(producto => {
            productos += `
            <li class="itemProducto">
                <div class="itemProductoInfo">
                    <p><strong>ID: </strong>${producto.id_producto}</p>
                    <img src="${producto.url_imagen}" alt="">
                    <p><strong>Nombre: </strong>${producto.nombre}</p>
                    <p><strong>Precio: </strong>$${producto.precio}</p>
                    <p><strong>Categoria: </strong>${producto.categoria}</p>
                    <p>
                        <strong>Activo: </strong>
                        <span class="${producto.activo === 1 ? 'activo' : 'inactivo'}">${producto.activo === 1 ? true : false}</span>
                    </p>
                </div>
                <div class="acciones">
                    <button type="button" onclick="modificarProducto(${producto.id_producto})" id="btn-modificarProducto">
                        <i class="fas fa-pen iconModificar"></i>
                    </button>
                    <button type="button" onclick="eliminarProducto(${producto.id_producto})">
                        <i class="fas fa-trash iconEliminar"></i>
                    </button>
                    <button type="button" onclick="activarProducto(${producto.id_producto})">
                        <i class="fas fa-check iconActivar"></i>
                    </button>
                </div>
            </li>
            `
        })
    }

    listaProductos.innerHTML = productos;
}

function modificarProducto(idProducto){
    window.location.href = '../modificarProducto/modificarProducto.html'
    sessionStorage.setItem("idProducto", idProducto)
}

function eliminarProducto(idProducto){
    usarModal("eliminar",idProducto);
    mostrarModal();


    // let productos = await obtenerTodosLosProductos();
    // mostrarProductos(productos);
}

async function eliminar(id){

    try{
        let respuesta = await fetch(`http://localhost:1001/api/products/deleteProduct/${id}`,{
            method: `PUT`})

        let data = await respuesta.json()

        return data.message;
    }catch(err){
        console.error(err);
        return "Error al hacer la peticion"
    }

}

async function activarProducto(idProducto){
    usarModal('activar', idProducto)
    mostrarModal()
}

async function activar(id){
    try{
        let respuesta = await fetch(`http://localhost:1001/api/products/activateProduct/${id}`, {
            method: 'PUT'
        })
        let data = await respuesta.json()

        if(respuesta.ok){
            return {estado: true, mensaje: data.message}
        } else{
            return {estado: false, mensaje: data.mensaje}
        }

    } catch(err){
        console.error(err)
        return {estado: false, mensaje: "Error al hacer la peticion"}
    }
}

function agregarProducto(){
    const btnAgregarProducto = document.getElementById('btn-agregarProducto')
    btnAgregarProducto.addEventListener('click', () => {
        window.location.href = '../altaProducto/altaProducto.html'
    })
}


function volverProductos(){
    let flechiteVolver = document.getElementById("volverProductos");

    flechiteVolver.addEventListener("click", function(){

        window.location.href = "../../cliente/productos/productos.html";

    })

}

function usarModal(tipo, idProducto){

    if(tipo==="eliminar"){
        modal.innerHTML = `
        <p>Desea dar de baja este producto?</p>
        <div id="contenedorBotones">
            <button id="btnSi">Si</button>
            <button id="btnNo">No</button>
        </div>
        ` 
        let btnSi = document.getElementById("btnSi");
        let btnNo = document.getElementById("btnNo");

        btnSi.addEventListener("click", async function(){

            let resultado = await eliminar(idProducto)

            modal.innerHTML = `<p>${resultado}</p>`;

            setTimeout(async () => {
                ocultarModal();
                const productos = await obtenerTodosLosProductos();
                mostrarProductos(productos);
            }, 3000);
        })

        btnNo.addEventListener("click", function(){

            ocultarModal();
        })
        

    }else if(tipo==="activar"){
        modal.innerHTML = `
        <p>Desea activar este producto?</p>
        <div id="contenedorBotones">
            <button id="btnSi">Si</button>
            <button id="btnNo">No</button>
        </div>
        `

        let btnSi = document.getElementById('btnSi')
        let btnNo = document.getElementById('btnNo')

        btnSi.addEventListener('click', async() => {
            let resultado = await activar(idProducto)

            if(resultado.estado){
                modal.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                <p>${resultado.mensaje}</p>
                `
            } else{
                modal.innerHTML = `
                <i class="fas fa-times"></i>
                <p>${resultado.mensaje}</p>
                `
            }

            setTimeout(async() => {
                ocultarModal()
                const productos = await obtenerTodosLosProductos()
                mostrarProductos(productos)
            }, 3000)
        })

        btnNo.addEventListener('click', () => {
            ocultarModal()
        })
    }
}



function mostrarModal(){

    modal.style.display = "flex"
    document.querySelector('.contenedor-principal').classList.add('bloquear-interacciones')
}


function ocultarModal(){
    modal.style.display = "none"
    document.querySelector('.contenedor-principal').classList.remove('bloquear-interacciones')
}


async function init(){
    listaProductos.innerHTML = `<p>Cargando productos...</p>`

    let productos = await obtenerTodosLosProductos()
    mostrarProductos(productos)

    agregarProducto()

    volverProductos();
}

init()