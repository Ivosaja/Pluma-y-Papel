//////////////////////
// Sale controllers //

import connection from "../database/db.js";
import { insertSale, insertSaleDetail } from "../models/saleModel.js";


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que guarda una venta en la tabla ventas y sus detalles en la tabla detalle_venta de la BD //
export const finalizePurchase = async (req, res) => {
    
    // Obtengo una conexion de la pool de conexiones para poder hacer una transaccion sobre una conexion y no sobre el pool
    const conn = await connection.getConnection()
    
    try{
        await conn.beginTransaction() /* Inicio una transaccion en la conexion obtenida en la cual se ejecutaran una serie de 
        operaciones agrupadas, y o se ejecutan todas, o no se ejecuta ninguna -> esto es muy bueno porque no tengo despues problema 
        de inconsistencia de datos en mis tablas si algo fallo en otro insert estrechamente relacionado con otra tabla, 
        manteniendo una buena integridad de datos.*/
        
        /*
        |
        |
        V
        
        a partir de aca abajo, todas las consultas que hago, no se guardan de forma permanente en la BD hasta que haga commit()
        */
        const {nombreUsuario,total, carrito} = req.body
        //const total = parseInt(req.body.total)

        if(!nombreUsuario || !total || isNaN(total) || !Array.isArray(carrito) || carrito.length === 0){
            return res.status(400).json({
                message: "Error. Debe ingresar los campos correctamente"
            })
        }
        
        const [resultVenta] = await insertSale(conn, nombreUsuario, total) //queres lo que nos devuelve en la posicion cero
        const idVenta = resultVenta.insertId //obtenemos el id de la venta 
        
        
        // Uso de for...of porque permite la utilizacion de await por cada elemento del array carrito a diferencia del forEach(), el cual no respeta el manejo de promesas
        for(const producto of carrito){
            
            let {id_producto, cantidad} = producto

            if(!id_producto || !cantidad || cantidad === 0){
                await conn.rollback() 
                return res.status(400).json({
                    message: "El producto debe tener el id y la cantidad validos obligatoriamente"
                })
            }
            
            await insertSaleDetail(conn, idVenta, id_producto, cantidad)
        }
        
        await conn.commit() // si todo salio bien, espera a que se guarden todos los cambios de forma permanente en la BD
        res.status(201).json({
            message: `Se inserto la venta con ID: ${idVenta} exitosamente junto con sus detalles en la tabla detalle_venta`,
            payload: resultVenta
        })
        
    } catch (err){
        await conn.rollback() // Si hay algo que no revierte todas las operaciones en caso de error 
        console.error(err)
        res.status(500).json({
            message: "Error interno del servidor al guardar venta en la base de datos"
        })
    } finally {
        conn.release(); // libero la conexion obtenida del pool para no saturar al mismo
    }
}