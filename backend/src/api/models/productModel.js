////////////////////
// Product models //

import connection from "../database/db.js";

/////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una consulta para obtener todos los productos de la tabla productos //
const selectAllProducts = async() =>{
    let sqlQuery = "SELECT * FROM productos";

    return await connection.query(sqlQuery);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una consulta para obtener todos los productos activos de la tabla productos //
const selectAllActiveProducts = async () => {
    let sqlQuery = "SELECT * FROM productos WHERE activo = 1";
    return await connection.query(sqlQuery)
} 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una consulta para obtener el producto que coincida con el id pasado por parametro de la tabla productos //
const selectProductById =  async (id) =>{
    const sqlQuery = `SELECT * FROM productos WHERE id_producto = ?`

    return await connection.query(sqlQuery,[id]);
} 

//////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una insercion de un producto nueva en la tabla productos //
const insertProduct = async (nombre, categoria, precio, url_imagen) => {

    const sqlQuery = "INSERT INTO productos (nombre,categoria,precio,url_imagen) VALUES (?,?,?,?)"

    return await connection.query(sqlQuery, [nombre, categoria, precio, url_imagen])
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una modificacion sobre el producto para darlo de baja logicamente en tabla productos //
const deleteProduct = async (id) => {
    const sqlQuery = 'UPDATE productos SET activo = 0 WHERE id_producto = ?'
    return await connection.query(sqlQuery, [id])
}

//////////////////////////////////////////////////////////////////////////////////
// Funcion asincrona que realiza una modificacion sobre un producto en la tabla productos //
const updateProduct = async (nombre, categoria, precio, url_imagen, id) => {
    const sqlQuery = 'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, url_imagen = ? WHERE id_producto = ?'
    return await connection.query(sqlQuery, [nombre, categoria, precio, url_imagen, id])
}

/////////////////////////////////////////////////////////////////////////
// Funcion asincrona que activa un producto en la tabla productos (modificacion) //
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