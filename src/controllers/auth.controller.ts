import type {
  Request,
  Response
} from 'express';

import {
  loginSchema,
  registerSchema
} from '../schemas/auth.schema';

import * as authService from '../services/auth.service';

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  const input = loginSchema.parse(req.body);

  const data = await authService.login(
    input.email,
    input.password
  );

  res.json({
    success: true,
    data
  });
}

export async function me(
  req: Request,
  res: Response
): Promise<void> {
  res.json({
    success: true,
    data: req.user
  });
}

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  const input = registerSchema.parse(req.body);

  const data = await authService.register(input);

  res.status(201).json({
    success: true,
    data
  });
}