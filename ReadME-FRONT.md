## Proyecto de FrontEnd de libros
###  Descripción
Este proyecto es el frontend de una aplicación web construida con Angular. La aplicación permite gestionar libros, realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) y proporciona autenticación mediante JWT. La interfaz de usuario está diseñada utilizando Angular Material para proporcionar una experiencia de usuario moderna y receptiva.

### Dependencias
El proyecto utiliza las siguientes dependencias y devDependencies:

- body-parser: Middleware para analizar el cuerpo de las solicitudes HTTP.
- express: Framework para aplicaciones web en Node.js.
- express-validator: Middleware para la validación de datos.
- nodemon: Herramienta para reiniciar automáticamente el servidor Node.js.
- rxjs: Biblioteca para programación reactiva.
- sweetalert2: Librería para mostrar alertas atractivas.
- tslib: Biblioteca auxiliar para TypeScript.
- zone.js: Biblioteca para el manejo de zonas en JavaScript.

### Requisitos
- Angular CLI: minimo en la version 17.3.7

### Instalación
- Ejecutar `npm install` para instalar las dependencias.
- Ejecutar `ng serve` para iniciar el servidor y navegar a `http://localhost:4200/`

#### Autenticacion del proyecto
Para acceder a la gestion de los libros a traves del fontend de angular, se debe utilizar el email y contraseña por defecto si no modificó el archivo **BD.sql**:

- Email: sebastian@gmail.com
- Contraseña: 12345

### Características
#### Autenticación
El proyecto incluye un servicio de autenticación que utiliza JWT para la autenticación de usuarios. Los usuarios pueden iniciar sesión y la sesión se mantiene mediante el almacenamiento del token en el localStorage.

#### Gestión de Libros
El proyecto permite a los usuarios realizar operaciones CRUD en libros. Los libros se muestran en una lista y pueden ser filtrados por nombre. Los usuarios autenticados pueden agregar, editar y eliminar libros.

#### Formularios Reactivos
El proyecto utiliza formularios reactivos de Angular para manejar los formularios de autenticación y gestión de libros. Los formularios incluyen validación de datos.

####  Angular Material
La interfaz de usuario está diseñada utilizando Angular Material para proporcionar una experiencia de usuario moderna y receptiva. Se utilizan componentes como botones, formularios, tarjetas, tablas, etc.

####  SweetAlert2
Para mejorar la experiencia del usuario, el proyecto utiliza SweetAlert2 para mostrar alertas atractivas y fáciles de entender para las acciones del usuario, como la confirmación de eliminación de un libro o la notificación de errores.

## Autor
xxxx-xxxx