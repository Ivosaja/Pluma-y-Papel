# 🖋️ Pluma & Papel

## 📝 Programación III – Trabajo Integrador: Autoservicio de Librería

### 💡Introduccion
Este proyecto fue desarrollado por los alumnos **Ivo Lionel Saja** y **Lucas Agustín Schurkens** con el objetivo de obtener la aprobación directa en la materia **Programación III**.

La finalidad del proyecto es desarrollar una aplicación web de **autoservicio para una librería**, la cual comercializa tanto útiles escolares (mochilas, cartucheras, cuadernos, etc.) como libros (escolares y de diversas temáticas).

El objetivo principal de esta aplicación es **automatizar el proceso de venta**, reemplazando parcialmente la intervención del vendedor humano. De esta forma, se busca simplificar la experiencia de compra para el cliente, agilizando el proceso y modernizando el servicio.

El proyecto esta divido en **2 partes bien diferenciadas**: **Frontend** (Cliente) y **Backend** (Administrador y API).

### 📁 Estructura del Proyecto

```bash
TP_Final_Progra_III/
│
├── backend/
│    │
│    ├── node_modules/               
│    ├── .env                      
│    ├── .env.example               
│    ├── .gitignore                 
│    ├── package.json               
│    ├── package-lock.json          
│    ├── server.js                   
│    │
│    └──src/                       
│        ├── api/                  
│        │     ├── config/           
│        │     ├── controllers/        
│        │     ├── database/          
│        │     ├── middlewares/        
│        │     ├── models/             
│        │     ├── routes/            
│        │     └── utils/             
│        │
│        ├── public/                 
│        │     ├── css/                
│        │     ├── img/                
│        │     └── js/                 
│        │
│        └── views/                  
│             ├── partials/           
│             ├── altaProducto.ejs    
│             ├── dashboard.ejs           
│             └── modificarProducto.ejs 
│
└──frontend/
       │                    
       ├── assets/
       │     └── img/
       │          ├── favicon/            
       │          └── loginCliente/  
       │   
       └──cliente/
            ├── bienvenida/             
            ├── carrito/                
            └── productos/              
```      

### 🎨 Proyecto Frontend - Cliente
El frontend del proyecto representa la interfaz de usuario de **Pluma & Papel**, un autoservicio de libros y útiles escolares. Permite a los usuarios navegar por las diferentes categorias (libros y utiles), agregarlos al carrito, visualizar detalles y realizar sus compras. 

**🛠️ Funcionalidades principales** 
* 💬 Pantalla de bienvenida (ingreso de nombre del usuario)
* 🛍️ Visualización de productos por categorías
* ➕ Agregado / eliminación de productos del carrito
* 🛒 Vista del carrito editable (aumentar/disminuir cantidades y vaciar carrito)
* 🧾 Emisión de ticket de compra en PDF descargable
* 🌑 Modo claro / oscuro con persistencia
* 🧑‍💼 Acceso al panel del administrador
* 📱 Diseño adaptable a dispositivos móviles (responsive)
* 👤 Persistencia del nombre de usuario ingresado en la pantalla de bienvenida

**💻 Tecnologias utilizadas**
* HTML5
* CSS3
* JavaScript (vanilla)
* Librería jsPDF (generación de ticket a traves de PDF)


### 🌐 Proyecto Backend - Administrador y API

El backend de Pluma & Papel está construido con Node.js utilizando el framework Express.Este backend brinda 2 funcionalidades principales:

1. Una API REST JSON para manejar productos y ventas.
2. Un dashboard renderizado con EJS que permite a los administradores gestionar la librería.

**🛠️ Funcionalidades principales del Dashboard**

* ✏️ Alta, Baja, Modificacion y reactivacion de productos.
* 📋 Dashboard con productos y estado (activo = 1 / activo = 0)
* 🖼️ Carga de imagenes de producto


**🛠️ Funcionalidades principales de la API**
* CRUD completo de productos
* Carga de ventas a la BD
* Validacion por Middlewares

Ademas nuestro **Backend** se basa en el patrón **Modelo-Vista-Controlador (MVC)**, organizado en módulos separados para mayor claridad y mantenimiento:

* **config/** para cargar las variables de entorno con "dotenv"

* **controllers/** para manejar las request y las responses (logica de negocio)

* **database/** para configurar la conexion con la base de datos y para guardar el archiv .sql de la base de datos,

* **middlewares/** para lógica intermedia como validaciones que se ejecutan entre las requests y responses

* **models/** donde se definen los modelos y sus consultas con la base de datos

* **routes/** para definir los endpoints del servidor (products, sales, views)

* **utils/** con logica para trabajar con archivos y rutas de proyecto en Express.js (__filename / __dirname)

También incluye una carpeta **public/** desde donde se sirven los archivos estáticos (css, img, js) y un sistema de vistas en **views/**, renderizadas desde el servidor usando **EJS** para el panel de administración. A su vez una carpeta **partials/** para reutilizar partes que comparten las views. Esto permite tener páginas del administrador generadas directamente desde el backend.