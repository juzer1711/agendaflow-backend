export interface JwtPayload {
  userId: number;
  barberId: number;
  role: string;
  email: string;
}

export interface AuthenticatedUser extends JwtPayload {}

export interface ApiSuccess<T> { success: true; data: T; message?: string }
export interface ApiError { success: false; error: { code: string; message: string; details?: unknown } }

export interface OracleUser {
  userId: number;
  email: string;
  passwordHash: string;
  role: string;
  status: string;
  barberId: number | null;
}
