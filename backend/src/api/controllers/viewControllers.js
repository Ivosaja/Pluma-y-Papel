import { selectAllProducts } from "../models/productModel.js";

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

export const vistaCrearProducto = (req, res) => {
    res.render("altaProducto", {
        title: "Alta Producto - Pluma & Papel"
    })
}

export const vistaModificarProducto = (req, res) => {
    res.render("modificarProducto", {
        title: "Modificar Producto - Pluma & Papel"
    })
}