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
    let btnDArkMode = document.getElementById("btnDarkMode");
    if(btnDArkMode){
        btnDArkMode.addEventListener("click", function(){
            
            if(sessionStorage.getItem("tema")==="oscuro"){
    
                document.body.classList.remove("dark-mode");
                
                sessionStorage.setItem("tema", "claro");
    
            }
            else{
                document.body.classList.add("dark-mode");
                sessionStorage.setItem("tema", "oscuro");
            }
        })
    }
}
function init(){
    guardarNombreUsuario()
    aplicarDarkMode();
}

init();


