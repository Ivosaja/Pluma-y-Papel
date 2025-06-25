import express from "express";
import environments from "./src/api/config/environments.js";
import connections from "./src/api/database/db.js";
import cors from "cors";

const app = express();

const PORT = environments.port || 3005 ; //verificamos que  el servidor puede correse y usar un puerto


app.use(cors()); //es un middleware que nos permite todas las solicitudes//


app.get("/",(req,res) =>{
    res.send("Hola mundo")
})

//Basicamente generamos el endpoin en donde se realiza un verbo de HTTP (POST,GET,PUT,DELETE,PATCH)
        //ENDPOINT//

app.get("/getAllProducts", async(req,res)=>{
    try{

        let sql = "SELECT * FROM productos";

        const [rows] =  await connections.query(sql); //desestructuracion de los datos, quedandonos solo con las filas//

                //coddigo de respuesta exitosa//
        res.status(200).json({

            payload:rows,
            message:rows.length===0 ? "No se encontraron productos":`Productos encontrados: ${rows.length}`})
    }catch(error){
        console.log("Error al obtener Productos: ", error );

        res.status(500).json({


            error:"Error desde el servidor"

        })
    }

})


app.listen(PORT,()=>{
    console.log(`Servidor Corriendo en el puerto  http://localhost:${PORT}`);
})
