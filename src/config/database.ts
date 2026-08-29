import oracledb, { type Connection, type Pool } from 'oracledb';
import { env } from './env';

const POOL_ALIAS = 'agendaflow';

export async function initializeDatabase(): Promise<void> {
  try { oracledb.getPool(POOL_ALIAS); return; } catch { /* pool not initialized */ }
  await oracledb.createPool({
    poolAlias: POOL_ALIAS,
    user: env.oracleUser(), password: env.oraclePassword(), connectString: env.oracleConnectString(),
    poolMin: env.poolMin, poolMax: env.poolMax, poolIncrement: env.poolIncrement
  });
}

export function getPool(): Pool { return oracledb.getPool(POOL_ALIAS); }
export async function getConnection(): Promise<Connection> { return getPool().getConnection(); }
export async function closeDatabase(): Promise<void> {
  try { await getPool().close(10); } catch (error: unknown) {
    if (!(error instanceof Error) || !error.message.includes('NJS-047')) throw error;
  }
}

export async function withTransaction<T>(work: (connection: Connection) => Promise<T>): Promise<T> {
  const connection = await getConnection();
  try { const value = await work(connection); await connection.commit(); return value; }
  catch (error) { try { await connection.rollback(); } catch { /* original error takes precedence */ } throw error; }
  finally { await connection.close(); }
}

export async function withConnection<T>(work: (connection: Connection) => Promise<T>): Promise<T> {
  const connection = await getConnection();
  try { return await work(connection); } finally { await connection.close(); }
}
