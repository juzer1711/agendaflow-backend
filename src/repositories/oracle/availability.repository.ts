import oracledb from 'oracledb';
import { withConnection } from '../../config/database';
export async function isAvailable(barberId: number, startAt: Date, endAt: Date): Promise<boolean> { return withConnection(async c => { const r = await c.execute(`BEGIN :available := PKG_AVAILABILITY.IS_AVAILABLE(:barberId,:startAt,:endAt); END;`, { available: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, barberId, startAt, endAt }); return (r.outBinds as { available: number }).available === 1; }); }
