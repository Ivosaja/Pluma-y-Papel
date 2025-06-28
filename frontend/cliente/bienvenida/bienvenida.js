const form = document.querySelector(".form-ingresar");
const input =  document.getElementById("ingreso-nombre");

function guardarNombreUsuario(){
    form.addEventListener("submit",(event) =>{
        event.preventDefault(); //prevenimos que se envie por defecto el form
        // TODO -> Validacion de nombre de usuario
        if(validarNombreUsuario()){
            window.location.href="../productos/productos.html" // cambiamos la localizacion de la ventana a otra cuando se haga click en el boton de submit
            console.log(input.value);
            // Guardamos en session storage el nombre del usuario ingresado por el input del formulario
            sessionStorage.setItem("nombreUsuario", input.value);
        }
    })
}

function validarNombreUsuario(){
    const inputValue = input.value.trim();
    if(inputValue.length > 10 || inputValue.length <2 || inputValue.length === 0){
        input.style.border = "2px solid #e57373"
        return false;
    }
    return true
}

guardarNombreUsuario()


