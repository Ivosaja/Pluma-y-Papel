import connection from "../database/db.js";

export const getAllProducts = async(req,res)=>{
    try{
        let sqlQuery = "SELECT * FROM productos";
        const [rows] =  await connection.query(sqlQuery); //desestructuracion de los datos, quedandonos solo con las filas//

        // 200 -> codigo de respuesta exitosa//
        res.status(200).json({
            payload: rows,
            message: rows.length===0 ? "No se encontraron productos" : `Se encontraron: ${rows.length} productos`})

    }catch(err){
        console.error(err)
        res.status(500).json({
            message: "Error interno del servidor al obtener todos los productos de la base de datos"
        })
    }
}

export const getProductById = async(req, res) => {
    try{
        const {id} = req.params
        const sqlQuery = `SELECT * FROM productos WHERE id_producto = ?`
        const [rows] = await connection.query(sqlQuery, [id])
        
        if(rows.length === 0){
            return res.status(404).json({
                message: `Error. No se encontro el producto con ID: ${id}`
            })
        }
        res.status(200).json({
            message: `Se encontro exitosamente el producto con ID: ${id}`,
            payload: rows
        })
        
    } catch(err){
        console.error(err)
        res.status(500).json({
            message: "Error interno del servidor al buscar el producto en la base de datos"
        })
    }
}

export const postProduct = async (req, res) => {
    try{
        const {nombre, categoria, precio, url_imagen} = req.body/*cuerpo de la peticion en  donde se 
        envia la info (es un JSON-->se detalla la informacion a postear(un nuevo producto))*/
        
        if(!nombre || !categoria || !precio || !url_imagen){
            return res.status(400).json({
                message: "Error. Se deben completar todos los campos, ninguno debe quedar vacio o nulo"
            })
            
        }
        
        const sql = "INSERT INTO productos (nombre,categoria,precio,url_imagen) VALUES (?,?,?,?)"; //Placeholder--> campos vacios
        
        let [result] = await connection.query(sql, [nombre,categoria,precio,url_imagen]); //aca le pasamos los datos en ordern como irian en las columnas
        //el conexion ya es LA CONEXION
        //.query ejecuta una consulta
        //si o si el await para que se resulva la promesa primero 

        res.status(201).json({
            message: `Se inserto correctamente el producto con ID: ${result.insertId} denominado ${nombre} a la base de datos`,
            payload: result
        
            
        }) //siginifca que la peticion del cliente fue exisdtosa y resulto en el creacion de un nuevo recurso en el servidor//
        
    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"Error al intento de insertar el producto a la base de datos"
        });
    }
}
