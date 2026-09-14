# TaskFlow

TaskFlow es una aplicación web para la gestión de proyectos y tareas, diseñada para facilitar la organización, seguimiento y administración del trabajo de un equipo.

La aplicación cuenta con diferentes niveles de acceso según el rol del usuario. Los administradores pueden gestionar y visualizar información general de los proyectos, tareas y usuarios, mientras que los usuarios pueden consultar los proyectos que tienen asignados y las tareas pendientes correspondientes.

## Características principales

### Administrador

El administrador cuenta con acceso a un panel general desde donde puede visualizar y gestionar la información de la aplicación.

Entre sus principales funcionalidades se encuentran:

- Visualización de un dashboard administrativo.
- Visualización de los proyectos registrados.
- Visualización de las tareas existentes.
- Visualización de los usuarios registrados.
- Consulta de información de los proyectos.
- Consulta de las tareas asociadas a los proyectos.
- Visualización de los usuarios responsables o asignados a los proyectos.
- Gestión de la información dependiendo de los permisos establecidos por el backend.

### Usuario

Los usuarios tienen acceso a la información relacionada con los proyectos en los que participan.

Sus principales funcionalidades son:

- Visualizar los proyectos que tienen asignados.
- Consultar la información de cada proyecto.
- Visualizar las tareas correspondientes a cada proyecto.
- Consultar las tareas que tienen pendientes.
- Dar seguimiento a las actividades asignadas.

## Tecnologías utilizadas

- React — Librería principal para la construcción de la interfaz.
- Vite — Herramienta de desarrollo y build.
- Tailwind CSS — Framework CSS utilizado para el diseño y estilos.
- React Hooks — Manejo de estado y efectos dentro de los componentes.
- JavaScript — Lenguaje utilizado para el desarrollo.
- Custom Hooks — Hooks personalizados para reutilizar lógica entre componentes.
- Fetch API — Comunicación con el backend mediante peticiones HTTP.

### Instalación

Clona el repositorio:

`git clone <URL_DEL_REPOSITORIO>`

Entra a la carpeta del proyecto:

`cd <NOMBRE_DEL_PROYECTO>`

Instala las dependencias:

`npm install`

### Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

`npm run dev`

Vite mostrará en la terminal la dirección donde está disponible la aplicación. Normalmente será:

`http://localhost:***`

### Estructura del proyecto

Components: Contiene los componentes reutilizables de la interfaz.

Hooks: Contiene los hooks personalizados utilizados para separar y reutilizar lógica.

Algunos ejemplos pueden ser:

- useLogin
- useProjects
- usePopup

Utils: Contiene la lógica relacionada con las peticiones al backend y comunicación con la API.

### React Hooks

Durante el desarrollo se utilizaron principalmente hooks de React como:

- useState: Se utiliza para manejar el estado de los componentes.
- useEffect: Se utiliza para ejecutar efectos secundarios, como obtener información desde el backend cuando se carga una vista.
- Custom Hooks: También se implementaron hooks personalizados para encapsular lógica reutilizable.

Esto permite mantener los componentes más limpios y separar la lógica de la interfaz.

### Diseño

La interfaz fue desarrollada utilizando Tailwind CSS, lo que permite crear los estilos directamente mediante clases utilitarias.

El diseño busca mantener una interfaz sencilla, clara y adaptable a diferentes tamaños de pantalla.

🔐 Autenticación

La aplicación cuenta con un sistema de autenticación conectado al backend.

El flujo principal es:

Usuario
↓
Formulario de Login
↓
Frontend
↓
API /signin
↓
Backend
↓
Validación de credenciales
↓
JWT
↓
Frontend
↓
Acceso a la aplicación

El token recibido después del inicio de sesión se utiliza para autenticar las peticiones posteriores al backend.

Además, el frontend recibe el rol del usuario para determinar qué interfaz debe mostrar.

Por ejemplo:

- admin → Dashboard de administración
- user → Dashboard de usuario

La autorización real de las operaciones debe ser validada siempre en el backend.

### Comunicación con el Backend Comunicación con el Backend

El frontend se comunica con una API REST mediante peticiones HTTP.

Por esta razón, el backend debe tener configurado CORS para permitir las peticiones provenientes del frontend.
