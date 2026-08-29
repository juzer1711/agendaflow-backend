import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error';
import { mapOracleError } from '../utils/oracle-error';

export const notFound: RequestHandler = (_req, _res, next) => next(new AppError(404, 'NOT_FOUND', 'Recurso no encontrado.'));
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Datos inválidos', details: error.issues } });
  const known = error instanceof AppError ? error : mapOracleError(error);
  if (known) return res.status(known.statusCode).json({ success: false, error: { code: known.code, message: known.message, ...(known.details === undefined ? {} : { details: known.details }) } });
  console.error('Unhandled request error:', error instanceof Error ? error.message : 'unknown');
  return res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Ocurrió un error interno.' } });
};
