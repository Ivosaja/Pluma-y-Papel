//////////////////////////////////////////////////////////////////////////////////////////////////////
// Importaciones necesarias para crear servidor express.js y realizar consultas a una base de datos //
import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import { productRoutes, salesRoutes } from "./src/api/routes/indexRoutes.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

const app = express(); // Creacion de app en express.js
const PORT = environments.port; // Se usa el port establecido a la izquierda de la condicion, si se encuentra ocupado, usa el de la derecha

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


app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
})
