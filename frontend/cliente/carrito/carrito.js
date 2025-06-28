
let contenedorUsuario = document.getElementById("contenedor-tarjeta-usuario");

function obtenerNombreUsuarioSesionStorage(){
    let nombre = sessionStorage.getItem("nombreUsuario");
    let nuevo = `
    <i class="bi bi-person-circle"></i>
    <p>${nombre}</p>`;

    contenedorUsuario.innerHTML = nuevo;
}



obtenerNombreUsuarioSesionStorage();