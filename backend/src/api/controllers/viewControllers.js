//////////////////////
// View controllers //

import { selectAllProducts } from "../models/productModel.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que obtiene todos los productos por el modelo product y renderiza la view "dashboard" pasandole esa lista de productos //
export const vistaProductos =  async(req,res)=>{
    try{
        let respuesta = await selectAllProducts();

        res.render("dashboard",{
            title:"Dashboard Admin - Pluma & Papel",
            productos: respuesta[0]
        })
    }catch(err){
        console.error(err);

    }
}

///////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que renderiza la view "altaProducto" para agregar un nuevo producto //
export const vistaCrearProducto = (req, res) => {
    res.render("altaProducto", {
        title: "Alta Producto - Pluma & Papel"
    })
}

////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que renderiza la view "modificarProducto" para modificar un producto //
export const vistaModificarProducto = (req, res) => {
    res.render("modificarProducto", {
        title: "Modificar Producto - Pluma & Papel"
    })
}