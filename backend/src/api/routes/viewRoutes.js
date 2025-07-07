import { Router } from "express";
import { vistaCrearProducto, vistaModificarProducto, vistaProductos } from "../controllers/viewControllers.js";

const router = Router()

// Endpoint que muestra vista con todos los productos en el dashboard del admin
router.get("/dashboard", vistaProductos)

// Endpoint que muestra vista de la pantalla para crear un nuevo producto
router.get("/dashboard/altaProducto", vistaCrearProducto)

// Endpoint que muestra vista de la pantalla para modificar un producto ya existente
router.get("/dashboard/modificarProducto", vistaModificarProducto)

export default router