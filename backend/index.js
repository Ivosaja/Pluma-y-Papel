//////////////////////////////////////////////////////////////////////////////////////////////////////
// Importaciones necesarias para crear servidor express.js y realizar consultas a una base de datos //
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express(); // Creacion de app en express.js
const PORT = environments.port; // Se usa el port establecido a la izquierda de la condicion, si se encuentra ocupado, usa el de la derecha

/////////////////
// Middlewares //
app.use(cors()); // => Es un middleware que nos permite realizar todas las solicitudes
app.use(express.json()) // => Es un middleware que le especifica (al servirdor) que va a venir JSON en los request.body


// Endpoint principal de prueba<
app.get("/",(req,res) =>{
    res.send("Bienvenidos a nuestro aplicacion Pluma&Papel")
})

//Basicamente generamos el endpoint en donde se realiza un verbo de HTTP (POST,GET,PUT,DELETE,PATCH)


/////////////////////////////
// Endpoints para el admin //

// Endpoint para obtener todos los productos de la base de datos
app.get("/getAllProducts", async(req,res)=>{
    try{
        let sqlQuery = "SELECT * FROM productos";
        const [rows] =  await connection.query(sqlQuery); //desestructuracion de los datos, quedandonos solo con las filas//

        // 200 -> codigo de respuesta exitosa//
        res.status(200).json({
            payload:rows,
            message:rows.length===0 ? "No se encontraron productos" : `Se encontraron: ${rows.length} productos`})

    }catch(error){
        console.log("Error al obtener Productos: ", error);
        res.status(500).json({
            error:"Error desde el servidor"
        })
    }
})


//Endpoint para obtener todos los productos activos para el cliente
app.get("/getAllActiveProducts", async(req,res)=>{
    try{
        let sqlQuery = "SELECT * FROM productos WHERE activo=1";
        const [rows] =  await connection.query(sqlQuery); //desestructuracion de los datos, quedandonos solo con las filas//

        // 200 -> codigo de respuesta exitosa//
        res.status(200).json({
            payload:rows,
            message:rows.length===0 ? "No se encontraron productos" : `Se encontraron: ${rows.length} productos`})

    }catch(error){
        console.log("Error al obtener Productos: ", error);
        res.status(500).json({
            error:"Error desde el servidor"
        })
    }
})



// Endpoint para obtener un producto por ID de la base de datos
app.get('/getProductById/:id', async(req, res) => {
    try{
        const {id} = req.params
        const sqlQuery = `SELECT * FROM productos WHERE id_producto = ?`
        const [rows] = await connection.query(sqlQuery, [id])

        if(rows.length === 0){
            return res.status(404).json({
                error: `Error. No se encontro el producto con ID: ${id}`
            })
        }
        res.status(200).json({
            payload: rows,
            message: `Se encontro exitosamente el producto con ID: ${id}`
        })

    } catch(err){
        console.log('Error interno del servidor. No se pudo encontrar el producto en la base de datos', err)
        res.status(500).json({
            error: "Error interno del servidor al buscar el producto"
        })
    }
})


//Endpoint para agregar un nuevo producto a la base de datos
app.post('/postProduct', async (req, res) => {
    try{
        const {nombre, categoria, precio, url_imagen} = req.body/*cuerpo de la peticion en  donde se 
        envia la info (es un JSON-->se detalla la informacion a postear(un nuevo producto))*/

        if(!nombre || !categoria || !precio || !url_imagen){
            return res.status(400).json({
                message:"Se deben completar todos los campos, ninguna debe quedar vacio o nulo"
            })

        }
        
        const sql = "INSERT INTO productos (nombre,categoria,precio,url_imagen) VALUES (?,?,?,?)"; //Placeholder--> campos vacios

        let mensaje = await connection.query(sql, [nombre,categoria,precio,url_imagen]); //aca le pasamos los datos en ordern como irian en las columnas
                //el conexion ya es LA CONEXION
                //.query ejecuta una consulta
                //si o si el await para que se resulva la promesa primero 

        res.status(201).json({
            message: `Se inserto correctamente el producto denominado ${nombre} a la base de datos`,
            payload: mensaje


        }) //siginifca que la peticion del cliente fue exisdtosa y resulto en el creacion de un nuevo recurso en el servidor//

    }catch(error){
        res.status(500).json({
            message:"Error al intento de insertar el producto a la base de datos",

            error:error
        });
    }
})

// Endpoint para borrar un producto de la base de datos
app.delete('/deleteProduct/:id', async (req, res) => {
    try{
        const {id} = req.params
        if(isNaN(id)){
            return res.status(400).json({
                message: "Debe ingresar un ID valido"
            }) 
        }

        const sqlQuery = 'DELETE FROM productos WHERE id_producto = ?'
        const [result] = await connection.query(sqlQuery, [id]) // Obtengo el elemento 0 de el result de la query
        
        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error. No se encontro el producto con ID: ${id} para borrarlo de la base de datos`
            })
        }

        res.status(200).json({
            message: `Se elimino correctamente el producto con ID: ${id} de la base de datos`,
            payload: result
        })


    } catch (err){
        res.status(500).json({
            message: "Error interno del servidor al borrar de la base de datos",
            error: err
        })
    }
})

// Endpoint para actualizar/modificar producto de la base de datos (nombre, precio, categoria, imagen, estado -> solo desactivarlo)
app.put('/modifyProduct/:id', async (req, res) => {

})




// Endpoint para activar producto de la base de datos
app.put('/activateProduct/:id', async (req, res) => {

})


///////////////////////////////
// Endpoints para el cliente //

// Endpoint para que el usuario realice una compra y se registre en la base de datos 
app.post('/finalizePurchase', async (req, res) => {
    const {nombreUsuario, total} = req.body
    
    console.log(nombreUsuario)
    console.log(total)
    if(!nombreUsuario || !total){
        return res.status(400).json({
            error: "Error. Debe mandar algo valido en todos los campos"
        })
    }

    const sqlQuery = 'INSERT INTO ventas (nombre_usuario, fecha, total) VALUES (?,NOW(),?)'
    const [result] = await connection.query(sqlQuery, [nombreUsuario,total])
    const idVenta = result.insertId

    res.status(200).json({
        message: `Se inserto la venta con ID: ${idVenta} exitosamente`,
        payload: result
    })

})


// Escuchando en el puerto que guardamos en nuestra variable de entorno
app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
})
