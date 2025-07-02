import {Router} from "express";
import { validateId } from "../middlewares/middlewares";



const router = Router();


// Endpoint para obtener todos los productos de la base de datos

router.get("/getAllProducts");

//Endpoint para obtener todos los productos activos para el cliente
router.get("/getAllActiveProducts");

// Endpoint para obtener un producto por ID de la base de datos

router.get("/getProductById/:id", validateId);

//Endpoint para agregar un nuevo producto a la base de datos

router.post("/postProduct");

// Endpoint para realizar una baja logica de un producto de la base de datos

router.delete("/deleteProduct/:id", validateId);

// Endpoint para actualizar/modificar producto de la base de datos (nombre, categoria, precio, imagen)

router.put("/modifyProduct/:id", validateId);

//Endpoint para activar producto de la base de datos

router.put("/activateProduct/:id", validateId)





export default router;
