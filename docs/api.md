# API

Endpoints públicos: `GET /health`, `GET /health/oracle`, `POST /api/auth/login`, `POST /api/auth/register` (501).

Los demás endpoints requieren `Authorization: Bearer <JWT>`: perfil, services, customers, schedules, schedule exceptions, availability y appointments. Las listas aceptan `page` y `limit` (máximo 100) cuando aplica.

`GET /api/appointments/next` retorna una cita limpia o `data: null` con el mensaje correspondiente.
