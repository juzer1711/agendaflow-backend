import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function numberEnv(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) throw new Error(`Invalid numeric environment variable: ${name}`);
  return parsed;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: numberEnv('PORT', 3000),
  oracleUser: () => required('ORACLE_USER'),
  oraclePassword: () => required('ORACLE_PASSWORD'),
  oracleConnectString: () => required('ORACLE_CONNECT_STRING'),
  poolMin: numberEnv('POOL_MIN', 1),
  poolMax: numberEnv('POOL_MAX', 5),
  poolIncrement: numberEnv('POOL_INCREMENT', 1),
  jwtSecret: () => required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
  corsOrigin: process.env.CORS_ORIGIN ?? '*'
};
