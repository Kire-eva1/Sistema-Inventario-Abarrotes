Aviso-Alerta

Sistema de Gestión de Inventario para Abarrotes.

Es un sistema web de gestión de inventario diseñado para pequeños negocios del rubro de abarrotes, 
permitiendo administrar productos, controlar existencias, registrar movimientos de inventario y 
generar alertas cuando los niveles de stock requieren atención.
El sistema busca transformar los datos almacenados en información útil para apoyar la toma de decisiones 
del administrador del negocio, reduciendo errores manuales y facilitando el control operativo.


Objetivo del Proyecto.

Desarrollar una solución informática que permita:
Gestionar productos del inventario.
Controlar entradas y salidas de mercadería.
Mantener información organizada de categorías y proveedores.
Detectar productos con bajo stock.
Registrar historial de movimientos.
Administrar usuarios con distintos niveles de acceso.
Generar información útil para la gestión del negocio.


Funcionalidades Principales.

Autenticación y Seguridad.
Inicio de sesión mediante usuario y contraseña.
Autenticación utilizando JWT.
Encriptación de contraseñas mediante bcrypt.
Control de acceso basado en roles.


Gestión de Inventario.

Registro de productos.
Actualización de información.
Eliminación de productos.
Control de cantidades disponibles.
Gestión de categorías.
Gestión de proveedores.


Control de Movimientos.

Registro de entradas de productos.
Registro de salidas de productos.
Historial de movimientos.
Seguimiento de modificaciones realizadas.


Sistema de Alertas.

Detección automática de stock bajo.
Visualización de productos críticos.
Apoyo para la reposición de mercadería.


Arquitectura del Sistema

El proyecto utiliza una arquitectura separada por capas:

Aviso-Alerta

│
├── backend

│   │
│   ├── config


│   │   └── Configuración del sistema y base de datos

│   │
│   ├── controllers

│   │   └── Lógica de negocio

│   │
│   ├── models

│   │   └── Acceso y representación de datos

│   │
│   ├── routes

│   │   └── Endpoints API REST

│   │
│   ├── middleware

│   │   └── Seguridad y validaciones

│   │
│   └── server.js

│
├── frontend

│   │
│   ├── css

│   ├── js

│   ├── img

│   └── index.html

│
├── database

│   └── inventario.sql

│
├── docs

│
├── .env.example

├── .gitignore

├── package.json

└── README.md




Tecnologías Utilizadas.


Backend

Tecnología	  Descripción

Node.js      	Entorno de ejecución JavaScript
Express.js  	Framework para creación de API REST
MySQL	        Sistema gestor de base de datos
JWT	          Autenticación segura mediante tokens
bcrypt	      Protección de contraseñas
dotenv	      Gestión de variables de entorno
CORS	        Comunicación entre frontend y backend



Frontend

Tecnología  	Descripción

HTML5	        Estructura del sistema
CSS3	        Diseño visual
JavaScript	  Lógica del cliente
Bootstrap    	Framework de interfaz adaptable



Herramientas de Desarrollo:

Visual Studio Code
Git
GitHub
MySQL Workbench
Postman
Node Package Manager (npm)




Requisitos del Sistema.

Antes de ejecutar el proyecto se requiere:

Node.js versión 18 o superior.
MySQL versión 8 o superior.
Git instalado.
Navegador web actualizado.



Instalación del Proyecto.

1. Clonar repositorio
git clone https://github.com/Kire-eva1/Aviso-Alerta.git

Ingresar a la carpeta: cd Aviso-Alerta

2. Instalación de dependencias

Ejecutar: npm install

3. Configuración de Base de Datos.

Crear la base de datos MySQL: CREATE DATABASE abarrotes_db;

Ejecutar el script: database/inventario.sql

Este script creará:
Tablas.
Relaciones.
Índices.
Datos iniciales.


4. Configuración de Variables de Entorno.

Crear un archivo:  .env

Basado en:   .env.example

Ejemplo:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=abarrotes_db

JWT_SECRET=clave_segura




Ejecución del Sistema.

Iniciar aplicación:  npm start

Servidor disponible:  http://localhost:3000
                      http://localhost:${PORT}




Usuarios de Prueba.
Administrador  (Acceso completo al Sistema)
Usuario:     admin
Contraseña:  Admin123#

Bodeguero      (Entrada y Salida del Inventario)
Usuario:     bodeguero
Contraseña:  Bodega123#

Supervisor      (Consultas de Reportes y Alertas)
Usuario:      supervisor
Contraseña:   Super123#


API REST
Autenticación.
Inicio de sesión.

POST /api/auth/login



Productos.
Obtener productos:
GET /api/productos

Crear producto:
POST /api/productos

Actualizar producto:
PUT /api/productos/:id

Eliminar producto:
DELETE /api/productos/:id


Categorías.
GET /api/categorias


Alertas.
GET /api/alertas


...


Autor
Desarrollado por: Erik Arias
Proyecto: Sistema de Gestión de Inventario - Aviso-Alerta-v2
Año: 2026
