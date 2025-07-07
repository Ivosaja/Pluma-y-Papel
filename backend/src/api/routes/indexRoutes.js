// Este seria un archivo de barril que permite exportar las rutas que manejan "Productos" y "Ventas" e importarlas en el server.js

import productRoutes from "./productRoutes.js";
import salesRoutes from "./saleRoutes.js";
import viewRoutes from "./viewRoutes.js"

export {
    productRoutes,
    salesRoutes,
    viewRoutes
}