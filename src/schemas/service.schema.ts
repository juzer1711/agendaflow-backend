import { z } from 'zod';
export const serviceSchema = z.object({ name: z.string().trim().min(1).max(120), description: z.string().trim().max(500).nullable().optional(), price: z.coerce.number().min(0).max(9999999999.99), durationMinutes: z.coerce.number().int().positive().max(99999) });
