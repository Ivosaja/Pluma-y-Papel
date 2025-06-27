const form = document.querySelector(".form-ingresar");
const input =  document.getElementById("ingreso-nombre");

function guardarNombreUsuario(){
    form.addEventListener("submit",(event) =>{
        event.preventDefault(); //prevenimos que se envie por defecto el form
        window.location.href="../productos/productos.html" // cambiamos la localizacion de la ventana a otra cuando se haga click en el boton de submit
        
        console.log(input.value);
        // Guardamos en session storage el nombre del usuario ingresado por el input del formulario
        sessionStorage.setItem("nombreUsuario", input.value);
    
    })
}

guardarNombreUsuario()


