# MiniBlog API

API REST para gestionar autores y publicaciones del servicio MiniBlog de DevSpark. Permite operaciones CRUD sobre dos entidades (`authors` y `posts`), con validaciones, manejo centralizado de errores, tests y documentación OpenAPI.

## Links

- Swagger documentation: https://app.swaggerhub.com/apis-docs/castellix/MINIBLOG_DB/1.0.0?view=uiDocs
- Railway Deploy: https://proyectom2-cirocastellaro-production.up.railway.app
- Uso de IA: (Al final del README esta el link a google docs)

## Descripción del proyecto

MiniBlog es el backend inicial de un servicio de contenidos. Expone una API REST construida con Node.js y Express, conectada a una base de datos PostgreSQL mediante consultas SQL directas (sin ORM), usando la librería `pg`.

La relación entre las entidades es **uno a muchos**: un autor puede tener muchos posts, y cada post pertenece a un único autor. Al eliminar un autor, sus posts se eliminan en cascada (`ON DELETE CASCADE`).

### Stack

- **Node.js** + **Express** — servidor y ruteo
- **PostgreSQL** — base de datos
- **pg** — cliente de PostgreSQL (consultas parametrizadas)
- **dotenv** — variables de entorno
- **Vitest** + **Supertest** — testing

### Arquitectura

El proyecto sigue una arquitectura en capas para separar responsabilidades:

```
Request → Routes → Middlewares → Controllers → Services → PostgreSQL
```

- **routes** — definen las URLs y a qué controller llaman
- **middlewares** — validan los datos antes de llegar al controller
- **controllers** — manejan la request/response HTTP
- **services** — ejecutan las consultas SQL
- **config/db.js** — pool de conexiones a PostgreSQL
- **utils/AppError.js** + **middlewares/errorHandler.js** — manejo centralizado de errores

### Estructura de carpetas

```
ProyectoM2-Ciro_Castellaro/
├── docs/
│   └── openapi.yaml
├── sql/
│   ├── setup.sql
│   └── seed.sql
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   └── posts.controller.js
│   ├── middlewares/
│   │   ├── validateAuthors.js
│   │   ├── validatePosts.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authors.routes.js
│   │   └── posts.routes.js
│   ├── services/
│   │   ├── authors.service.js
│   │   └── posts.service.js
│   └── utils/
│       └── AppError.js
├── tests/
│   ├── authors.test.js
│   └── posts.test.js
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Endpoints

### Authors

| Método | Ruta           | Descripción              |
| ------ | -------------- | ------------------------ |
| GET    | `/authors`     | Listar todos los autores |
| GET    | `/authors/:id` | Obtener un autor por ID  |
| POST   | `/authors`     | Crear un autor           |
| PUT    | `/authors/:id` | Actualizar un autor      |
| DELETE | `/authors/:id` | Eliminar un autor        |

### Posts

| Método | Ruta                      | Descripción                                  |
| ------ | ------------------------- | -------------------------------------------- |
| GET    | `/posts`                  | Listar todos los posts                       |
| GET    | `/posts/:id`              | Obtener un post por ID                       |
| GET    | `/posts/author/:authorId` | Listar los posts de un autor (con sus datos) |
| POST   | `/posts`                  | Crear un post                                |
| PUT    | `/posts/:id`              | Actualizar un post                           |
| DELETE | `/posts/:id`              | Eliminar un post                             |

### Códigos de respuesta

- `200` — OK (GET, PUT exitosos)
- `201` — Created (POST exitoso)
- `204` — No Content (DELETE exitoso)
- `400` — Bad Request (validación fallida o email duplicado)
- `404` — Not Found (recurso inexistente)
- `500` — Internal Server Error (error no controlado)

## Requisitos

- Node.js 18 o superior
- PostgreSQL 14 o superior
- npm

## Ejecutar localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/ciro-castellaro/ProyectoM2-Ciro_Castellaro.git
cd ProyectoM2-Ciro_Castellaro
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Creá un archivo `.env` en la raíz del proyecto a partir del ejemplo:

```bash
cp .env.example .env
```

Completá el `.env` con tus datos de PostgreSQL local:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
DB_USER=postgres
DB_PASSWORD=tu_password
```

> El archivo `.env` está en `.gitignore` y no se sube al repositorio. Solo se versiona `.env.example`.

### 4. Crear la base de datos

Creá una base de datos en PostgreSQL llamada `miniblog_db` (o el nombre que hayas puesto en `DB_NAME`).

### 5. Ejecutar los scripts SQL

