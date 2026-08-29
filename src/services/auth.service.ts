import bcrypt from 'bcrypt';

import * as authRepository from '../repositories/oracle/auth.repository';

import { AppError } from '../utils/app-error';

import { signToken } from '../utils/jwt';

interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  whatsappPhone: string;
  bio: string;
}

export async function login(
  email: string,
  password: string
) {
  const user = await authRepository.getUserByEmail(email);

  if (
    !user ||
    !user.barberId ||
    user.status !== 'ACTIVE' ||
    !(await bcrypt.compare(password, user.passwordHash))
  ) {
    throw new AppError(
      401,
      'INVALID_CREDENTIALS',
      'Email o contraseña inválidos.'
    );
  }

  const token = signToken({
    userId: user.userId,
    barberId: user.barberId,
    role: user.role,
    email: user.email
  });

  return {
    token,
    user: {
      userId: user.userId,
      barberId: user.barberId,
      role: user.role,
      email: user.email
    }
  };
}

export async function register(input: RegisterInput) {
  const existingUser = await authRepository.getUserByEmail(
    input.email
  );

  if (existingUser) {
    throw new AppError(
      409,
      'EMAIL_ALREADY_REGISTERED',
      'El email ya se encuentra registrado.'
    );
  }

  const passwordHash = await bcrypt.hash(
    input.password,
    10
  );

  let registered;

  try {
    registered = await authRepository.registerBarber({
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      whatsappPhone: input.whatsappPhone,
      bio: input.bio
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (
        error.message.includes('ORA-20010') ||
        error.message.includes('email ya se encuentra registrado')
      )
    ) {
      throw new AppError(
        409,
        'EMAIL_ALREADY_REGISTERED',
        'El email ya se encuentra registrado.'
      );
    }

    throw error;
  }

  const token = signToken({
    userId: registered.userId,
    barberId: registered.barberId,
    role: 'BARBER',
    email: input.email.toLowerCase()
  });

  return {
    token,
    user: {
      userId: registered.userId,
      barberId: registered.barberId,
      role: 'BARBER',
      email: input.email.toLowerCase()
    }
  };
}