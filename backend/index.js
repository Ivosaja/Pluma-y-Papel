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
app.use(express.json()) // => Es un middleware que le especifica que va a venir JSON en los request.body


// Endpoint principal de prueba
app.get("/",(req,res) =>{
    res.send("Bienvenidos a nuestro aplicacion Pluma&Papel")
})

//Basicamente generamos el endpoint en donde se realiza un verbo de HTTP (POST,GET,PUT,DELETE,PATCH)

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
        const {nombre, categoria, precio, url_imagen} = req.body//cuerpo de la peticion en  donde se envia la info (es un JSON-->se detalla la informacion a postear(un nuevo producto))
        
        const sql = `INSERT INTO productos (nombre,categoria,precio,url_imagen) VALUES (?,?,?,?)`;

        let mensaje = await connection.query(sql, [nombre,categoria,precio,url_imagen]); //guardamos en una varaible la promesa//
                //el conexion ya es LA CONEXION
                //.query ejecuta una consulta
                //si o si el await para que se resulva la promesa primero 

        console.log(mensaje);

        res.status(201).send("Se estabecio la conexion exitosamente y se ejecuto la consulta sql");
                //siginifca que la peteicion del cliente fue exisdtosa y resulto en el creacion de un nuevo recurso en el servidor//

    }catch(error){
        res.status(500).json({
            message:error
        });
        console.log(error);
    }
})



// Escuchando en el puerto que guardamos en nuestra variable de entorno
app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
})
