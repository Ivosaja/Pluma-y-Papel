//VARIABLE GLOBALES///

let botonPassword = document.getElementById("ocultar");
let password = document.getElementById("contraseña");


/*Buscamos la etiquete <i> que este dentro del boton con ID , mostrarPassword
en este caso no usamos el document entero*/
let icono = botonPassword.querySelector('i');


function init(){
    ocultarContra();
}



function ocultarContra(){
    botonPassword.addEventListener("click", () => {

        //Hacemos un conditional para poder mostrar y ocultar//

        if (password.type === "password") {
        password.type = "text"; 
        icono.classList.remove('bi-eye-slash-fill');
        icono.classList.add('bi-eye-fill');
        } else {
        password.type = "password";
        icono.classList.remove('bi-eye-fill');
        icono.classList.add('bi-eye-slash-fill');
        }
    });


}


init();