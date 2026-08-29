# Arquitectura

`Routes → middleware → controllers → services → Oracle repositories → PKG_* → Oracle`.

Las operaciones de negocio existentes usan los packages auditados. Las consultas de lectura sin package se parametrizan y siempre reciben el `barberId` únicamente desde el JWT.

Futuro WhatsApp: `Webhook → Node API → Gemini → Appointment Service → Oracle`.

Futuro Alexa: `Alexa Skill → AWS Lambda → HTTPS → AgendaFlow API → Oracle`.
