// Creacion de middlewares //

// Middleware de aplicacion: este te muestra por consola que tipo de peticiones se realizan junto con a que URL y en que momento //
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`)
    next()
}


// Middleware de ruta: este realiza una validacion del id pasado por parametro para verificar su correcto ingreso //
const validateId = (req,res,next) => {
    let {id} = req.params
    
    if(!id || isNaN(id) || parseInt(id) <= 0){
        return res.status(400).json({
            message: "Debe ingresar un ID valido (numero)"
        })
    }

    req.params.id = parseInt(id, 10)
    next()
}

// Exportamos las funciones para poder ser utilizadas //
export {
    loggerUrl,
    validateId
}