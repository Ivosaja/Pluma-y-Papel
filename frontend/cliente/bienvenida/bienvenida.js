let form = document.querySelector(".form-ingresar");


let input =  document.getElementById("ingreso-nombre");

form.addEventListener("submit",(event)=>{

    event.preventDefault(); //prevenimos que se envie por defecto el form
    window.location.href="../productos/productos.html"


    console.log(input.value);

    sessionStorage.setItem("nombreUsuario", input.value);

})


