// Creacion de middlewares //

const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`)

    next()
}

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


export {
    loggerUrl,
    validateId
}