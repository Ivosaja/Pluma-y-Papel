import {Router} from "express";
import { validateId } from "../middlewares/middlewares";
import { activateProduct, deleteProduct, getAllActiveProducts, getAllProducts, getProductById, modifyProduct, postProduct } from "../controllers/productControllers";



const router = Router();


// Endpoint para obtener todos los productos de la base de datos

router.get("/getAllProducts", getAllProducts);

//Endpoint para obtener todos los productos activos para el cliente
router.get("/getAllActiveProducts", getAllActiveProducts);

// Endpoint para obtener un producto por ID de la base de datos

router.get("/getProductById/:id", validateId, getProductById);

//Endpoint para agregar un nuevo producto a la base de datos

router.post("/postProduct", postProduct);

// Endpoint para realizar una baja logica de un producto de la base de datos

router.delete("/deleteProduct/:id", validateId, deleteProduct);

// Endpoint para actualizar/modificar producto de la base de datos (nombre, categoria, precio, imagen)

router.put("/modifyProduct/:id", validateId, modifyProduct);

//Endpoint para activar producto de la base de datos

router.put("/activateProduct/:id", validateId, activateProduct)





export default router;
