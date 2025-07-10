import {Router} from "express"
import { finalizePurchase } from "../controllers/saleControllers.js";


// Inicializamos una instacion de Router() para manejar las rutas //

const router = Router()

// Endpoint para que el usuario realice una compra y se registre en la base de datos

router.post("/finalizePurchase", finalizePurchase)

export default router;