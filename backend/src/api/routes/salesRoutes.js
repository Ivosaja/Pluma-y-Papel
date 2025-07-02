import {Router} from "express"

const router = Router()

// Endpoint para que el usuario realice una compra y se registre en la base de datos

router.post("/finalizePurchase")

export default router;