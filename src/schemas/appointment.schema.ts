import { z } from 'zod';
import { isoDate } from './common';
export const appointmentSchema = z.object({ customerId: z.coerce.number().int().positive(), serviceId: z.coerce.number().int().positive(), startAt: isoDate, endAt: isoDate, source: z.enum(['WEB','WHATSAPP','ADMIN']).default('WEB'), notes: z.string().trim().max(1000).nullable().optional() }).refine(v => v.startAt < v.endAt, { message: 'El inicio debe ser menor al fin.' });
