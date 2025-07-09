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