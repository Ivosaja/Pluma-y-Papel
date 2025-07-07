//////////////////////////////////////////////////////////////////////////////////////////////////////
// Importaciones necesarias para crear servidor express.js y realizar consultas a una base de datos //
import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import { productRoutes, salesRoutes } from "./src/api/routes/indexRoutes.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { __dirname, join } from "./src/api/utils/utils.js";
import { selectAllProducts } from "./src/api/models/productModel.js";

const app = express(); // Creacion de app en express.js
const PORT = environments.port; // Se usa el port establecido a la izquierda de la condicion, si se encuentra ocupado, usa el de la derecha

// Seteamos para que el motor de plantillas que utilizara express sera EJS
app.set("view engine" , "ejs")

// Definimos la ruta donde se encontraran las plantillas ejs brindadas por el backend
app.set("views", join(__dirname, "src/views"))

// Definimos la ruta que express usara para proveer los archivos staticos de forma publica
app.use(express.static(join(__dirname, "src/public")))

/////////////////
// Middlewares //
app.use(cors()); // => Es un middleware que nos permite realizar todas las solicitudes
app.use(express.json()) // => Es un middleware que le especifica (al servirdor) que va a venir JSON en los request.body
app.use(loggerUrl)

/////////////////////////////
// Endpoints para el admin //

app.use("/api/products", productRoutes)


///////////////////////////////
// Endpoints para el cliente //

app.use("/api/sales", salesRoutes)

//////////////////////////
// Endpoints para Views //

app.get("/admin/dashboard", async(req,res)=>{
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

app.get("/admin/dashboard/altaProducto", (req, res) => {
    res.render("altaProducto", {
        title: "Alta Producto - Pluma & Papel"
    })
})

app.get("/admin/dashboard/modificarProducto", (req, res) => {
    res.render("modificarProducto", {
        title: "Modificar Producto - Pluma & Papel"
    })
})


app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
})
