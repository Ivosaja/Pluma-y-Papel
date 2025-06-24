// En este archivo, se realiza una conexion a la base de datos a traves de la utilizacion del paquete previamente instalado, mysql2
import mysql from "mysql2/promise"
import environments from "../config/environments.js"

// Accedo solo a las variables de entorno de la base de datos
const { database } = environments

// Creamos un pool de conexiones reutilizables que quedan todo el tiempo abiertas para una mayor eficiencia y permitir la concurrencia 
const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
})

export default connection;