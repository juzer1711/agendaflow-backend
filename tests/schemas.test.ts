import { describe, expect, it } from 'vitest'; import { appointmentSchema } from '../src/schemas/appointment.schema';
describe('schemas',()=>it('rejects appointments with reversed time',()=>expect(()=>appointmentSchema.parse({customerId:1,serviceId:1,startAt:'2026-08-27T11:00:00.000Z',endAt:'2026-08-27T10:00:00.000Z'})).toThrow()));
