import connection from "../database/db.js";

const selectAllProducts = async() =>{
    let sqlQuery = "SELECT * FROM productos";

    return await connection.query(sqlQuery);



}

const selectProductById =  async(id) =>{
    const sqlQuery = `SELECT * FROM productos WHERE id_producto = ?`

    return await connection.query(sqlQuery,[id]);
} 


const insertProduct = async(nombre, categoria, precio, url_imagen) => {

    const sqlQuery = "INSERT INTO productos (nombre,categoria,precio,url_imagen) VALUES (?,?,?,?)"


    return await connection.query(sqlQuery, [nombre, categoria, precio, url_imagen])
}




export{

    selectAllProducts,
    selectProductById,
    insertProduct
}