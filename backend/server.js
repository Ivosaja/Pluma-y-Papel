//////////////////////////////////////////////////////////////////////////////////////////////////////
// Importaciones necesarias para crear servidor express.js y realizar consultas a una base de datos //
import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import { productRoutes, salesRoutes, viewRoutes } from "./src/api/routes/indexRoutes.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { __dirname, join } from "./src/api/utils/utils.js";


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
// Endpoints de productos //

app.use("/api/products", productRoutes)

///////////////////////////////
// Endpoints de ventas //

app.use("/api/sales", salesRoutes)

//////////////////////////
// Endpoints de Views //

app.use("/admin", viewRoutes)

/////////////////////////////////////////////////////////////////////
// El servidor esta escuchando en el puerto establecido en el .env //
app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
})
