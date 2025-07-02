import connection from "../database/db.js";

const selectAllProducts = async() =>{
    let sqlQuery = "SELECT * FROM productos";

    return await connection.query(sqlQuery);

}

const selectAllActiveProducts = async () => {
    let sqlQuery = "SELECT * FROM productos WHERE activo = 1";
    return await connection.query(sqlQuery)
} 



const selectProductById =  async (id) =>{
    const sqlQuery = `SELECT * FROM productos WHERE id_producto = ?`

    return await connection.query(sqlQuery,[id]);
} 


const insertProduct = async (nombre, categoria, precio, url_imagen) => {

    const sqlQuery = "INSERT INTO productos (nombre,categoria,precio,url_imagen) VALUES (?,?,?,?)"

    return await connection.query(sqlQuery, [nombre, categoria, precio, url_imagen])
}

const deleteProduct = async (id) => {
    const sqlQuery = 'UPDATE productos SET activo = 0 WHERE id_producto = ?'
    return await connection.query(sqlQuery, [id])
}

const updateProduct = async (nombre, categoria, precio, url_imagen, id) => {
    const sqlQuery = 'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, url_imagen = ? WHERE id_producto = ?'
    return await connection.query(sqlQuery, [nombre, categoria, precio, url_imagen, id])
}

const updateProductActivo = async (id) => {
    const sqlQuery = 'UPDATE productos SET activo = 1 WHERE id_producto = ?'
    return await connection.query(sqlQuery, [id])
}


export{
    selectAllProducts,
    selectAllActiveProducts,
    selectProductById,
    insertProduct,
    deleteProduct,
    updateProduct,
    updateProductActivo
}