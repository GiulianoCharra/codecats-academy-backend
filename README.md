# Proyecto Final del Curso de Node.js - CodeCats Academy
## Autor

    ### Giuliano Benicio Charra Marquez.

Este repositorio alberga el proyecto final desarrollado como parte del curso de Node.js de Telecom Digitalers. El proyecto, llamado CodeCats Academy, es una plataforma de educación en línea que ofrece una amplia variedad de cursos digitales relacionados con la programación.

## Detalles de la Aplicación

CodeCats Academy es una plataforma de educación en línea que permite a cualquier persona interesada acceder y realizar cursos virtuales relacionados con la programación. La aplicación ofrece las siguientes características (En Proceso):

    - Registro de usuarios
    - Inicio de sesión
    - Búsqueda y navegación de cursos
    - Visualización de lecciones y módulos de cursos
    - Realización de exámenes y evaluaciones
    - Emisión de certificados
    - Perfil de usuario y seguimiento de progreso
    - Comunidad y foro de estudiantes

## Herramientas Utilizadas

El proyecto se desarrolló utilizando las siguientes herramientas y tecnologías:

    - Node.js: Plataforma de desarrollo del servidor.
    - Express: Marco de aplicación web para Node.js.
    - MongoDB: Base de datos NoSQL para almacenar datos.
    - Javascript: Lenguaje de programación principal.
    - HTML: Lenguaje de marcado para la estructura de la página web.
    - CSS: Lenguaje de estilos para el diseño visual.
    - Figma: Herramienta de diseño para crear y visualizar el diseño de la aplicación.

## Propósito de la Aplicación

El propósito de CodeCats Academy es proporcionar una plataforma de aprendizaje en línea accesible y divertida para cualquier persona interesada en mejorar sus habilidades de programación. Queremos ofrecer cursos de alta calidad que se adapten a diferentes niveles de experiencia y brindar una comunidad de apoyo para los estudiantes.

## Accionen en el fronend(No se pudieron implementar todas, por ahora)
    - Registrarse
    - Loguearse
    - Consultar todos los cursos
    - ver informacion de un curso
    - (ADMIN) ver un listado de todos los usuarios

## Endpoints API (Backend)

A continuación, se detallan algunos de los endpoints disponibles en el backend:

    - `POST /api/register`: Registra un nuevo usuario en la plataforma. Este endpoint valida la dirección de correo electrónico y el formato de la contraseña.

    - `POST /api/login`: Permite a los usuarios registrados iniciar sesión en la plataforma. Proporciona un token JWT para la autenticación.

    - `GET /api/`: Obtiene una lista de todos los cursos disponibles en la plataforma. Este endpoint se puede utilizar para mostrar todos los cursos en el frontend.

    - `GET /api/:idCourse`: Obtiene un curso específico por su ID. Proporciona detalles sobre el curso seleccionado, como el título, la descripción y el contenido del curso.

### Rutas de administrador

    - `GET /api/all`: Solo accesible por administradores, este endpoint devuelve una lista de todos los usuarios registrados en la plataforma. Útil para la administración de usuarios.

### Rutas públicas

    - `GET /api/:username/courses`: Proporciona una lista de cursos relacionados con un usuario específico. Los cursos disponibles dependerán del usuario y su perfil público.

    - `GET /api/:username`: Muestra el perfil público de un usuario, que incluye información básica sobre el usuario, como nombre y descripción.

### Rutas privadas

    - `POST /api/:username/purchase/:courseId`: Permite a los usuarios registrados comprar un curso específico. Requiere autenticación.

    - `GET /api/:username/profile`: Muestra el perfil detallado de un usuario registrado. Proporciona información adicional, como la lista de cursos comprados y otros detalles del usuario.

    - `PUT /api/:username/profile/edit`: Permite a los usuarios registrados editar su perfil, como cambiar su nombre, descripción, foto de perfil, etc.

    - `POST /api/:username/profile/courses`: Permite a los usuarios registrados crear un nuevo curso en la plataforma.

    - `GET /api/:username/profile/courses`: Obtiene una lista de cursos creados por el usuario, lo que permite a los usuarios acceder y administrar sus cursos.

    - `GET /api/:username/profile/courses/:courseId`: Obtiene información detallada sobre un curso específico creado por el usuario.

    - `PUT /api/:username/profile/courses/:courseId`: Permite a los usuarios registrados actualizar la información de un curso creado por ellos.

    - `DELETE /api/:username/profile/courses/:courseId`: Permite a los usuarios registrados eliminar un curso que han creado.


## ¡Contribuciones son bienvenidas!

## Este proyecto utiliza variables de entorno, se deberan configurar las siguientes variables:
    ## Configurations for the server
    PORT=
    NODE_VERSION=

    ## Configurations for the database
    DB_URL=
    DB_USER=
    DB_NAME=
    COLLECION_USERS=

    ## Configurations for API keys
    VERIFIER_API_KEY=

    ## Configurations for security
    MIN_PASSWORD_LENGTH = 
    MIN_PASSWORD_LENGTH = 

    ## Configurations for JWT
    JWT_ROTATION_TIME = 
    JWT_SECRET_SIZE = 
    JWT_SECRET = 
    JWT_EXPIRES_IN= 

    ## Cookies name
    COOKIE_AUTH_TOKEN = 

    ## Roles
    ROLE_ADMIN = 
    ROLE_USER = 
