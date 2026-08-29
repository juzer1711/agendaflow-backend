import { AppError } from './app-error';

export function mapOracleError(error: unknown): AppError | undefined {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('ORA-20001')) return new AppError(403, 'SERVICE_NOT_BELONG_TO_BARBER', 'El servicio no pertenece al barbero.');
  if (message.includes('ORA-20002')) return new AppError(403, 'CUSTOMER_NOT_BELONG_TO_BARBER', 'El cliente no pertenece al barbero.');
  if (message.includes('ORA-20003')) return new AppError(409, 'APPOINTMENT_NOT_AVAILABLE', 'El horario seleccionado no está disponible.');
  if (message.includes('ORA-00001')) return new AppError(409, 'DUPLICATE_RESOURCE', 'El recurso ya existe.');
  if (message.includes('ORA-02291')) return new AppError(400, 'INVALID_REFERENCE', 'La referencia indicada no existe.');
  if (/NJS-|ORA-12\d{3}|ORA-125\d{2}/.test(message)) return new AppError(503, 'DATABASE_UNAVAILABLE', 'La base de datos no está disponible.');
  return undefined;
}
