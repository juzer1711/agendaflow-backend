# AgendaFlow Backend

API REST Node.js + TypeScript + Express para AgendaFlow, con Oracle 21c y PL/SQL como fuente de verdad.

## Instalación

```bash
npm install
copy .env.example .env
npm run dev
```

Configure `ORACLE_USER`, `ORACLE_PASSWORD`, `ORACLE_CONNECT_STRING`, `JWT_SECRET`, pool y CORS en `.env`. No versionar ese archivo. Ejecute `npm run build`, `npm test` y `npm start` para producción.

## Endpoints

- Públicos: `GET /health`, `GET /health/oracle`, `POST /api/auth/login`.
- `POST /api/auth/register` devuelve 501: Oracle no expone creación de usuarios.
- Protegidos: perfil, servicios, clientes, horarios, excepciones, disponibilidad y citas bajo `/api`.

Use `Authorization: Bearer <JWT>`. El JWT contiene usuario, barber, rol y email; el backend no acepta `barberId` para autorización.

Las mutaciones llaman los packages `PKG_*`; las lecturas sin package usan SQL parametrizado con filtro por barbero. Consulte [arquitectura](docs/architecture.md), [API](docs/api.md), [Postman](docs/postman.md) y [brechas Oracle](docs/oracle-gaps.md).
