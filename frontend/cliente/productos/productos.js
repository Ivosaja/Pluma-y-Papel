let ListaPrueba = [
    {id:1,nombre:"Abrochadora",precio:2500,categoria:"Utiles",url_imagen:"../../../assets/img/productos/abrochadora.png"},
    {id:2,nombre:"Asesinato en el orient express",precio:3000,categoria:"Libros",url_imagen:"../../../assets/img/productos/asesinatoOrientExpress.png"},
    {id:3,nombre:"Cartuchera",precio:500,categoria:"Utiles",url_imagen:"../../../assets/img/productos/cartucheraStandard.png"},
    {id:4,nombre:"A Cuatro Vientos",precio:25000,categoria:"Libros",url_imagen:"../../../assets/img/productos/aCuatroVientos1.png"},
    {id:5,nombre:"Bibliografo",precio:2500,categoria:"Utiles",url_imagen:"../../../assets/img/productos/bibliorato.png"},
    {id:6,nombre:"Voligoma",precio:250,categoria:"Utiles",url_imagen:"https://i.postimg.cc/3JqRXPQH/boligoma.png"},
    {id:7,nombre:"Libro Historia",precio:250,categoria:"Utiles",url_imagen:"https://i.postimg.cc/cH5yqGmx/historia-Santillana.jpg"},
    {id:8,nombre:"Clips",precio:250,categoria:"Utiles",url_imagen:"../../../assets/img/productos/clips.png"}
]


let contenedorProductos = document.getElementById("contenedor-productos");


function mostrarProductos(lista){ 


    let cartaProducto = "";
    for(let i = 0; i<lista.length; i++){
        
            cartaProducto += `
                            <div class="tarjeta-producto">
                                <img class="imagen-Producto" src=${lista[i].url_imagen}>
                                <h3>${lista[i].nombre}</h3>
                                <p>Precio:$ ${lista[i].precio}</p>
                                <button class="boton-carrito" onClick="agregarCarrito( ${lista[i].id})">Agregar a carrito</button>
                            </div>`                                                 
    };

contenedorProductos.innerHTML = cartaProducto; 

}



let filtradoUtiles = document.getElementById("filtrarUtiles")

filtradoUtiles.addEventListener("click",function(){

    let filtrados = ListaPrueba.filter(producto=>
        producto.categoria==="Utiles"
    )
    mostrarProductos(filtrados)

})


let filtradoLibros= document.getElementById("filtrarLibros")

filtradoLibros.addEventListener("click",function(){

    let filtrados = ListaPrueba.filter(producto=>
        producto.categoria==="Libros"
    )
    mostrarProductos(filtrados)

})
mostrarProductos(ListaPrueba);