# Oracle gaps

- **GAP-001:** no existe `CREATE_USER`; `POST /api/auth/register` devuelve 501.
- **GAP-002:** disponibilidad no consulta `SCHEDULES`.
- **GAP-003:** disponibilidad no consulta `SCHEDULE_EXCEPTIONS`.
- **GAP-004:** disponibilidad no utiliza `SERVICES.DURATION_MINUTES`; el cliente suministra `endAt`.
- **GAP-005:** la verificación e inserción de una cita no tienen protección de concurrencia atómica.
- **GAP-006:** no hay packages de lectura para varias entidades; los repositorios usan SELECT parametrizados filtrados por `BARBER_ID`.
- **GAP-007:** no hay actualización de horarios ni eliminación/actualización de excepciones.
