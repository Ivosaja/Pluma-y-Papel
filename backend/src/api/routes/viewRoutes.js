import { Router } from "express";

const router = Router()

// Endpoint que muestra vista con todos los productos en el dashboard del admin
router.get("/admin/dashboard", async(req,res)=>{
    try{
        let respuesta = await selectAllProducts();

        res.render("dashboard",{
            title:"Dashboard Admin - Pluma & Papel",
            productos: respuesta[0]
        })
    }catch(err){
        console.error(err);

    }
})

// Endpoint que muestra vista de la pantalla para crear un nuevo producto
router.get("/admin/dashboard/altaProducto", (req, res) => {
    res.render("altaProducto", {
        title: "Alta Producto - Pluma & Papel"
    })
})

// Endpoint que muestra vista de la pantalla para modificar un producto ya existente
router.get("/admin/dashboard/modificarProducto", (req, res) => {
    res.render("modificarProducto", {
        title: "Modificar Producto - Pluma & Papel"
    })
})