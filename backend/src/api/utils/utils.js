import { fileURLToPath } from "url";    //convierte la URL de un archivo a ruta local del sistema de archivos de un SO

import { dirname, join } from "path"; //dirname: para extraer el directorio padre de un archivo
                                    //Join: une rutas para crear nuevas

const __filename = fileURLToPath(import.meta.url); //contiene la url de un archivo

const __dirname = join(dirname(__filename), "../../../"); // te posiciona en /backend

// Exportamos la variable __dirnama y el metodo join //

export{
    __dirname,
    join
}