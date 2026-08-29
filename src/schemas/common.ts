import { z } from 'zod';
export const idSchema = z.object({ id: z.coerce.number().int().positive() });
export const paginationSchema = z.object({ page: z.coerce.number().int().positive().default(1), limit: z.coerce.number().int().min(1).max(100).default(20) });
export const isoDate = z.string().datetime({ offset: true }).transform(value => new Date(value));
