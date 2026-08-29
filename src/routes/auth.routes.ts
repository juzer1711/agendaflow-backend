import { Router } from 'express';
import * as c from '../controllers/auth.controller';
import { asyncHandler } from '../utils/async-handler';
import { requireAuth } from '../middleware/auth.middleware';

export const authRouter = Router();

authRouter.post(
  '/register',
  asyncHandler(c.register)
);

authRouter.post(
  '/login',
  asyncHandler(c.login)
);

authRouter.get(
  '/me',
  requireAuth,
  asyncHandler(c.me)
);