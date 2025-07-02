import {Router} from "express";



const router = Router();


// Endpoint para obtener todos los productos de la base de datos

router.get("/getAllProducts");


// Endpoint para obtener un producto por ID de la base de datos

router.get("/getProductById/:id");

//Endpoint para agregar un nuevo producto a la base de datos

router.post("/postProduct");


// Endpoint para realizar una baja logica de un producto de la base de datos

router.delete("/deleteProduct/:id");

// Endpoint para actualizar/modificar producto de la base de datos (nombre, categoria, precio, imagen)

router.put("/modifyProduct/:id");

//Endpoint para activar producto de la base de datos
router.put("/activateProduct/:id")




export default router;
