// Variables Globales //
const form = document.querySelector(".form-ingresar");
const input =  document.getElementById("ingreso-nombre");


////////////////////////////////////////////////////////////////////
// Funcion que almacena el nombre de usuario en el sessionStorage //
function guardarNombreUsuario(){
    form.addEventListener("submit",(event) =>{
        event.preventDefault(); 
        if(validarNombreUsuario()){
            window.location.href="../productos/productos.html" 
            sessionStorage.setItem("nombreUsuario", input.value);
        }
    })
}

////////////////////////////////////////////////////////////////////
// Funcion que valida el nombre ingresado por el usuario en el formulario //
function validarNombreUsuario(){
    const inputValue = input.value.trim();
    if(inputValue.length > 10 || inputValue.length <2 || inputValue.length === 0){
        input.style.border = "2px solid #e57373"
        return false;
    }
    return true
}

///////////////////////////////////////////////////////////////////////////////////////
// Funcion que aplica o remueve el tema oscuro de la pantalla bienvenida en adelante //
function aplicarDarkMode(){
    let btnDarkMode = document.getElementById("btnDarkMode");
    let icon = btnDarkMode.querySelector("i");
    if(btnDarkMode){
        btnDarkMode.addEventListener("click", function(){
            
            if(sessionStorage.getItem("tema")==="oscuro"){

                // Tuvimos que aplicar document.documentElement ya que se aplica sobre el elemento raiz de la pagina ("html")
                // Soluciona problema de glitch visual entre cambio de pantallas
                document.documentElement.classList.remove("darkmode");
                
                sessionStorage.setItem("tema", "claro");
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }
            else{
                document.documentElement.classList.add("darkmode");
                sessionStorage.setItem("tema", "oscuro");
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }
        })
    }
}

/////////////////////////////////////////////////////////////
// Funcion principal que ejecuta todas las demas funciones //
function init(){
    sessionStorage.removeItem("tema"); 
    guardarNombreUsuario()
    aplicarDarkMode();
}
init();