Primero el `setup.sql` (crea las tablas) y después el `seed.sql` (inserta datos de prueba):

```bash
psql -U postgres -d miniblog_db -f sql/setup.sql
psql -U postgres -d miniblog_db -f sql/seed.sql
```

También podés ejecutarlos manualmente desde pgAdmin abriendo el Query Tool sobre la base `miniblog_db` y pegando el contenido de cada archivo.

### 6. Levantar el servidor

```bash
npm run dev
```

El servidor queda corriendo en `http://localhost:3000`.

## Ejecutar los tests

Los tests usan Vitest y Supertest. Verifican los casos críticos de lectura y validación (status 200, 404 y 400) sin modificar la base de datos.

```bash
npm test
```

## Documentación OpenAPI

La especificación de la API está en `docs/openapi.yaml`.

Para visualizarla de forma interactiva:

1. Entrá a [editor.swagger.io](https://editor.swagger.io)
2. En el menú **File → Import file**, subí el archivo `docs/openapi.yaml` (o pegá su contenido directamente)
3. Del lado derecho vas a ver la documentación renderizada, con cada endpoint, sus parámetros, ejemplos de body y respuestas

## Deployment en Railway

La aplicación está desplegada en Railway, conectada a una base de datos PostgreSQL provista por la misma plataforma.

### Variables de entorno en Railway

A diferencia del entorno local (que usa variables separadas), Railway provee una única variable de conexión: `DATABASE_URL`. El archivo `src/config/db.js` detecta automáticamente cuál usar:

- Si existe `DATABASE_URL` (Railway), se conecta con esa cadena y SSL.
- Si no existe (local), usa las variables separadas (`DB_HOST`, `DB_PORT`, etc.).

### Pasos del deploy

1. **Crear el proyecto** en [Railway](https://railway.com) eligiendo _Deploy from GitHub repo_ y seleccionando este repositorio.
2. **Agregar PostgreSQL** desde _+ New → Database → PostgreSQL_. Railway lo provisiona y crea la variable `DATABASE_URL`.
3. **Linkear la base a la app**: en el servicio de la app → pestaña _Variables_ → _Add Reference Variable_ → seleccionar `DATABASE_URL` del servicio de PostgreSQL.
4. **Crear las tablas y datos**: conectarse a la base de Railway (vía la Console del servicio Postgres o con la connection string pública) y ejecutar el contenido de `sql/setup.sql` y luego `sql/seed.sql`.
5. **Generar la URL pública**: en el servicio de la app → _Settings → Networking → Generate Domain_.

### URLs

- **Internal URL** (comunicación entre servicios dentro de Railway): `postgres.railway.internal` — usada automáticamente vía la reference variable `DATABASE_URL`.
- **Public URL** (acceso externo a la API): `https://<TU-APP>.up.railway.app`

> Reemplazá `<TU-APP>` por el dominio real generado en Railway.

### Buenas prácticas aplicadas

- Las credenciales nunca se versionan (`.env` ignorado en Git).
- Las consultas SQL están parametrizadas (`$1`, `$2`, ...) para prevenir SQL injection.
- El puerto se lee de `process.env.PORT`, lo que permite que Railway asigne el suyo.
- Conexión SSL habilitada en producción.

## Registro del uso de AI en el proyecto

Durante el desarrollo de este proyecto se utilizó un asistente de IA (Claude) como apoyo para el aprendizaje y la construcción del backend. El uso se centró en:

- Explicación de conceptos: arquitectura en capas, qué es un pool de conexiones, diferencia entre `TIMESTAMP` y `TIMESTAMPTZ`, qué es un middleware, manejo centralizado de errores, y el funcionamiento de OpenAPI.
- Guía paso a paso para escribir el código: el asistente explicó cada concepto y propuso la estructura, pero la escritura de los services, controllers, routes y validaciones fue realizada por el autor, con revisión y correcciones iterativas.
- Resolución de errores: depuración de problemas durante el deploy en Railway (módulo no encontrado por diferencias de mayúsculas entre Windows y Linux, conexión SSL, carga de variables de entorno, ejecución de scripts SQL en la base remota).

El diseño de las entidades, las decisiones técnicas (tipos de datos, validaciones, comportamiento ante eliminaciones) y las pruebas de los endpoints fueron realizadas por el autor del proyecto.

## DOCUMENTO - USO DE IA

- https://docs.google.com/document/d/1lyMMQHptvIHrQNr2YGVenULNUy7aIx1xRJWRmVvnAQE/edit?usp=sharing

## Autor

Ciro Castellaro
