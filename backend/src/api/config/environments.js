/*El objetivo de este archivo "enviroments" es poder cargar (a traves de la dependencia "dotenv") y  acceder a las variables de entorno, 
las cuales no son accesibles, a traves del metodo process.env brindado por NODE JS*/

import { config } from 'dotenv';
config(); 



export default {

    port: process.env.PORT,//puerto
    database:{ //database
        host:process.env.DB_HOST, //host
        name:process.env.DB_NAME, //name de la  database
        user: process.env.DB_USER,//usuario
        password:process.env.DB_PASSWORD //contraseña
    }

}