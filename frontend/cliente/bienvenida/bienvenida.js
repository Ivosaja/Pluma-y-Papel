const form = document.querySelector(".form-ingresar");
const input =  document.getElementById("ingreso-nombre");

function guardarNombreUsuario(){
    form.addEventListener("submit",(event) =>{
        event.preventDefault(); 
        if(validarNombreUsuario()){
            window.location.href="../productos/productos.html" 
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

function aplicarDarkMode(){
    let btnDarkMode = document.getElementById("btnDarkMode");
    let icon = btnDarkMode.querySelector("i");
    if(btnDarkMode){
        btnDarkMode.addEventListener("click", function(){
            
            if(sessionStorage.getItem("tema")==="oscuro"){
    
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
function init(){
    sessionStorage.removeItem("tema"); 
    guardarNombreUsuario()
    aplicarDarkMode();
}

init();


