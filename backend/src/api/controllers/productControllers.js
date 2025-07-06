import { deleteProduct, insertProduct, selectAllActiveProducts, selectAllProducts, selectProductById, updateProduct, updateProductActivo } from "../models/productModel.js";
//TODO=> chequear codigo documentado

export const getAllProducts = async(req,res)=>{
    try{
        const [rows] =  await selectAllProducts(); 

        res.status(200).json({
            payload: rows,
            message: rows.length===0 ? "No se encontraron productos en la BD" : `Se encontraron: ${rows.length} productos en la BD`})

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
        
        const [rows] = await selectProductById(id)
        
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
        const {nombre, categoria, precio, url_imagen} = req.body
        
        if(!nombre || !categoria || !precio || !url_imagen){
            return res.status(400).json({
                message: "Error. Se deben completar todos los campos, ninguno debe quedar vacio o nulo"
            })
            
        }    
        let [result] = await insertProduct(nombre, categoria, precio,url_imagen) 

        res.status(201).json({
            message: `Se inserto correctamente el producto con ID: ${result.insertId} denominado ${nombre} a la base de datos`,
            payload: result
        
            
        }) 
    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"Error al intento de insertar el producto a la base de datos"
        });
    }
}



export const removeProduct = async (req, res) => {
    try{
        const {id} = req.params
        const [result] = await deleteProduct(id) 
        
        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error. No se encontro el producto con ID: ${id} para darlo de baja de la base de datos`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: "El producto se encontro, pero no se le dio baja logica ya que ya estaba dado de baja"
            })
        }
        
        res.status(200).json({
            message: `Se dio de baja correctamente el producto con ID: ${id} de la base de datos`,
            payload: result
        })
        
        
    } catch (err){
        console.error(err)
        res.status(500).json({
            message: "Error interno del servidor al dar de baja logica en la base de datos"
        })
    }
}


export const modifyProduct = async (req, res) => {
    try{
        const {id} = req.params
    
        const {nombre, categoria, precio, url_imagen} = req.body
        if(!nombre || !categoria || precio === null || precio === undefined || !url_imagen){
            return res.status(400).json({
                message: "Debe ingresar todos los campos correctamente y que sean validos"
            })
        }
    
        const [result] = await updateProduct(nombre, categoria, precio, url_imagen, id)

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error. No se encontro el producto con ID: ${id} para actualizarlo en la base de datos`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: "El producto se encontro, pero no se hicieron cambios (ya tenia los mismos datos)" 
            })
        }

        res.status(200).json({
            message: `Se modifico el producto con ID: ${id} correctamente`,
            payload: result
        })

    } catch (err){
        console.error(err)
        res.status(500).json({
            message: "Error interno del servidor al actualizar un producto"
        })
    }
}


export const activateProduct = async (req, res) => {
    try{
        let {id} = req.params 
        const [result] = await updateProductActivo(id) 
        
        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `Error. No se encontro el producto con ID: ${id} para activarlo en la base de datos`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: "El producto se encontro, pero ya se encontraba activado"
            })
        }
        
        res.status(200).json({
            message: `Se activo correctamente el producto con ID: ${id} de la base de datos`,
            payload: result
        })

    } catch (err){
        console.error(err)
        res.status(500).json({
            message: "Error interno del servidor al activar un producto en la base de datos"
        })
    }
}

///Exclusivo para el cliente//
export const getAllActiveProducts = async(req,res)=>{

    try{
        const [rows] =  await selectAllActiveProducts()

        res.status(200).json({
            message: rows.length===0 ? "No se encontraron productos" : `Se encontraron: ${rows.length} productos`,
            payload: rows
        })

    }catch(err){
        console.error(err)
        res.status(500).json({
            message: "Error interno desde el servidor al obtener todos los productos activos de la base de datos"
        })
    }
}