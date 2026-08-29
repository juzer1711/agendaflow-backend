import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/app-error';

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.header('authorization');
  if (!header?.startsWith('Bearer ')) return next(new AppError(401, 'UNAUTHENTICATED', 'Se requiere autenticación.'));
  try {
    const payload = verifyToken(header.slice(7));
    if (!Number.isInteger(payload.userId) || !Number.isInteger(payload.barberId)) throw new Error('Malformed payload');
    req.user = payload; next();
  } catch { next(new AppError(401, 'INVALID_TOKEN', 'El token no es válido o expiró.')); }
}
