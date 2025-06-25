// La funcion recibe por parametro el "inputId" que representa el id del input donde escribio la contrasenia, y el iconElement que representa el elemento "i" que contiene el icono

function hacerVisibleContrasenia(inputId, iconElement){
    // En esta funcion, obtengo el elemento por ese Id que me pasaron por parametro, y en base a ese, verifico si su atributo esta en tipo password, si es asi, cambio el atributo a text y cambio la clase del icono con el ojo cerrado a la clase del icono con el ojo abierto, y sino, al reves.
    const input = document.getElementById(inputId)

    if(input.getAttribute("type") === "password"){
        input.setAttribute("type", "text")
        iconElement.classList.remove('bi-eye-slash-fill')
        iconElement.classList.add('bi-eye-fill')
    } else {
        input.setAttribute("type", "password")
        iconElement.classList.remove('bi-eye-fill')
        iconElement.classList.add('bi-eye-slash-fill')
    } 
}
