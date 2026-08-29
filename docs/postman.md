# Postman

1. Ejecute `GET /health` y `GET /health/oracle`.
2. Envíe `POST /api/auth/login` con `{ "email": "...", "password": "..." }`.
3. Copie `data.token` como variable `jwt`.
4. Para rutas protegidas añada `Authorization: Bearer {{jwt}}`.
5. Pruebe perfil, servicios, clientes, horarios, excepciones, disponibilidad, creación/listado/cancelación de citas.

No envíe `barberId`: la API lo deriva del JWT.
