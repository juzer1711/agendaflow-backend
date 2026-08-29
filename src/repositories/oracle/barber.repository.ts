import oracledb from 'oracledb';
import { withConnection, withTransaction } from '../../config/database';

export interface BarberProfile { firstName: string; lastName: string | null; phone: string | null; whatsappPhone: string | null; bio: string | null; timezone: string; status: string }
export async function getBarber(barberId: number): Promise<BarberProfile | null> {
  return withConnection(async connection => {
    try {
      const result = await connection.execute(`BEGIN PKG_BARBER.GET_BARBER(:barberId,:firstName,:lastName,:phone,:whatsappPhone,:bio,:timezone,:status); END;`, {
        barberId, firstName: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 80 }, lastName: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 80 }, phone: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 30 }, whatsappPhone: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 30 }, bio: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 500 }, timezone: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 60 }, status: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 20 }
      });
      const o = result.outBinds as BarberProfile; return o.firstName ? o : null;
    } catch (error: unknown) { if (error instanceof Error && error.message.includes('ORA-01403')) return null; throw error; }
  });
}
export interface BarberUpdate { firstName: string; lastName?: string | null; phone?: string | null; whatsappPhone?: string | null; bio?: string | null }
export async function updateBarber(barberId: number, input: BarberUpdate): Promise<void> {
  await withTransaction(connection => connection.execute(`BEGIN PKG_BARBER.UPDATE_BARBER(:barberId,:firstName,:lastName,:phone,:whatsappPhone,:bio); END;`, { barberId, ...input }));
}
