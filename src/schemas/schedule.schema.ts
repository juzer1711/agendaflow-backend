import { z } from 'zod';
import { isoDate } from './common';
export const scheduleSchema = z.object({ dayOfWeek: z.coerce.number().int().min(1).max(7), startTime: isoDate, endTime: isoDate }).refine(v => v.startTime < v.endTime, { message: 'La hora inicial debe ser menor a la final.' });
export const exceptionSchema = z.object({ exceptionDate: isoDate, startTime: isoDate.nullable().optional(), endTime: isoDate.nullable().optional(), type: z.enum(['DAY_OFF','VACATION','BLOCK','SPECIAL_HOURS']), reason: z.string().trim().max(500).nullable().optional() }).refine(v => !v.startTime || !v.endTime || v.startTime < v.endTime, { message: 'La hora inicial debe ser menor a la final.' });
