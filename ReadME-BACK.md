# Base de datos del proyecto
Abrir el archivo **BD.sql** y ejecutar los comandos en pgAdmin para la creacion de las tablas y la insercion de daos en ellas.


# Proyecto de Backend API de Libros

####  Descripción
Este proyecto es una API RESTful construida con Node.js y Express para gestionar Libros. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los libros y proporciona autenticación mediante JWT.

#### Dependencias
El proyecto utiliza las siguientes dependencias:

- express: Framework para aplicaciones web en Node.js.
- body-parser: Middleware para analizar el cuerpo de las solicitudes HTTP.
- cors: Middleware para permitir solicitudes de origen cruzado.
- dotenv: Cargar variables de entorno desde un archivo .env.
- express-validator: Middleware para la validación de datos.
- jsonwebtoken: Librería para trabajar con JSON Web Tokens (JWT).
- pg-promise: Librería para interactuar con PostgreSQL.



## Configuración

### Variables de entorno
Crear el archivo .env en la raíz del proyecto configurar la contraseña de la base de tatos:

- DATABASE_URL=postgres://username:password@localhost:5432/database

#### Requisitos
- Node.js
- Nodemon
- Npm

#### Instalación
- Ejecutar **npm install** para instalar las dependencias.
- Configurar las variables de entorno en el archivo **.env**.
- Ejecutar **npm run dev** para iniciar el servidor en modo de desarrollo.



## Rutas
### Rutas de Autenticación

- Iniciar sesión:`POST /auth/login`

### Rutas de libros

- Obtener todos los libros: ` GET /books` 
- Buscar libros por título: `GET /books/search?title=` 
- Obtener un libro por ID: `GET /books/`
- Crear un nuevo libro. (Requiere validación):`POST /books`
- Actualizar un libro por ID. (Requiere validación):`PUT /books/`
- Eliminar un libro por ID:`DELETE /books/`

### Rutas por Defecto
- Cualquier otra ruta que no exista retornará un mensaje de error 404:`/*`

## Autor
xxxx - xxxxx