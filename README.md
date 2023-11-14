# Proyecto Final del Curso de Node.js - CodeCats Academy

## Autor

    Giuliano Benicio Charra Marquez.

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

- **Node.js:** Plataforma de desarrollo del servidor.
- **Express:** Marco de aplicación web para Node.js.
- **MongoDB:** Base de datos NoSQL para almacenar datos.
- **Javascript:** Lenguaje de programación principal.
- **HTML:** Lenguaje de marcado para la estructura de la página web.
- **CSS:** Lenguaje de estilos para el diseño visual.
- **Figma:** Herramienta de diseño para crear y visualizar el diseño de la aplicación.

**Otros Detalles:**

- **Tipo de Aplicación:** SPA (Single Page Application)
- **Desplegado en:** [Render](https://render.com/)
- **Diseño de Interfaz:** [Figma Design](https://www.figma.com/file/zRP0YVd9PcDjgJvhrRR0Ca/CodeCats-Academy?type=design&node-id=0%3A1&mode=design&t=jdeM5LQ6CMRlthzb-1)
- **Postamas para pruebas:** [Probar el Backend en Postman](https://elements.getpostman.com/redirect?entityId=29892749-114f1725-2ac0-4c85-be0a-6bd291c566e2&entityType=collection)

## Propósito de la Aplicación

El propósito de CodeCats Academy es proporcionar una plataforma de aprendizaje en línea accesible y divertida para cualquier persona interesada en mejorar sus habilidades de programación. Queremos ofrecer cursos de alta calidad que se adapten a diferentes niveles de experiencia y brindar una comunidad de apoyo para los estudiantes.

## Acciones en el Frontend (No se pudieron implementar todas, por ahora)

- Registrarse
- Loguearse
- Consultar todos los cursos
- Ver información de un curso
- (ADMIN) Ver un listado de todos los usuarios

## Endpoints API (Backend)

### Rutas Públicas

    Estas son algunas de las rutas públicas disponibles en la API:

- `POST /api/auth/register`: Registra un nuevo usuario en la plataforma. Este endpoint valida la dirección de correo electrónico y el formato de la contraseña.

- `POST /api/auth/login`: Permite a los usuarios registrados iniciar sesión en la plataforma. Proporciona un token JWT para la autenticación.

- `GET /api/courses`: Obtiene una lista de todos los cursos disponibles en la plataforma. Este endpoint se puede utilizar para mostrar todos los cursos en el frontend.

- `GET /api/courses/:idCourse`: Obtiene un curso específico por su ID. Proporciona detalles sobre el curso seleccionado, como el título, la descripción y el contenido del curso.
-
- `GET /api/courses/user/:username`: Obtiene una lista de cursos creados por un usuario específico. Este endpoint se puede utilizar para mostrar todos los cursos creados por un usuario en el frontend.

### Rutas de Administrador

- `GET /api/users/all`: Solo accesible por administradores, este endpoint devuelve una lista de todos los usuarios registrados en la plataforma. Útil para la administración de usuarios.

### Rutas privadas

- `POST /api/users/:username/purchase/:courseId`: Permite a los usuarios registrados comprar un curso específico. Requiere autenticación.

- `GET /api/users/:username/profile`: Muestra el perfil detallado de un usuario registrado. Proporciona información adicional, como la lista de cursos comprados y otros detalles del usuario.

- `PUT /api/users/:username/profile/edit`: Permite a los usuarios registrados editar su perfil, como cambiar su nombre, descripción, foto de perfil, etc.

- `POST /api/users/:username/profile/courses`: Permite a los usuarios registrados crear un nuevo curso en la plataforma.

- `GET /api/users/:username/profile/courses`: Obtiene una lista de cursos creados por el usuario, lo que permite a los usuarios acceder y administrar sus cursos.

- `GET /api/users/:username/profile/courses/:courseId`: Obtiene información detallada sobre un curso específico creado por el usuario.

- `PUT /api/users/:username/profile/courses/:courseId`: Permite a los usuarios registrados actualizar la información de un curso creado por ellos.

- `DELETE /api/users/:username/profile/courses/:courseId`: Permite a los usuarios registrados eliminar un curso que han creado.

## Configuración del Entorno

Este proyecto utiliza variables de entorno. Configura las siguientes variables:

```env
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
```

### Contacto

Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto:

- LinkedIn: [Giuliano Charra Márquez](https://www.linkedin.com/in/giuliano-charra-marquez/)
- Correo Electrónico: giulianocharra@gmail.com

# ¡Gracias por ser parte de CodeCats Academy!

## ¡Agradecemos tus Contribuciones!
