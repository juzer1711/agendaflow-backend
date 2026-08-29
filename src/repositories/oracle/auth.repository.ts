import oracledb from 'oracledb';

import {
  withConnection,
  withTransaction
} from '../../config/database';

import type { OracleUser } from '../../types/auth.types';

interface RegisterBarberInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string;
  whatsappPhone: string;
  bio: string;
}

interface RegisteredBarber {
  userId: number;
  barberId: number;
}

export async function getUserByEmail(
  email: string
): Promise<OracleUser | null> {
  return withConnection(async connection => {
    const result = await connection.execute(
      `BEGIN
        PKG_AUTH.GET_USER_BY_EMAIL(
          :email,
          :userId,
          :emailOut,
          :passwordHash,
          :role,
          :status,
          :barberId
        );
      END;`,
      {
        email,

        userId: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        },

        emailOut: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxSize: 150
        },

        passwordHash: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxSize: 255
        },

        role: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxSize: 30
        },

        status: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxSize: 20
        },

        barberId: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        }
      }
    );

    const out = result.outBinds as {
      userId: number | null;
      emailOut: string | null;
      passwordHash: string | null;
      role: string | null;
      status: string | null;
      barberId: number | null;
    };

    if (
      out.userId === null ||
      !out.emailOut ||
      !out.passwordHash ||
      !out.role ||
      !out.status
    ) {
      return null;
    }

    return {
      userId: out.userId,
      email: out.emailOut,
      passwordHash: out.passwordHash,
      role: out.role,
      status: out.status,
      barberId: out.barberId
    };
  });
}

export async function registerBarber(
  input: RegisterBarberInput
): Promise<RegisteredBarber> {
  return withTransaction(async connection => {
    const result = await connection.execute(
      `BEGIN
        PKG_REGISTRATION.REGISTER_BARBER(
          :email,
          :passwordHash,
          :firstName,
          :lastName,
          :phone,
          :whatsappPhone,
          :bio,
          :userId,
          :barberId
        );
      END;`,
      {
        email: input.email,
        passwordHash: input.passwordHash,
        firstName: input.firstName,
        lastName: input.lastName || null,
        phone: input.phone || null,
        whatsappPhone: input.whatsappPhone || null,
        bio: input.bio || null,

        userId: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        },

        barberId: {
          dir: oracledb.BIND_OUT,
          type: oracledb.NUMBER
        }
      }
    );

    const out = result.outBinds as {
      userId: number | null;
      barberId: number | null;
    };

    if (out.userId === null || out.barberId === null) {
      throw new Error(
        'Oracle no devolvió los identificadores del usuario registrado.'
      );
    }

    return {
      userId: out.userId,
      barberId: out.barberId
    };
  });
}