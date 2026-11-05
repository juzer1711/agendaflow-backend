# AgendaFlow · Backend

API REST para gestionar citas de barbería con Oracle y PL/SQL. Forma parte del proyecto personal de aprendizaje [AgendaFlow](https://github.com/juzer1711/agendaflow), junto con el [panel web](https://github.com/juzer1711/agendaflow-frontend) y la [skill de Alexa](https://github.com/juzer1711/agenda-flow-alexa).

> Proyecto educativo sin terminar. Puede contener errores y requiere un esquema Oracle externo que no se incluye aquí. Las funciones descritas corresponden al código y no garantizan una integración probada en producción.

## Tecnologías y estructura

Node.js, TypeScript 5.7, Express 4, Oracle Database (el proyecto se planteó con Oracle 21c), driver oracledb 6 y PL/SQL. Utiliza JWT, bcrypt, Zod, dotenv y CORS; tsx para desarrollo y Vitest/Supertest para pruebas.

```text
Rutas → middleware → controladores → servicios → repositorios → SQL / packages PL/SQL
```

El identificador del barbero se obtiene del JWT para las operaciones protegidas. Se usan consultas parametrizadas, pool de conexiones y manejo de transacciones.

## API implementada

| Recurso | Rutas y operaciones |
| --- | --- |
| Salud | `GET /health`, `GET /health/oracle` |
| Autenticación | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Perfil | `GET`, `PUT /api/barber/profile` |
| Servicios | `GET`, `POST /api/services`; `PUT`, `DELETE /api/services/:id` |
| Clientes | `GET`, `POST /api/customers` |
| Horarios | `GET`, `POST /api/schedules`; `DELETE /api/schedules/:id` |
| Excepciones | `GET`, `POST /api/schedules/exceptions` |
| Disponibilidad | `GET /api/availability` |
| Citas | `GET`, `POST /api/appointments`; `GET /api/appointments/today`, `GET /api/appointments/next`; `PATCH /api/appointments/:id/cancel` |

Salud, registro y login son públicos. El resto requiere `Authorization: Bearer <JWT>`. El registro cifra la contraseña y llama a `PKG_REGISTRATION.REGISTER_BARBER`, devolviendo token y usuario.

Las respuestas normalmente usan `{ success: true, data: ... }` o `{ success: false, error: { code, message, details? } }`. Algunas mutaciones responden `204` sin cuerpo. Las listas paginadas admiten `page` y `limit`, con máximo de 100 cuando aplica.

## Requisitos y configuración

Se recomienda Node.js 22 LTS y npm, además de Oracle con el esquema esperado.

**No hay migraciones, DDL, packages ni datos iniciales incluidos.** El código referencia tablas como `CUSTOMERS`, `SERVICES`, `SCHEDULES`, `SCHEDULE_EXCEPTIONS` y `APPOINTMENTS`, y los packages `PKG_AUTH`, `PKG_REGISTRATION`, `PKG_BARBER`, `PKG_SERVICE`, `PKG_CUSTOMER`, `PKG_SCHEDULE`, `PKG_AVAILABILITY` y `PKG_APPOINTMENT`. Consulta sus firmas en los [repositorios Oracle](./src/repositories/oracle/).

```bash
npm install
```

Copia [.env.example](./.env.example) a `.env` y ajusta:

| Variable | Uso / valor predeterminado en el código |
| --- | --- |
| `ORACLE_USER`, `ORACLE_PASSWORD` | Credenciales del esquema preparado |
| `ORACLE_CONNECT_STRING` | Conexión; por ejemplo `localhost:1521/xe` |
| `JWT_SECRET` | Secreto propio para firmar tokens |
| `JWT_EXPIRES_IN` | Vigencia; `8h` |
| `PORT` | Puerto; `3000` |
| `CORS_ORIGIN` | Usar `http://localhost:5173` para el panel local; si se omite, el código usa `*` |
| `POOL_MIN`, `POOL_MAX`, `POOL_INCREMENT` | Pool; `1`, `5`, `1` |
| `NODE_ENV` | Entorno; `development` |

No publiques credenciales ni tokens. Con Oracle preparado:

```bash
npm run dev
```

La API usa `http://localhost:3000` por defecto. El arranque inicializa el pool Oracle y necesita una conexión válida.

## Comandos y pruebas

| Comando | Función |
| --- | --- |
| `npm run dev` | Desarrollo con recarga mediante tsx |
| `npm run build` | Compilar TypeScript a `dist` |
| `npm start` | Ejecutar el código compilado |
| `npm test` | Ejecutar Vitest |

Las [pruebas](./tests/) cubren validación, JWT, middleware, errores Oracle y salud con dependencias simuladas. No sustituyen pruebas contra la base real.

## Limitaciones y documentación histórica

- Clientes: solo consulta y creación. Citas: consulta, creación y cancelación, sin edición.
- Eliminar un servicio lo desactiva; no lo borra físicamente.
- No hay actualización de horarios ni actualización/eliminación de excepciones.
- El cliente envía `startAt` y `endAt`; la disponibilidad se delega a `PKG_AVAILABILITY.IS_AVAILABLE`. Sin el PL/SQL no se puede verificar que considere horarios, excepciones y duración ni que evite reservas simultáneas de forma atómica.
- No se implementan WhatsApp ni Gemini.

Las notas de [arquitectura](./docs/architecture.md), [API](./docs/api.md), [Postman](./docs/postman.md) y [brechas Oracle](./docs/oracle-gaps.md) son históricas y contienen datos desactualizados. Por ejemplo, el registro ya está implementado y no devuelve un `501` fijo. Los límites de los packages deben comprobarse contra la base de datos utilizada.
