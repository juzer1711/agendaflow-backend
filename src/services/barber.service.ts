import * as repository from '../repositories/oracle/barber.repository';
import { AppError } from '../utils/app-error';
export async function profile(barberId: number) { const barber = await repository.getBarber(barberId); if (!barber) throw new AppError(404, 'BARBER_NOT_FOUND', 'Perfil de barbero no encontrado.'); return barber; }
export const updateProfile = repository.updateBarber;
