/////////////////
// Sale models //


//////////////////////////////////////////////////////////////
// Funcion que realizar una insercion en la tabla de ventas //
const insertSale = async(conn, nombreUsuario, total) =>{

    const sqlQueryVenta = 'INSERT INTO ventas (nombre_usuario, fecha, total) VALUES (?,NOW(),?)'
    return await conn.query(sqlQueryVenta, [nombreUsuario,total])

}

//////////////////////////////////////////////////////////////////
// Funcion que realizar una insercion en la tabla detalle_venta //
const insertSaleDetail = async(conn, idVenta, id_producto, cantidad)=>{

    const sqlQueryDetalle = 'INSERT INTO detalle_venta (id_venta, id_producto, cantidad) VALUES (?,?,?)'
    return await conn.query(sqlQueryDetalle, [idVenta, id_producto, cantidad])

}

export{

    insertSale,
    insertSaleDetail
}