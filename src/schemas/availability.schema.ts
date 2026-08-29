import { z } from 'zod';
import { isoDate } from './common';
export const availabilitySchema = z.object({ startAt: isoDate, endAt: isoDate }).refine(v => v.startAt < v.endAt, { message: 'El inicio debe ser menor al fin.' });
