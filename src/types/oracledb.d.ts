declare module 'oracledb' {
  export interface ExecuteResult<T> { rows?: T[]; outBinds?: unknown }
  export interface Connection { execute<T = Record<string, unknown>>(sql: string, binds?: Record<string, unknown>, options?: Record<string, unknown>): Promise<ExecuteResult<T>>; commit(): Promise<void>; rollback(): Promise<void>; close(): Promise<void> }
  export interface Pool { getConnection(): Promise<Connection>; close(drainTime?: number): Promise<void> }
  interface OracleDb { BIND_OUT: number; NUMBER: number; STRING: number; OUT_FORMAT_OBJECT: number; createPool(options: Record<string, unknown>): Promise<Pool>; getPool(alias?: string): Pool }
  const oracledb: OracleDb;
  export default oracledb;
}
