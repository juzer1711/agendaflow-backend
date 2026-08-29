import oracledb from 'oracledb';
import { withConnection, withTransaction } from '../../config/database';

export interface ServiceInput { name: string; description?: string | null; price: number; durationMinutes: number }
export interface ServiceRow extends ServiceInput { serviceId: number; status: string; createdAt: Date; updatedAt: Date }
const select = `SELECT SERVICE_ID AS "serviceId", NAME AS "name", DESCRIPTION AS "description", PRICE AS "price", DURATION_MINUTES AS "durationMinutes", STATUS AS "status", CREATED_AT AS "createdAt", UPDATED_AT AS "updatedAt" FROM SERVICES WHERE BARBER_ID = :barberId`;
export async function listServices(barberId: number, page: number, limit: number): Promise<ServiceRow[]> { return withConnection(async c => (await c.execute<ServiceRow>(`${select} ORDER BY NAME OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`, { barberId, offset: (page - 1) * limit, limit }, { outFormat: oracledb.OUT_FORMAT_OBJECT })).rows ?? []); }
export async function createService(barberId: number, input: ServiceInput): Promise<number> { return withTransaction(async c => { const r = await c.execute(`BEGIN PKG_SERVICE.CREATE_SERVICE(:barberId,:name,:description,:price,:durationMinutes,:serviceId); END;`, { barberId, ...input, serviceId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }); return (r.outBinds as { serviceId: number }).serviceId; }); }
export async function updateService(barberId: number, serviceId: number, input: ServiceInput): Promise<void> { await withTransaction(c => c.execute(`BEGIN PKG_SERVICE.UPDATE_SERVICE(:serviceId,:barberId,:name,:description,:price,:durationMinutes); END;`, { serviceId, barberId, ...input })); }
export async function deactivateService(barberId: number, serviceId: number): Promise<void> { await withTransaction(c => c.execute(`BEGIN PKG_SERVICE.DEACTIVATE_SERVICE(:serviceId,:barberId); END;`, { serviceId, barberId })); }
