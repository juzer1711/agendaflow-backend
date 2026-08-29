import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email().max(150),
  password: z.string().min(8).max(128)
});

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email('El email no tiene un formato válido.')
    .max(150),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .max(128),

  firstName: z
    .string()
    .trim()
    .min(1, 'El nombre es obligatorio.')
    .max(80),

  lastName: z
    .string()
    .trim()
    .max(80)
    .optional()
    .default(''),

  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .default(''),

  whatsappPhone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .default(''),

  bio: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default('')
});