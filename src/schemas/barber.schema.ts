import { z } from 'zod';
export const barberSchema = z.object({ firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().max(80).nullable().optional(), phone: z.string().trim().max(30).nullable().optional(), whatsappPhone: z.string().trim().max(30).nullable().optional(), bio: z.string().trim().max(500).nullable().optional() });
